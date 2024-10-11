from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('membre', 'Membre'),
        ('medecin', 'Médecin'),
        ('bot', 'Bot'),
    )
    
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='membre')
    phone_number = models.CharField(max_length=15, blank=True)

    # Track whether the user is online
    is_online = models.BooleanField(default=False)

    # Track the last time the user was seen online
    last_seen = models.DateTimeField(null=True, blank=True)
