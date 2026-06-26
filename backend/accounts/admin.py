from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "username",
        "email",
        "role",
        "department",
        "designation",
        "status",
        "is_staff",
    )

    list_filter = (
        "role",
        "status",
        "is_staff",
    )

    fieldsets = UserAdmin.fieldsets + (
        (
            "Employee Information",
            {
                "fields": (
                    "role",
                    "department",
                    "designation",
                    "status",
                )
            },
        ),
    )
