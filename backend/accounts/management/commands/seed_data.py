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
                "role": User.Role.ADMIN,
                "email": "admin@example.com",
            },
        )

        if created:
            admin.set_password("admin123")
            admin.save()
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

        if created:
            employee.set_password("employee123")
            employee.save()
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
