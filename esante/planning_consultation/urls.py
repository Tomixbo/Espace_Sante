from django.urls import path
from . import views

urlpatterns = [
    path('planning/', views.consultation_schedule, name='planning'),
]
