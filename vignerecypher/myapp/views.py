# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from models import User
from forms import MainForm
from django.shortcuts import render
from serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


def main_view(request):
    if request.method == "POST":
        form = MainForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            enc_message = form.cleaned_data['enc_message']

            ## SAVING DATA TO DB

            user = User(name=name, email=email, message=message, enc_message=enc_message)
            user.save()
            return render(request, 'success.html')

    else:
        form = MainForm()

    return render(request, 'index.html', {'form': form})

class UserList(APIView):

    def get(self, request, format=None):
        user = User.objects.all()
        user = UserSerializer(user, many=True)
        return Response(user.data)

    def post(self, request, format=None):
        serializer = User.objects.create()
        serializer = UserSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




