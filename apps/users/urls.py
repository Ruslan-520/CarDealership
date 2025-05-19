from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    UserListView,
    UserDetailView,
    UserCreateView,
    CurrentUserView,
    CustomTokenObtainPairView
)

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),
    path('register/', UserCreateView.as_view(), name='user-register'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),

    # JWT Authentication
    path('/auth/login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]