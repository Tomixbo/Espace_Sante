from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('membre', 'Membre'),
        ('medecin', 'Médecin'),
    )
    
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='membre')

    # Ajoutez d'autres champs si nécessaire (ex: phone_number)
    phone_number = models.CharField(max_length=15, blank=True)
