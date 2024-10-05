from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Utiliser le modèle d'administration par défaut de Django pour AbstractUser
class CustomUserAdmin(UserAdmin):
    model = CustomUser


admin.site.register(CustomUser, CustomUserAdmin)
