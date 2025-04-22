from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    ordering = ('email',)
    list_display = ('email', 'nom', 'prenom', 'type', 'tel', 'is_staff', 'is_active')
    list_filter = ('type', 'is_staff', 'is_active', 'sexe')
    search_fields = ('email', 'nom', 'prenom', 'tel')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Informations personnelles'), {
            'fields': ('nom', 'prenom', 'dateNaissance', 'photo', 'sexe', 'tel', 'type')
        }),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        (_('Dates importantes'), {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'tel', 'password1', 'password2', 'nom', 'prenom', 'type', 'sexe', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}
        ),
    )
