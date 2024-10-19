from django.db import models
from django.conf import settings

class MedicalRecord(models.Model):
    member = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'membre'},
        related_name='medical_record'
    )
    
    def __str__(self):
        return f"Dossier médical de {self.member.username}"


class ConsultationHistory(models.Model):
    medical_record = models.ForeignKey(MedicalRecord, on_delete=models.CASCADE, related_name='consultations')
    date = models.DateField()
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True,
        limit_choices_to={'user_type': 'medecin'}
    )
    establishment = models.CharField(max_length=100)
    symptoms = models.TextField()
    diagnosis = models.TextField()
    prescriptions = models.TextField(blank=True)
    treatments = models.TextField(blank=True)

    def __str__(self):
        return f"Consultation du {self.date} - {self.diagnosis}"
