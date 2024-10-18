from django.urls import path
from . import views
from .api_views import CheckAvailability, CreateConsultation

urlpatterns = [
    path('planning/', views.consultation_schedule, name='planning'),
    path('create-consultation/', views.create_consultation, name='create_consultation'),
     path('api/check-availability/', CheckAvailability.as_view(), name='api_check_availability'),
    path('api/create-consultation/', CreateConsultation.as_view(), name='api_create_consultation'),

]
