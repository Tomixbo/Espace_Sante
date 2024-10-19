# planning_consultation/serializers.py

from rest_framework import serializers
from planning_consultation.models import Consultation
from accounts.models import CustomUser

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ['id', 'doctor', 'patient', 'facility', 'consultation_start_time', 'consultation_end_time']

class AvailabilitySerializer(serializers.Serializer):
    date = serializers.DateField()
    hour = serializers.IntegerField(min_value=0, max_value=23)
