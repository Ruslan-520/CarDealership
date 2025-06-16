from os import access

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from django.utils.timezone import now


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'email': {'required': False},  # email не обязателен
            'password': {'write_only': True}  # пароль скрыт в ответах
        }

    def create(self, validated_data):
        # Создание пользователя с хешированием пароля
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')  # email опционален
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    def validate(self, attrs):
        # Убираем все лишние поля, оставляем только username/password
        attrs = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        # Стандартная валидация JWT
        data = super().validate(attrs)


        # Дополнительные данные в ответе (опционально)
        refresh = self.get_token(self.user)
        access_token = refresh.access_token
        data.update({
            'user_id': self.user.id,
            'email': self.user.email,
            'refresh_exp': (now() + refresh.lifetime).timestamp(),
            'access_exp': (now() + access_token.lifetime).timestamp()
        })
        return data
