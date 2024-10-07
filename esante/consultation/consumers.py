import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime
from channels.db import database_sync_to_async
from .models import ChatRoom, Message  # Make sure your models are imported correctly
from django.contrib.auth import get_user_model
from django.utils import timezone
from channels.layers import get_channel_layer

User = get_user_model()

from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.membre_id = self.scope['url_route']['kwargs']['membre_id']
        self.room_group_name = f'chat_{self.membre_id}'
        user = self.scope["user"]

        # Create or retrieve the chat room
        self.chat_room = await self.get_chat_room(self.membre_id)

        # Add user to the WebSocket group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # Send the chat room member's name to the connected user
        membre_name = await self.get_membre_name()  # Fetch member name asynchronously
        await self.send(text_data=json.dumps({
            'type': 'room_info',
            'membre_name': membre_name,  # Send the name of the member
        }))

        # Notify other users that a doctor has joined
        if user.is_authenticated and user.user_type == 'medecin':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'doctor_joined',
                    'doctor_name': user.username
                }
            )

        # Load the chat history and send it to the client
        messages = await self.get_chat_history()
        await self.send(text_data=json.dumps({
            'type': 'chat_history',
            'messages': messages
        }))

    async def disconnect(self, close_code):
        user = self.scope["user"]
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        # Notify other users that the doctor has left
        if user.is_authenticated and user.user_type == 'medecin':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'doctor_left',
                    'doctor_name': user.username
                }
            )

    async def receive(self, text_data):
        user = self.scope["user"]
        sender = user.username if user.is_authenticated else "Anonymous"

        text_data_json = json.loads(text_data)

        if text_data_json.get('type') == 'heartbeat':
            # Handle the heartbeat signal
            await self.handle_heartbeat(user)

        elif 'message' in text_data_json:
            message_content = text_data_json.get('message', '')

            # Save the message to the database
            message = await self.save_message(user, message_content)

            # Send the message to the group for this specific chat room
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message.content,
                    'sender': message.sender.username,
                    'timestamp': message.timestamp.isoformat()
                }
            )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender'],
            'timestamp': event['timestamp'],
        }))

    async def doctor_joined(self, event):
        await self.send(text_data=json.dumps({
            'type': 'doctor_joined',
            'doctor_name': event['doctor_name'],
        }))

    async def doctor_left(self, event):
        await self.send(text_data=json.dumps({
            'type': 'doctor_left',
            'doctor_name': event['doctor_name'],
        }))

    # Handle the heartbeat signal (sent by the client every few seconds)
    async def handle_heartbeat(self, user):
        if user.is_authenticated and user.user_type == 'medecin':
            # Optionally, you can log the heartbeat or update user activity in the database
            print(f"Received heartbeat from doctor: {user.username}")

    @database_sync_to_async
    def get_chat_room(self, membre_id):
        return ChatRoom.objects.get(membre_id=membre_id)

    @database_sync_to_async
    def get_membre_name(self):
        # Return the member's name from the chat room
        return self.chat_room.membre.username

    @database_sync_to_async
    def save_message(self, sender, content):
        if not sender.is_authenticated:
            sender = User.objects.get(username='Anonymous')
        message = Message.objects.create(room=self.chat_room, sender=sender, content=content)
        return message

    @database_sync_to_async
    def get_chat_history(self):
        messages = self.chat_room.messages.all().order_by('timestamp')
        return [
            {'message': msg.content, 'sender': msg.sender.username, 'timestamp': msg.timestamp.isoformat()}
            for msg in messages
        ]


class HeartbeatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the WebSocket connection
        await self.accept()

        # If user is authenticated, mark them as online
        user = self.scope["user"]
        if user.is_authenticated:
            await self.update_user_status(user, True)

    async def disconnect(self, close_code):
        # When the WebSocket disconnects, mark the user as offline
        user = self.scope["user"]
        if user.is_authenticated:
            await self.update_user_status(user, False)

    async def receive(self, text_data):
        # Handle heartbeat message from client (received every few seconds)
        user = self.scope["user"]
        if user.is_authenticated:
            # Update the last seen and ensure they remain online
            await self.update_user_status(user, True)
    
    # Function to mark user offline after timeout (e.g., if no heartbeats)
    @database_sync_to_async
    def mark_offline_after_timeout(self, user, timeout):
        # This will run after the timeout period
        from datetime import timedelta
        import time

        # Wait for the timeout period (e.g., 60 seconds)
        time.sleep(timeout)

        # Re-fetch the user from the database to check if they are still active
        refreshed_user = User.objects.get(pk=user.pk)
        if refreshed_user.last_seen and timezone.now() - refreshed_user.last_seen > timedelta(seconds=timeout):
            # If the last_seen time is older than the timeout, mark them as offline
            refreshed_user.is_online = False
            refreshed_user.save()

    # Function to update user status and last seen
    async def update_user_status(self, user, is_online):
            # Update the user status asynchronously
            await self.async_update_user_status(user, is_online)

            # Notify the WebSocket group about the user status change
            channel_layer = get_channel_layer()  # No need to await this, it's synchronous
            await channel_layer.group_send(
                'user_status_updates',  # The group name for broadcasting user status updates
                {
                    'type': 'user_status_update',
                    'user_id': user.id,
                    'is_online': is_online,
                }
            )

    @database_sync_to_async
    def async_update_user_status(self, user, is_online):
        user.is_online = is_online
        if is_online:
            user.last_seen = timezone.now()
        user.save()



class UserStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Join a group to listen for status updates
        self.room_group_name = 'user_status_updates'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the group when the WebSocket disconnects
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # This consumer only sends notifications, so no need to handle incoming messages
        pass

    # Handler for user status update notifications
    async def user_status_update(self, event):
        # Send the user status update to the WebSocket
        await self.send(text_data=json.dumps({
            'user_id': event['user_id'],
            'is_online': event['is_online'],
        }))
