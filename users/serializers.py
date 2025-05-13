from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['id'] = user.id
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        # Добавляем дополнительные данные в ответ
        data.update({
            'user_id': self.user.id,
            'email': self.user.email,
            'username': self.user.username,
            'refresh_exp': refresh.payload['exp'],  # Срок жизни refresh токена
            'access_exp': refresh.access_token.payload['exp']  # Срок жизни access токена
        })
        return data
