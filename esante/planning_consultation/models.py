from django.db import models
from accounts.models import CustomUser  # Assuming your CustomUser model is in the 'account' app

class Consultation(models.Model):
    DOCTOR = 'medecin'
    MEMBER = 'membre'

    # Foreign key to reference the doctor (medecin)
    doctor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'user_type': DOCTOR}, related_name='consultations_as_doctor')
    
    # Foreign key to reference the patient (membre)
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'user_type': MEMBER}, related_name='consultations_as_patient')
    
    # Consultation facility (or online)
    facility = models.CharField(max_length=100, null=True, blank=True, help_text="The consultation facility or 'Online' for virtual consultations.")
    
    # Date and time of the consultation
    consultation_start_time = models.DateTimeField()  # Use DateTimeField
    consultation_end_time = models.DateTimeField()  # Use DateTimeField

    def __str__(self):
        return f"Consultation of {self.patient.username} with Dr. {self.doctor.username} at {self.facility or 'Online'} on {self.consultation_start_time} to {self.consultation_end_time}"
