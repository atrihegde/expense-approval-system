from datetime import date
from rest_framework import serializers
from .models import Category, ExpenseClaim


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ExpenseClaimSerializer(serializers.ModelSerializer):
    employee = serializers.StringRelatedField(read_only=True)
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )

    class Meta:
        model = ExpenseClaim

        fields = (
            "id",
            "title",
            "category",
            "category_name",
            "employee",
            "amount",
            "expense_date",
            "description",
            "receipt",
            "status",
            "manager_comments",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "employee",
            "status",
            "manager_comments",
            "created_at",
            "updated_at",
        )

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Amount must be greater than zero."
            )
        return value

    def validate_expense_date(self, value):
        if value > date.today():
            raise serializers.ValidationError(
                "Expense date cannot be in the future."
            )
        return value

    def validate(self, attrs):
        category = attrs.get("category", getattr(
            self.instance, "category", None))
        amount = attrs.get("amount", getattr(self.instance, "amount", None))
        if category and amount and amount > category.max_amount:
            raise serializers.ValidationError(
                {
                    "amount":
                    f"Maximum amount for {category.name} is {category.max_amount}."
                }
            )
        return attrs


class ApprovalSerializer(serializers.ModelSerializer):
    manager_comments = serializers.CharField(
        required=False,
        allow_blank=True
    )

    class Meta:
        model = ExpenseClaim
        fields = (
            "status",
            "manager_comments",
        )

    def validate(self, attrs):
        status = attrs.get("status")
        comments = attrs.get("manager_comments")
        if (
            status == ExpenseClaim.Status.REJECTED
            and not comments
        ):
            raise serializers.ValidationError(
                {
                    "manager_comments":
                    "Comment is required when rejecting."
                }
            )
        return attrs
