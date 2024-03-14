
from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    first_name = serializers.CharField(
        help_text="First name of the user."
    )
    last_name = serializers.CharField(
        help_text="Last name of the user."
    )
    phone_number = serializers.CharField(
        help_text="Phone number of the user."
    )
    password = serializers.CharField(
        write_only=True,
        help_text="Password of the user."
    )
