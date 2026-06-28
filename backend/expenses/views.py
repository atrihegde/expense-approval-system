from rest_framework import generics
from accounts.permissions import IsAdmin

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import serializers

from django.db.models import Sum
from rest_framework.views import APIView

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from accounts.models import User
from .models import (
    Category,
    ExpenseClaim,
)

from .serializers import (
    CategorySerializer,
    ExpenseClaimSerializer,
    ApprovalSerializer,
    DashboardSerializer,
)


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(status=True)
    serializer_class = CategorySerializer
    filter_backends = [SearchFilter]
    search_fields = ["name"]

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]

        return [IsAdmin()]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.filter(status=True)
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]

        return [IsAdmin()]


class ExpenseClaimViewSet(viewsets.ModelViewSet):
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filterset_fields = [
        "status",
        "category",
        "expense_date",
    ]
    search_fields = [
        "title",
        "description",
        "category__name",
    ]
    ordering_fields = [
        "amount",
        "expense_date",
        "created_at",
    ]
    queryset = ExpenseClaim.objects.all()

    serializer_class = ExpenseClaimSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.role == user.Role.ADMIN:
            return ExpenseClaim.objects.all()

        return ExpenseClaim.objects.filter(employee=user)

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

    def perform_update(self, serializer):
        claim = self.get_object()

        if claim.status in [
            ExpenseClaim.Status.SUBMITTED,
            ExpenseClaim.Status.APPROVED,
        ]:
            raise serializers.ValidationError(
                "This claim cannot be edited."
            )

        serializer.save()

    def perform_destroy(self, instance):
        if instance.status == ExpenseClaim.Status.APPROVED:
            raise serializers.ValidationError(
                "Approved claims cannot be deleted."
            )
        instance.delete()

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        if request.user.role != request.user.Role.ADMIN:
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )

        claim = self.get_object()

        if claim.status != ExpenseClaim.Status.SUBMITTED:
            return Response(
                {
                    "detail":
                    "Only submitted claims can be approved."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ApprovalSerializer(
            claim,
            data={
                "status": ExpenseClaim.Status.APPROVED,
                "manager_comments": request.data.get(
                    "manager_comments",
                    "",
                ),
            },
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        if request.user.role != request.user.Role.ADMIN:
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )

        claim = self.get_object()

        if claim.status != ExpenseClaim.Status.SUBMITTED:
            return Response(
                {
                    "detail":
                    "Only submitted claims can be rejected."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ApprovalSerializer(
            claim,
            data={
                "status": ExpenseClaim.Status.REJECTED,
                "manager_comments": request.data.get(
                    "manager_comments",
                    "",
                ),
            },
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):
        claim = self.get_object()

        if claim.employee != request.user:
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if claim.status != ExpenseClaim.Status.DRAFT:
            return Response(
                {"detail": "Only draft claims can be submitted."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        claim.status = ExpenseClaim.Status.SUBMITTED
        claim.save()

        return Response(
            self.get_serializer(claim).data,
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def resubmit(self, request, pk=None):
        claim = self.get_object()

        if claim.employee != request.user:
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if claim.status != ExpenseClaim.Status.REJECTED:
            return Response(
                {
                    "detail":
                    "Only rejected claims can be resubmitted."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        claim.status = ExpenseClaim.Status.SUBMITTED
        claim.manager_comments = ""
        claim.save()

        return Response(
            self.get_serializer(claim).data,
            status=status.HTTP_200_OK,
        )


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == User.Role.ADMIN:
            recent_claims = ExpenseClaim.objects.order_by(
                "-created_at"
            )[:5]

            data = {
                "total_employees": User.objects.filter(
                    role=User.Role.EMPLOYEE,
                    status=True,
                ).count(),

                "total_categories": Category.objects.filter(
                    status=True,
                ).count(),

                "total_claims": ExpenseClaim.objects.count(),

                "pending_claims": ExpenseClaim.objects.filter(
                    status=ExpenseClaim.Status.SUBMITTED,
                ).count(),

                "approved_claims": ExpenseClaim.objects.filter(
                    status=ExpenseClaim.Status.APPROVED,
                ).count(),

                "rejected_claims": ExpenseClaim.objects.filter(
                    status=ExpenseClaim.Status.REJECTED,
                ).count(),

                "recent_claims": recent_claims,
            }

        else:
            queryset = ExpenseClaim.objects.filter(
                employee=user,
            )

            recent_claims = queryset.order_by(
                "-created_at"
            )[:5]

            total_amount = (
                queryset.aggregate(
                    total=Sum("amount")
                )["total"] or 0
            )

            data = {
                "my_claims": queryset.count(),

                "pending_claims": queryset.filter(
                    status=ExpenseClaim.Status.SUBMITTED,
                ).count(),

                "approved_claims": queryset.filter(
                    status=ExpenseClaim.Status.APPROVED,
                ).count(),

                "rejected_claims": queryset.filter(
                    status=ExpenseClaim.Status.REJECTED,
                ).count(),

                "total_amount_claimed": total_amount,

                "recent_claims": recent_claims,
            }

        serializer = DashboardSerializer(instance=data)

        return Response(serializer.data)
