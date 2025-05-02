from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewList

router = DefaultRouter()
router.register(r'application', ApplicationViewList)

urlpatterns =[
    path('', include(router.urls)),
]