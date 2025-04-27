from django.shortcuts import render
from .models import Car
from .serializers import  CarSerializer
from  rest_framework import viewset

class CarViewList(viewset.ModelViewSet):
    quaryset = Car.objects.all()
    serializer_class = CarSerializer
