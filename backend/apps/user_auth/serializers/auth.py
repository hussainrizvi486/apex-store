from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from ..models import User


class AuthTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user: User):
        token = super().get_token(user)
        token["user_id"] = user.id
        token["username"] = user.username
        token["email"] = user.email
        token["full_name"] = user.get_full_name()
        return token


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=20)

    class Meta:
        fields = ["email", "password"]

    def validate(self, attrs: dict):
        if not attrs.get("email") or not attrs.get("password"):
            raise ValidationError("Invalid credentials")
        return super().validate(attrs)


class RegisterUserSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(max_length=20, write_only=True)
    # password2 = serializers.CharField(max_length=20, write_only=True)

    class Meta:
        model = User
        fields = "__all__"

    # def validate(self, attrs: dict):
    #     if attrs["password"] != attrs["password2"]:
    #         raise ValidationError("Passwords do not match")
    #     return super().validate(attrs)
