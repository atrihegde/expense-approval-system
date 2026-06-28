from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from expenses.models import Category

User = get_user_model()


class Command(BaseCommand):
    help = "Creates demo users and categories"

    def handle(self, *args, **kwargs):

        admin, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "first_name": "Admin",
                "last_name": "User",
                "email": "admin@example.com",
                "role": User.Role.ADMIN,
            },
        )

        # Always ensure the admin has the correct permissions
        admin.role = User.Role.ADMIN
        admin.is_staff = True
        admin.is_superuser = True
        admin.is_active = True
        admin.set_password("admin123")
        admin.save()

        if created:
            self.stdout.write(
                self.style.SUCCESS("Admin created")
            )

        employee, created = User.objects.get_or_create(
            username="employee",
            defaults={
                "first_name": "John",
                "last_name": "Employee",
                "role": User.Role.EMPLOYEE,
                "email": "employee@example.com",
            },
        )

        employee.role = User.Role.EMPLOYEE
        employee.is_staff = False
        employee.is_superuser = False
        employee.is_active = True
        employee.set_password("employee123")
        employee.save()

        if created:
            self.stdout.write(
                self.style.SUCCESS("Employee created")
            )

        categories = [
            ("Travel", 5000, "Travel expenses"),
            ("Food", 7000, "Food expenses"),
            ("Accommodation", 10000, "Accommodation expenses"),
        ]

        created_count = 0

        for name, amount, desc in categories:
            _, created = Category.objects.get_or_create(
                name=name,
                defaults={
                    "max_amount": amount,
                    "description": desc,
                },
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{created_count} categories created."
            )
        )
