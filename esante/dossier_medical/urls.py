# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('dossier-medical/<int:member_id>/', views.get_dossier_medical, name='get_dossier_medical'),
]
