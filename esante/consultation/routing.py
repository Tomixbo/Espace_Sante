from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<int:membre_id>/', ChatConsumer.as_asgi()),  # Utiliser l'ID du membre dans l'URL
]
