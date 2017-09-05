# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from models import User
from forms import MainForm
from django.shortcuts import render, render_to_response, redirect
from serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny


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
            return redirect('success/')

    else:
        form = MainForm()

    return render(request, 'index.html', {'form': form})

def success_view(request):
   return render_to_response('success.html')


