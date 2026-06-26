from django.contrib import admin
from .models import Category
from .models import Category, ExpenseClaim


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "max_amount",
        "status",
    )

    list_filter = ("status",)

    search_fields = ("name",)


@admin.register(ExpenseClaim)
class ExpenseClaimAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "employee",
        "category",
        "amount",
        "status",
        "expense_date",
    )

    list_filter = (
        "status",
        "category",
    )

    search_fields = (
        "title",
        "employee__username",
    )
