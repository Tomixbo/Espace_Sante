from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Specify the model this admin class is for
    model = CustomUser

    # Show these fields in the list view (when listing users)
    list_display = ('username', 'email', 'is_online', 'last_seen', 'is_staff', 'user_type')

    # Add the new fields to the user detail view (form view)
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_online', 'last_seen', 'user_type')}),
    )

    # Optionally make the fields read-only in the detail view
    readonly_fields = ('is_online', 'last_seen')

# Register the updated admin configuration for the CustomUser model
admin.site.register(CustomUser, CustomUserAdmin)
