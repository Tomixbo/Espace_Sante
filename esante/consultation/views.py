from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from accounts.models import CustomUser  # Remplace par le bon modèle pour les membres
from django.http import HttpResponseForbidden
from accounts.views import medecin_required, membre_required
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.utils import timezone
from datetime import timedelta
from django.views.decorators.csrf import csrf_exempt
import requests

# Vue pour l'espace consultation du membre

@login_required
@membre_required
def consultation_view(request):
    # Ici, récupère l'utilisateur connecté en tant que membre
    membre = get_object_or_404(CustomUser, pk=request.user.id)
    
    # Passe l'ID du membre au template pour React
    context = {
        'user': request.user,
        'membre': membre,  # Passer l'objet membre (utilisateur connecté)
    }
    return render(request, 'consultation/consultation.html', context)

# Vue pour un médecin qui choisit un membre pour le chat
@login_required
@medecin_required
def chat_with_member_view(request, member_id):
    # Vérifie que l'utilisateur est un médecin
    if request.user.user_type != 'medecin':
        return HttpResponseForbidden("Vous n'avez pas accès à cette page.")
    
    # Récupère le membre sélectionné par le médecin
    membre = get_object_or_404(CustomUser, pk=member_id)
    
    # Passe les informations du membre au template pour React
    context = {
        'user': request.user,
        'membre': membre,  # Passer l'objet membre (membre sélectionné)
    }
    return render(request, 'consultation/chat_medecin.html', context)

@login_required
@medecin_required
def liste_consultations(request):

    # Récupérer la liste des membres (patients)
    User = get_user_model()
    membres = User.objects.filter(user_type='membre')  # Filtrer uniquement les membres

    context = {
        'user': request.user,
        'membres': membres
        
    }
    return render(request, 'consultation/liste_consultation.html', context)

@login_required
def heartbeat_view(request):
    user = request.user
    user.last_seen = timezone.now()
    user.save()
    return JsonResponse({'status': 'ok'})

@csrf_exempt
def check_ai_availability(request):
    try:
        # Call the Ollama API to check the model's availability
        response = requests.post(
            "http://192.168.88.252:11434/api/show",
            json={"model": "llama3.1:latest"}
        )

        # If the status code is 200, return AI as available
        if response.status_code == 200:
            return JsonResponse({"available": True})
        else:
            return JsonResponse({"available": False})

    except Exception as e:
        # Handle any errors by returning AI as unavailable
        return JsonResponse({"available": False, "error": str(e)})

