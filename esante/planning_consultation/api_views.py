# planning_consultation/api_views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from planning_consultation.models import Consultation
from accounts.models import CustomUser
from .serializers import ConsultationSerializer, AvailabilitySerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta

class CheckAvailability(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = AvailabilitySerializer(data=request.GET)
        if serializer.is_valid():
            date = serializer.validated_data['date']
            hour = serializer.validated_data['hour']

            start_time = datetime.combine(date, datetime.min.time()).replace(hour=hour)
            end_time = start_time + timedelta(hours=1)

            # Vérifier si une consultation existe déjà pour ce créneau
            exists = Consultation.objects.filter(
                consultation_start_time=start_time,
                consultation_end_time=end_time
            ).exists()

            if exists:
                return Response({'available': False}, status=status.HTTP_200_OK)
            else:
                return Response({'available': True}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateConsultation(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ConsultationSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.validated_data.get('doctor')
            patient = serializer.validated_data.get('patient')
            consultation_start_time = serializer.validated_data.get('consultation_start_time')
            consultation_end_time = serializer.validated_data.get('consultation_end_time')
            facility = serializer.validated_data.get('facility', 'Online')

            # Vérifier si le créneau est disponible
            exists = Consultation.objects.filter(
                consultation_start_time=consultation_start_time,
                consultation_end_time=consultation_end_time
            ).exists()

            if exists:
                return Response({'error': 'Le créneau est déjà réservé.'}, status=status.HTTP_400_BAD_REQUEST)

            # Créer la consultation
            Consultation.objects.create(
                doctor=doctor,
                patient=patient,
                facility=facility,
                consultation_start_time=consultation_start_time,
                consultation_end_time=consultation_end_time
            )

            return Response({'status': 'success', 'message': 'Consultation réservée avec succès.'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
