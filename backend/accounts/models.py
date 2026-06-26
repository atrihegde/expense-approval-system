from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        EMPLOYEE = "EMPLOYEE", "Employee"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.EMPLOYEE,
    )

    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.username
