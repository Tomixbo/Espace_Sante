from django.contrib import admin
from .models import ChatRoom, Message

# Enregistrement du modèle ChatRoom
@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ('membre', 'created_at')  # Affiche le membre et la date de création
    search_fields = ('membre__username',)  # Permet la recherche par nom d'utilisateur du membre
    list_filter = ('created_at',)  # Filtre par date de création

# Enregistrement du modèle Message
@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('room', 'sender', 'content', 'timestamp', 'seen')  # Affiche les informations pertinentes
    search_fields = ('sender__username', 'room__membre__username')  # Permet la recherche par nom d'utilisateur
    list_filter = ('timestamp', 'seen')  # Filtre par date d'envoi et statut vu/non vu
