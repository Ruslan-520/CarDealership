from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewList

router = DefaultRouter()
router.register(r'cars', CarViewList)

urlpatterns = [
path('', include(router.urls)),
]