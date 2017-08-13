# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from models import User
from forms import MainForm
from django.shortcuts import render

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




