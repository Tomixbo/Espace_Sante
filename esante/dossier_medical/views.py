from django.shortcuts import render, get_object_or_404
from accounts.models import CustomUser
from .models import MedicalRecord, ConsultationHistory
from django.contrib.auth.decorators import login_required
from accounts.views import medecin_required  # Assurez-vous d'importer votre décorateur
from django.views.decorators.http import require_POST
from django.http import JsonResponse

def get_dossier_medical(request, member_id):

    membre = get_object_or_404(CustomUser, pk=member_id, user_type='membre')
    medical_record, created = MedicalRecord.objects.get_or_create(member=membre)
    
    context = {
        'membre': membre,
        'consultations': medical_record.consultations.all().order_by('-date'),
    }

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return render(request, 'dossier_medical/dossier_medical_content.html', context)

    return render(request, 'dossier_medical/dossier_medical.html', context)

@login_required
@medecin_required
def list_members(request):
    members = CustomUser.objects.filter(user_type='membre')
    context = {
        'members': members,
    }
    return render(request, 'dossier_medical/list_members.html', context)

@login_required
@medecin_required
@require_POST
def add_consultation(request, member_id):
    membre = get_object_or_404(CustomUser, pk=member_id, user_type='membre')
    medical_record, created = MedicalRecord.objects.get_or_create(member=membre)

    # Récupérer les données du formulaire
    date = request.POST.get('date')
    establishment = request.POST.get('establishment')
    symptoms = request.POST.get('symptoms')
    diagnosis = request.POST.get('diagnosis')
    prescriptions = request.POST.get('prescriptions', '')
    treatments = request.POST.get('treatments', '')

    # Créer une nouvelle consultation
    ConsultationHistory.objects.create(
        medical_record=medical_record,
        date=date,
        doctor=request.user,
        establishment=establishment,
        symptoms=symptoms,
        diagnosis=diagnosis,
        prescriptions=prescriptions,
        treatments=treatments,
    )

    return JsonResponse({'message': 'Consultation ajoutée avec succès.'})