from django.urls import path
from . import views

urlpatterns = [
    path('dossier-medical/<int:member_id>/', views.get_dossier_medical, name='get_dossier_medical'),
    path('list-members/', views.list_members, name='list_members'),
]
