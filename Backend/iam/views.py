from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
import redis
import random
import string

redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)
verification_code_ttl = 60

def generate_verification_code():
    code = ''.join(random.choices(string.digits, k=6))
    return code


@swagger_auto_schema(
    method='post', 
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'first_name': openapi.Schema(type=openapi.TYPE_STRING),
            'last_name': openapi.Schema(type=openapi.TYPE_STRING),
            'phone_number': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['first_name', 'last_name', 'phone_number', 'password']
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
    """
    Register a new user.
    """
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        first_name = serializer.validated_data.get('first_name')
        last_name = serializer.validated_data.get('last_name')
        phone_number = serializer.validated_data.get('phone_number')
        password = serializer.validated_data.get('password')

        user = CustomUser.objects.create_user(
            username=phone_number, 
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            password=password,  # Set the password
            is_active=True
        )

        response_data = {'message': 'User created successfully'}

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        response_data['access_token'] = str(access_token)
        response_data['refresh_token'] = str(refresh)

        # Send verification code
        verification_code = generate_verification_code()
        redis_client.setex(phone_number, verification_code_ttl, verification_code)
        print(f'Verification code for {phone_number}: {verification_code}')

        # You can also call verify_code here to automatically verify the code after signup
        # verify_code(request)

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
        status.HTTP_200_OK: openapi.Response(description='Verification code is valid'),
        status.HTTP_400_BAD_REQUEST: openapi.Response(description='Invalid verification code')
    },
    operation_summary="Verify verification code",
    tags=["Authentication"],
    operation_description="Verify the provided verification code for a given phone number."
)
@api_view(['POST'])
def verify_code(request):
    data = request.data
    phone_number = data.get('phone_number')
    code = data.get('code')

    saved_code = redis_client.get(phone_number)
    if saved_code and saved_code.decode('utf-8') == code:
        return Response({'message': 'Verification code is valid'})
    else:
        return Response({'message': 'Invalid verification code'}, status=400)
