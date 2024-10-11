import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime
from channels.db import database_sync_to_async
from .models import ChatRoom, Message  # Make sure your models are imported correctly
from django.contrib.auth import get_user_model
from django.utils import timezone
from channels.layers import get_channel_layer
import aiohttp 

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.membre_id = self.scope['url_route']['kwargs']['membre_id']
        self.room_group_name = f'chat_{self.membre_id}'
        user = self.scope["user"]

        # Create or retrieve the chat room
        self.chat_room = await self.get_chat_room(self.membre_id)

        # Initialize or retrieve the list of doctors and member status for this room
        if not hasattr(self.channel_layer, "doctors_in_room"):
            self.channel_layer.doctors_in_room = {}
        if not hasattr(self.channel_layer, "member_status"):
            self.channel_layer.member_status = {}

        if self.room_group_name not in self.channel_layer.doctors_in_room:
            self.channel_layer.doctors_in_room[self.room_group_name] = []
        if self.room_group_name not in self.channel_layer.member_status:
            self.channel_layer.member_status[self.room_group_name] = {'status': 'disconnected'}

        # Add user to the WebSocket group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # If the connected user is a member, update their status to "active"
        if user.is_authenticated and user.user_type == 'membre':
            self.channel_layer.member_status[self.room_group_name] = {'name': user.username, 'status': 'active'}
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'member_active',
                    'member_name': user.username
                }
            )
            # Marquer les messages non vus comme vus
            await self.mark_messages_as_seen_for_member()

        # Notify other users that a doctor has joined
        if user.is_authenticated and user.user_type == 'medecin':
            doctor_info = {'name': user.username, 'status': 'active'}

            # Vérifie si le médecin est déjà dans la liste avant de l'ajouter
            if not any(doc['name'] == user.username for doc in self.channel_layer.doctors_in_room[self.room_group_name]):
                self.channel_layer.doctors_in_room[self.room_group_name].append(doctor_info)

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'doctor_joined',
                    'doctor_name': user.username
                }
            )
            # Marquer les messages non vus comme vus
            await self.mark_messages_as_seen_for_doctor()


        # Send the chat room member's name to the connected user and doctors in the room
        membre_name = await self.get_membre_name()
        await self.send(text_data=json.dumps({
            'type': 'room_info',
            'membre_name': membre_name,
            'doctors_in_room': self.channel_layer.doctors_in_room[self.room_group_name],
            'member_status': self.channel_layer.member_status[self.room_group_name]  # Send member status
        }))

        # Load the chat history and send it to the client
        messages = await self.get_chat_history()
        await self.send(text_data=json.dumps({
            'type': 'chat_history',
            'messages': messages
        }))

    async def disconnect(self, close_code):
        user = self.scope["user"]
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        # If the user is a member, set their status to "disconnected"
        if user.is_authenticated and user.user_type == 'membre':
            self.channel_layer.member_status[self.room_group_name] = {'name': user.username, 'status': 'disconnected'}
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'member_disconnected',
                    'member_name': user.username
                }
            )

        # Notify other users that the doctor has left
        if user.is_authenticated and user.user_type == 'medecin':
            self.channel_layer.doctors_in_room[self.room_group_name] = [
                doc for doc in self.channel_layer.doctors_in_room[self.room_group_name] if doc['name'] != user.username
            ]
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'doctor_left',
                    'doctor_name': user.username
                }
            )

    async def receive(self, text_data):
        user = self.scope["user"]
        text_data_json = json.loads(text_data)

        # Manage the heartbeat or status changes based on the message type
        if text_data_json.get('type') == 'heartbeat':
            await self.handle_heartbeat(user)

        elif text_data_json.get('type') == 'active':
            # Update the status to active (for members or doctors)
            if user.user_type == 'membre':
                self.channel_layer.member_status[self.room_group_name] = {'name': user.username, 'status': 'active'}
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'member_active',
                        'member_name': user.username
                    }
                )
                # Appeler la fonction pour marquer les messages des médecins comme vus par le membre
                await self.mark_messages_as_seen_for_member()

            elif user.user_type == 'medecin':
                self.channel_layer.doctors_in_room[self.room_group_name] = [
                    {**doc, 'status': 'active'} if doc['name'] == user.username else doc
                    for doc in self.channel_layer.doctors_in_room[self.room_group_name]
                ]
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'doctor_active',
                        'doctor_name': user.username
                    }
                )
                # Appeler la fonction pour marquer les messages du membre comme vus par le médecin
                await self.mark_messages_as_seen_for_doctor()

        elif text_data_json.get('type') == 'inactive':
            # Update the status to inactive (for members or doctors)
            if user.user_type == 'membre':
                self.channel_layer.member_status[self.room_group_name] = {'name': user.username, 'status': 'inactive'}
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'member_inactive',
                        'member_name': user.username
                    }
                )
            else:
                self.channel_layer.doctors_in_room[self.room_group_name] = [
                    {**doc, 'status': 'inactive'} if doc['name'] == user.username else doc
                    for doc in self.channel_layer.doctors_in_room[self.room_group_name]
                ]
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'doctor_inactive',
                        'doctor_name': user.username
                    }
                )

        elif 'message' in text_data_json:
            message_content = text_data_json.get('message', '')

            # Save the message to the database
            message = await self.save_message(user, message_content)

            # Envoie le message avec le type de l'expéditeur
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message.content,
                    'message_id': message.id,  # Ajoute l'ID du message
                    'sender': message.sender.username,
                    'sender_type': 'medecin' if user.user_type == 'medecin' else 'membre',  # Ajoute le type de l'expéditeur
                    'timestamp': message.timestamp.isoformat(),
                    'seen': message.seen
                }
            )



    async def check_message_seen_on_receive(self, user, event):
        """
        Vérifie immédiatement si le message doit être marqué comme vu lors de la réception du message.
        """
        # Si le message vient d'un membre, vérifier si les médecins sont actifs
        if user.user_type == 'membre':
            doctors_active = any(doc['status'] == 'active' for doc in self.channel_layer.doctors_in_room[self.room_group_name])
            if doctors_active:
                await self.mark_messages_as_seen_for_member()

        # Si le message vient d'un médecin, vérifier si le membre est actif
        elif user.user_type == 'medecin':
            member_status = self.channel_layer.member_status[self.room_group_name]
            if member_status['status'] == 'active':
                await self.mark_messages_as_seen_for_doctor()

    async def mark_messages_as_seen_for_doctor(self):
        """
        Marque les messages envoyés par le membre comme vus par un médecin actif
        et envoie une mise à jour via WebSocket.
        """
        unseen_messages = await database_sync_to_async(
            lambda: list(self.chat_room.messages.filter(sender__user_type='membre', seen=False))
        )()

        for message in unseen_messages:
            message.seen = True
            await database_sync_to_async(message.save)()

            # Envoie une mise à jour WebSocket pour notifier que le message a été vu
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'message_seen',
                    'message_id': message.id,  # Envoie l'ID du message vu
                    'seen': True
                }
            )
        # print(f"Messages envoyés par le membre marqués comme vus.")

    async def mark_messages_as_seen_for_member(self):
        """
        Marque les messages envoyés par les médecins comme vus par le membre actif
        et envoie une mise à jour via WebSocket.
        """
        unseen_messages = await database_sync_to_async(
            lambda: list(self.chat_room.messages.filter(sender__user_type='medecin', seen=False))
        )()

        for message in unseen_messages:
            message.seen = True
            await database_sync_to_async(message.save)()

            # Envoie une mise à jour WebSocket pour notifier que le message a été vu
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'message_seen',
                    'message_id': message.id,  # Envoie l'ID du message vu
                    'seen': True
                }
            )
        # print(f"Messages envoyés par les médecins marqués comme vus.")


    async def message_seen(self, event):
        """
        Gère la mise à jour lorsqu'un message est marqué comme vu.
        """
        await self.send(text_data=json.dumps({
            'type': 'message_seen',
            'message_id': event['message_id'],
            'seen': event['seen']
        }))



    async def member_active(self, event):
        await self.send(text_data=json.dumps({
            'type': 'member_active',
            'member_name': event['member_name'],
        }))

    async def member_inactive(self, event):
        await self.send(text_data=json.dumps({
            'type': 'member_inactive',
            'member_name': event['member_name'],
        }))

    async def member_disconnected(self, event):
        await self.send(text_data=json.dumps({
            'type': 'member_disconnected',
            'member_name': event['member_name'],
        }))

    @database_sync_to_async
    def get_or_create_bot_user(self):
        """
        Retrieve or create the bot user in the database.
        This user will act as the AI assistant when no doctors are available.
        """
        bot_username = 'Bot01'
        
        # Attempt to retrieve the bot user from the database
        bot_user, created = User.objects.get_or_create(
            username=bot_username,
            defaults={
                'first_name': 'Assistant',
                'last_name': 'IA',
                'email': 'bot01@example.com',
                'is_active': True,  # Ensure the bot is marked as active
                'user_type': 'bot',  # Ensure the bot has a proper user type, assuming you have a 'user_type' field
            }
        )
        
        return bot_user
    
    @database_sync_to_async
    def save_message_from_ai(self, content):
        bot_user = User.objects.get(username='Bot01')  # Get the bot user
        message = Message.objects.create(room=self.chat_room, sender=bot_user, content=content)
        return message
    
    @database_sync_to_async
    def get_last_40_messages(self):
        """
        Retrieve the last 40 messages from the chat history (combining member, doctor, and AI assistant messages).
        """
        messages = list(self.chat_room.messages.all().order_by('-timestamp')[:40])  # Get up to 40 messages
        return messages[::-1]  # Reverse the order to preserve chronology

    async def get_ai_response(self, user_message):
        """
        Send the user message to the AI assistant (Ollama API) and stream its response.
        Sends context and limits history to 40 messages.
        """

        # Fetch the last 40 messages to form a context
        messages = await self.get_last_40_messages()

        async def get_message_info(msg):
            sender_type = await database_sync_to_async(lambda: msg.sender.user_type)()
            return {
                "role": "user" if sender_type == 'membre' else "assistant" if sender_type == 'bot' else "doctor",
                "content": msg.content
            }

        formatted_messages = [await get_message_info(msg) for msg in messages]

        payload = {
            "model": "llama3.1:latest",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are an assistant in a healthcare consultation system. Keep your answer as short as possible (20 words). "
                        "Your role is to provide preliminary assessments based on the user's symptoms and help them understand medical information. "
                        "First, ask for their symptoms if not provided. Confirm the symptoms with the user, and after confirmation, give a list of up to 5 potential conditions ranked by likelihood. "
                        "Do not suggest treatments or medications. Always advise the user to consult a real doctor for a final diagnosis and treatment."
                    )
                }
            ] + formatted_messages + [
                {
                    "role": "user",  # The current user message that the bot is responding to
                    "content": user_message
                }
            ],
            "options": {
                "top_p": 0.6,
                "temperature": 0
            },
            "stream": True
        }

        # Make the request to the AI API
        url = "http://192.168.88.252:11434/api/chat"

        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=payload) as response:
                decoder = json.JSONDecoder()
                buffer = ""
                full_message = ""  # Accumulate the full streamed message

                async for chunk in response.content.iter_any():
                    buffer += chunk.decode("utf-8")  # Accumulate chunks
                    while buffer:
                        try:
                            # Try to decode the buffered content
                            result, index = decoder.raw_decode(buffer)
                            buffer = buffer[index:].lstrip()  # Trim the buffer

                            # If we get a message, accumulate the content and stream it in real-time
                            if 'message' in result:
                                chunk_message = result['message']['content']
                                full_message += chunk_message  # Accumulate full message

                                # Send the chunk to the front-end for real-time streaming
                                await self.send(text_data=json.dumps({
                                    'type': 'chat_message_stream',
                                    'message': chunk_message,
                                }))

                        except json.JSONDecodeError:
                            # Break the loop if more chunks are needed
                            break

                # Return the full message after the stream is complete
                return full_message


    async def chat_message(self, event):
        """
        Gestion de la réception d'un message par le WebSocket.
        """
        # Envoyer le message reçu au client
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'message_id': event['message_id'],
            'sender': event['sender'],
            'timestamp': event['timestamp'],
            'seen': event.get('seen', False)  # Statut vu/non vu
        }))
        
        user = self.scope["user"]
        
        # Vérifie si l'utilisateur est bien le destinataire du message avant de marquer comme vu
        if user.username != event['sender']:  # Le destinataire est différent de l'expéditeur
            # Si le message vient d'un membre, vérifier si les médecins sont actifs
            if event['sender_type'] == 'membre' and any(doc['status'] == 'active' for doc in self.channel_layer.doctors_in_room[self.room_group_name]):
                await self.mark_messages_as_seen_for_doctor()

            # Si le message vient d'un médecin, vérifier si le membre est actif
            elif event['sender_type'] == 'medecin' and self.channel_layer.member_status[self.room_group_name]['status'] == 'active':
                await self.mark_messages_as_seen_for_member()

        # New logic for AI assistant messages
        if event['sender_type'] == 'membre' and not self.channel_layer.doctors_in_room[self.room_group_name]:
            # If no doctors are available, forward the message to the AI assistant
            ai_response = await self.get_ai_response(event['message'])

            # Save the AI response to the database after the full stream ends (DO NOT broadcast it again)
            bot_user = await self.get_or_create_bot_user()  # Create or retrieve the AI bot user
            bot_message = await self.save_message(bot_user, ai_response)

            # The message has already been streamed, so we only save it without broadcasting again




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

    async def doctor_active(self, event):
        await self.send(text_data=json.dumps({
            'type': 'doctor_active',
            'doctor_name': event['doctor_name'],
        }))

    async def doctor_inactive(self, event):
        await self.send(text_data=json.dumps({
            'type': 'doctor_inactive',
            'doctor_name': event['doctor_name'],
        }))

    async def handle_heartbeat(self, user):
        if user.is_authenticated and user.user_type == 'medecin':
            # print(f"Received heartbeat from doctor: {user.username}")
            pass

    @database_sync_to_async
    def get_chat_room(self, membre_id):
        return ChatRoom.objects.get(membre_id=membre_id)

    @database_sync_to_async
    def get_membre_name(self):
        # Return the member's name from the chat room
        return self.chat_room.membre.username

    @database_sync_to_async
    def save_message(self, sender, content):
        message = Message.objects.create(room=self.chat_room, sender=sender, content=content)
        return message

    @database_sync_to_async
    def get_chat_history(self):
        messages = self.chat_room.messages.all().order_by('timestamp')
        return [
        {
            'message_id': msg.id,  # Ajoute l'ID du message
            'message': msg.content,
            'sender': msg.sender.username,
            'timestamp': msg.timestamp.isoformat(),
            'seen': msg.seen
        }
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
