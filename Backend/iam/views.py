from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpRequest
import redis
import random
import string
import time
from django.utils import timezone


redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)
verification_code_ttl = 60

def generate_verification_code():
    code = ''.join(random.choices(string.digits, k=6))
    return code

temp_user_data = {}

@swagger_auto_schema(
    method='post', 
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'first_name': openapi.Schema(type=openapi.TYPE_STRING),
            'last_name': openapi.Schema(type=openapi.TYPE_STRING),
            'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
            'code': openapi.Schema(type=openapi.TYPE_STRING),  
        },
        required=['first_name', 'last_name', 'phone_number', 'password', 'code']  
    ),
    responses={
        status.HTTP_201_CREATED: openapi.Response(
            description='User created successfully',
            schema=UserSerializer
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input')
    },
    operation_summary="Register a new user",
    tags=["Authentication"],
    operation_description="Register a new user with the provided information. After successful registration, an access token and a refresh token will be returned."
)
@api_view(['POST'])
def signup(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        phone_number = data['phone_number']
        
        existing_user = CustomUser.objects.filter(phone_number=phone_number).first()
        if existing_user:
            redis_client.delete(phone_number)
        
        user = CustomUser.objects.create_user(
            username=phone_number,
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone_number=phone_number,
            password=data['password'],
            is_active=False
        )
        verification_code = generate_verification_code()
        redis_client.setex(phone_number, verification_code_ttl, verification_code)
        print(f'Verification code for {phone_number}: {verification_code}')

        response_data = {'message': 'User created successfully'}
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['phone_number', 'password']
    ),
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Logged in successfully',
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'access': openapi.Schema(type=openapi.TYPE_STRING),
                    'refresh': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid credentials'),
        status.HTTP_403_FORBIDDEN: openapi.Response(description='User is inactive')
    },
    operation_summary="Log in an existing user",
    tags=["Authentication"],
    operation_description="Log in an existing user with the provided credentials. If successful, an access token and a refresh token will be returned."
)
@api_view(['POST'])
def login(request):
    """
    Log in an existing user.
    """
    data = request.data
    phone_number = data.get('phone_number')
    password = data.get('password')

    user = authenticate(phone_number=phone_number, password=password)
    if user:
        if user.is_active:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        else:
            return Response({'message': 'User is inactive'}, status=status.HTTP_403_FORBIDDEN)    
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)



@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'refresh': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['refresh']
    ),
    responses={
        status.HTTP_200_OK: openapi.Response(
            description='Token refreshed successfully',
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'access': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid refresh token')
    },
    operation_summary="Refresh access token",
    tags=["Authentication"],
    operation_description="Refresh the access token using the provided refresh token."
)
@api_view(['POST'])
def token_refresh(request):
    data = request.data
    refresh = data.get('refresh')

    try:
        token = RefreshToken(refresh)
        access = str(token.access_token)
        return Response({'access': access})
    except Exception as e:
        return Response({'message': 'Invalid refresh token'}, status=400)


from django.utils import timezone



@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
            'code': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['phone_number', 'code']
    ),
    responses={
        status.HTTP_200_OK: openapi.Response(description='Access and refresh tokens generated successfully'),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid verification code or user not found')
    },
    operation_summary="Verify verification code and generate tokens",
    tags=["Authentication"],
    operation_description="Verify the provided verification code for a given phone number and generate access and refresh tokens for the user."
)
@api_view(['POST'])
def verify_code(request):
    """
    Verify the provided verification code for a given phone number and generate tokens.
    """
    data = request.data
    phone_number = data.get('phone_number')
    code = data.get('code')

    saved_data = redis_client.get(phone_number)
    if saved_data:
        saved_code = saved_data.decode('utf-8')
        if saved_code == code:
            redis_client.delete(phone_number)

            try:
                user = CustomUser.objects.get(phone_number=phone_number)
            except CustomUser.DoesNotExist:
                user = CustomUser.objects.create_user(
                    username=phone_number,
                    phone_number=phone_number,
                    is_active=True
                )

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response({
                'access_token': str(access_token),
                'refresh_token': str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid verification code'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Verification code expired or not found'}, status=status.HTTP_400_BAD_REQUEST)

from django.utils import timezone
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['phone_number']
    ),
    responses={
        status.HTTP_200_OK: openapi.Response(description='Verification code resent successfully'),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid input')
    },
    operation_summary="Resend verification code",
    tags=["Authentication"],
    operation_description="Resend the verification code to the provided phone number."
)

@api_view(['POST'])
def resend_verification_code(request):
    phone_number = request.data.get('phone_number')
    
    user = CustomUser.objects.filter(phone_number=phone_number).first()
    if user:
        if user.is_active:
            return Response({'message': 'User is already active'}, status=status.HTTP_400_BAD_REQUEST)
        
        last_code_sent_time = redis_client.get(f'{phone_number}_last_code_sent_time')
        if last_code_sent_time:
            last_sent_time = timezone.make_aware(datetime.fromisoformat(last_code_sent_time.decode('utf-8')))
            elapsed_time = timezone.now() - last_sent_time
            if elapsed_time.seconds < 60:
                return Response({'message': 'Please wait before requesting a new verification code'}, status=status.HTTP_400_BAD_REQUEST)
        
        verification_code = generate_verification_code()
        redis_client.setex(phone_number, verification_code_ttl, verification_code)
        print(f'New verification code for {phone_number}: {verification_code}')
        redis_client.set(f'{phone_number}_last_code_sent_time', timezone.now().isoformat())
        
        return Response({'message': 'Verification code sent successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
