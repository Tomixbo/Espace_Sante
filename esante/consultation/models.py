from django.db import models
from accounts.models import CustomUser  # Importe directement ton modèle CustomUser

class ChatRoom(models.Model):
    # Le salon de chat est lié à un membre
    membre = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="chat_rooms")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat Room for {self.membre.username}"

class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)  

    def __str__(self):
        return f"Message from {self.sender.username} in {self.room.id} at {self.timestamp}"
