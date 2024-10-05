from django.urls import path
from .views import consultation_view, chat_with_member_view

urlpatterns = [
    path('consultation/', consultation_view, name='consultation'),  # Espace consultation pour le membre
    path('chat/<int:member_id>/', chat_with_member_view, name='chat_with_member'),  # Chat avec un membre spécifique
]
