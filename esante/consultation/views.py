from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from accounts.models import CustomUser  # Remplace par le bon modèle pour les membres
from django.http import HttpResponseForbidden
from accounts.views import medecin_required, membre_required


# Vue pour l'espace consultation du membre

@login_required
@membre_required
def consultation_view(request):
    # Ici, récupère l'utilisateur connecté en tant que membre
    membre = get_object_or_404(CustomUser, pk=request.user.id)
    
    # Passe l'ID du membre au template pour React
    context = {
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
        'membre': membre,  # Passer l'objet membre (membre sélectionné)
    }
    return render(request, 'consultation/chat_medecin.html', context)