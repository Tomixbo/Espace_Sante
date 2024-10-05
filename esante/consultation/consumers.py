import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime
from channels.db import database_sync_to_async
from .models import ChatRoom, Message  # Make sure your models are imported correctly
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Retrieve member ID from the URL (kwargs)
        self.membre_id = self.scope['url_route']['kwargs']['membre_id']
        self.room_group_name = f'chat_{self.membre_id}'  # Unique room name for the member

        # Log user connection attempt
        user = self.scope["user"]
        print(f"Connection attempt by user: {user} (Authenticated: {user.is_authenticated})")
        if user.is_authenticated:
            print(f"User connected: {user.username}")
        else:
            print("Anonymous user connected")

        # Create or retrieve the chat room for this member
        self.chat_room, created = await self.get_or_create_chat_room(self.membre_id)

        # Add the user to the group for the specific chat room
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()

        # Load the chat history and send it to the client
        messages = await self.get_chat_history()
        await self.send(text_data=json.dumps({
            'type': 'chat_history',
            'messages': messages
        }))

    async def disconnect(self, close_code):
        # Remove the user from the group for the specific chat room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Retrieve the user and their username (or "Anonymous" if not authenticated)
        user = self.scope["user"]
        sender = user.username if user.is_authenticated else "Anonymous"

        # Extract the message received from the WebSocket
        text_data_json = json.loads(text_data)
        message_content = text_data_json.get('message', '')

        # Save the message to the database
        message = await self.save_message(user, message_content)

        # Send the message to the group for this specific chat room
        await self.channel_layer.group_send(
            self.room_group_name,  # The member's chat room
            {
                'type': 'chat_message',
                'message': message.content,
                'sender': message.sender.username,
                'timestamp': message.timestamp.isoformat()
            }
        )

    async def chat_message(self, event):
        # Send the message to the WebSocket client
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp'],
        }))

    # Function to create or retrieve a chat room
    @database_sync_to_async
    def get_or_create_chat_room(self, membre_id):
        # This will return a tuple: (ChatRoom object, created boolean)
        return ChatRoom.objects.get_or_create(membre_id=membre_id)

    # Function to save a message in the database
    @database_sync_to_async
    def save_message(self, sender, content):
        if not sender.is_authenticated:
            sender = User.objects.get(username='Anonymous')  # Replace Anonymous if necessary
        message = Message.objects.create(room=self.chat_room, sender=sender, content=content)
        
        # Log the saved message content
        print(f"Message saved: {message.content}")
        return message


    # Function to retrieve the chat history
    @database_sync_to_async
    def get_chat_history(self):
        messages = self.chat_room.messages.all().order_by('timestamp')
        
        # Log the retrieved messages
        for msg in messages:
            print(f"Retrieved message: {msg.content} from {msg.sender.username} at {msg.timestamp}")
        
        return [
            {'message': msg.content, 'sender': msg.sender.username, 'timestamp': msg.timestamp.isoformat()}
            for msg in messages
        ]

