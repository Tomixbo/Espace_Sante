from django.urls import path
from .consumers import ChatConsumer, HeartbeatConsumer, UserStatusConsumer, CallConsumer

websocket_urlpatterns = [
    path('ws/chat/<int:membre_id>/', ChatConsumer.as_asgi()),  # Utiliser l'ID du membre dans l'URL
    path('ws/heartbeat/', HeartbeatConsumer.as_asgi()),  # WebSocket URL for heartbeat check
    path('ws/user-status/', UserStatusConsumer.as_asgi()),
    path('ws/call/<str:room_name>/', CallConsumer.as_asgi()),

]
