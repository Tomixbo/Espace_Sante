from django.shortcuts import render, get_object_or_404
from accounts.models import CustomUser

def get_dossier_medical(request, member_id):
    # Récupérer l'objet membre basé sur l'ID
    membre = get_object_or_404(CustomUser, pk=member_id)

    # Contexte à passer à chaque rendu
    context = {
        'membre': membre,
    }

    # Si la requête est AJAX, renvoyer uniquement le fragment de la page
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return render(request, 'dossier_medical/dossier_medical_content.html', context)

    # Sinon, renvoyer la page complète avec le contexte du membre et de l'utilisateur
    return render(request, 'dossier_medical/dossier_medical.html', context)
