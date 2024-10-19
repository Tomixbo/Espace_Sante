from django.contrib import admin
from .models import MedicalRecord, ConsultationHistory

class ConsultationHistoryInline(admin.TabularInline):
    model = ConsultationHistory
    extra = 1  # Nombre de lignes vides par défaut

@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    list_display = ('member',)
    search_fields = ('member__username',)
    inlines = [ConsultationHistoryInline]

@admin.register(ConsultationHistory)
class ConsultationHistoryAdmin(admin.ModelAdmin):
    list_display = ('medical_record', 'date', 'doctor', 'diagnosis', 'establishment')
    search_fields = ('medical_record__member__username', 'doctor__username', 'diagnosis')
    list_filter = ('date', 'doctor', 'establishment')
