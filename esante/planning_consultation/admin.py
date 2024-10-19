from django.contrib import admin
from .models import Consultation

class ConsultationAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'patient', 'facility', 'consultation_start_time', 'consultation_end_time')
    list_filter = ('consultation_start_time', 'doctor', 'patient')

admin.site.register(Consultation, ConsultationAdmin)
