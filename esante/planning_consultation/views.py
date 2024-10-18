from datetime import datetime, timedelta
from django.shortcuts import render
from planning_consultation.models import Consultation
import json
import locale

def consultation_schedule(request):
    # Set locale to French
    locale.setlocale(locale.LC_TIME, "fr_FR.UTF-8")  # For Windows, use "French" instead of "fr_FR.UTF-8"

    # Get the week offset from the query parameters, default to 0 if not provided
    try:
        week_offset = int(request.GET.get('week', 0))  # Default to 0 if 'week' is empty or not provided
    except ValueError:
        week_offset = 0

    # Get the Monday of the current week (taking into account the offset)
    today = datetime.today()
    current_week_start = today - timedelta(days=today.weekday()) + timedelta(weeks=week_offset)

    # Generate the days for the current week (starting on Monday), in French
    days_of_week = [(current_week_start + timedelta(days=i)).strftime("%A %d/%m/%Y") for i in range(7)]
    hours = [f"{i}h - {i+1}h" for i in range(7, 17)]

    # Filter consultations based on the current week using consultation_start_time
    consultations = Consultation.objects.filter(
        consultation_start_time__gte=current_week_start,
        consultation_start_time__lt=(current_week_start + timedelta(days=7))
    )

    # Create a dictionary for storing consultations by day and hour
    consultations_by_day = {day: {hour: None for hour in hours} for day in days_of_week}

    for consultation in consultations:
        day = consultation.consultation_start_time.strftime("%A %d/%m/%Y")
        hour = f"{consultation.consultation_start_time.hour}h - {consultation.consultation_start_time.hour + 1}h"
        consultations_by_day[day][hour] = consultation

    # Serialize the consultation data for use in JavaScript
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
        'week_days': days_of_week,
        'hours': hours,
        'consultations_by_day': consultations_by_day,
        'consultations_json': json.dumps(consultations_serialized),
        'week_offset': week_offset  # Pass the week offset for navigation
    }
    return render(request, 'planning_consultation/planning.html', context)
