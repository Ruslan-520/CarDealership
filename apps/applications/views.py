from django.shortcuts import render
from .models import Application
from .serializers import ApplicationSerializer
from rest_framework import viewsets

class ApplicationViewList(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class =  ApplicationSerializer