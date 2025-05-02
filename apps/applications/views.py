from django.shortcuts import render
from .models import Application
from .serializers import ApplicationSerializer
from rest_framework import viewsets

class ApplicationViewList(viewsets.ModelViewSet):
    queryset = Application.object.all()
    serializer_class =  ApplicationSerializer