from rest_framework import serializers


class DashboardSerializer(serializers.Serializer):

    total_employees = serializers.IntegerField(required=False)

    total_categories = serializers.IntegerField(required=False)

    total_claims = serializers.IntegerField(required=False)

    my_claims = serializers.IntegerField(required=False)

    pending_claims = serializers.IntegerField()

    approved_claims = serializers.IntegerField()

    rejected_claims = serializers.IntegerField()

    total_amount_claimed = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
        required=False,
    )

    recent_claims = serializers.ListField()
