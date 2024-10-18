from datetime import datetime, timedelta
from django.shortcuts import render
from planning_consultation.models import Consultation
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from accounts.models import CustomUser
from django.middleware.csrf import get_token
import json
import locale

@csrf_exempt
@login_required
def create_consultation(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            consultation_start_time_str = data.get('consultation_start_time')
            consultation_end_time_str = data.get('consultation_end_time')
            doctor_id = data.get('doctor')  # for members to select doctor
            patient_id = data.get('patient')  # for doctors to select patient

            # Parse the datetime strings
            consultation_start_time = datetime.fromisoformat(consultation_start_time_str)
            consultation_end_time = datetime.fromisoformat(consultation_end_time_str)

            # Identify if it's a doctor or patient making the booking
            if request.user.user_type == 'medecin':
                patient = get_object_or_404(CustomUser, id=patient_id, user_type='membre')
                doctor = request.user
            else:
                doctor = get_object_or_404(CustomUser, id=doctor_id, user_type='medecin')
                patient = request.user

            # Create the consultation
            Consultation.objects.create(
                doctor=doctor,
                patient=patient,
                facility='Online',  # You can allow dynamic facility in future if needed
                consultation_start_time=consultation_start_time,
                consultation_end_time=consultation_end_time
            )

            return JsonResponse({'status': 'success', 'message': 'Consultation réservée avec succès.'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@login_required
def consultation_schedule(request):
    # Set locale to French
    locale.setlocale(locale.LC_TIME, "fr_FR.UTF-8")  # For Windows, use "French" instead of "fr_FR.UTF-8"


    try:
        week_offset = int(request.GET.get('week', 0))
    except ValueError:
        week_offset = 0

    today = datetime.today()
    current_week_start = today - timedelta(days=today.weekday()) + timedelta(weeks=week_offset)

    # Generate week_days as a list of dictionaries
    week_days = []
    for i in range(7):
        day_date = current_week_start + timedelta(days=i)
        day_display = day_date.strftime("%A %d/%m/%Y")
        week_days.append({'date': day_date, 'display': day_display})

    hours = [f"{i}h - {i+1}h" for i in range(7, 17)]

    # Filter consultations for the current week
    consultations = Consultation.objects.filter(
        consultation_start_time__date__gte=current_week_start.date(),
        consultation_start_time__date__lt=(current_week_start + timedelta(days=7)).date()
    )

    # Create consultations_by_day dictionary
    consultations_by_day = {day['display']: {hour: None for hour in hours} for day in week_days}

    for consultation in consultations:
        day_display = consultation.consultation_start_time.strftime("%A %d/%m/%Y")
        hour = f"{consultation.consultation_start_time.hour}h - {consultation.consultation_start_time.hour + 1}h"
        if day_display in consultations_by_day:
            consultations_by_day[day_display][hour] = consultation

    doctors = CustomUser.objects.filter(user_type='medecin')
    patients = CustomUser.objects.filter(user_type='membre')

    # Serialize consultations
    consultations_serialized = []
    for consultation in consultations:
        consultations_serialized.append({
            'id': consultation.id,
            'doctor': consultation.doctor.username,
            'patient': consultation.patient.username,
            'facility': consultation.facility,
            'consultation_start_time': consultation.consultation_start_time.isoformat(),
            'consultation_end_time': consultation.consultation_end_time.isoformat()
        })

    context = {
        'today': today,
        'week_days': week_days,
        'hours': hours,
        'consultations_by_day': consultations_by_day,
        'consultations_json': json.dumps(consultations_serialized),
        'week_offset': week_offset,
        'doctors': doctors,
        'patients': patients,
        'user_is_doctor': request.user.user_type == 'medecin',
        'user': request.user,
        'csrf_token': get_token(request),
    }
    return render(request, 'planning_consultation/planning.html', context)
