# esante/asgi.py

import os

# Définir DJANGO_SETTINGS_MODULE avant toute autre importation
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'esante.settings')

# Importer Django et initialiser le setup
import django
django.setup()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from consultation.routing import websocket_urlpatterns  # Import après la configuration

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
