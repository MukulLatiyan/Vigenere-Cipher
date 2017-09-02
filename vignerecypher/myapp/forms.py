from django import forms
from models import User

class MainForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'email', 'message']