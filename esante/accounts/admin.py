from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Show the ID field along with other fields in the list view
    list_display = ('id', 'username', 'email', 'is_online', 'last_seen', 'is_staff', 'user_type')

    # Add ID and other custom fields to the detail view (form view)
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('id', 'is_online', 'last_seen', 'user_type')}),
    )

    # Make ID and other fields read-only
    readonly_fields = ('id', 'is_online', 'last_seen')

# Register the updated admin configuration for the CustomUser model
admin.site.register(CustomUser, CustomUserAdmin)
