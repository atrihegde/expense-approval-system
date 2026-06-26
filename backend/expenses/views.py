from rest_framework import generics
from accounts.permissions import IsAdmin

from .models import Category
from .serializers import CategorySerializer

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import serializers

from .models import ExpenseClaim
from .serializers import (
    ExpenseClaimSerializer,
    ApprovalSerializer,
)


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(status=True)
    serializer_class = CategorySerializer
    permission_classes = [IsAdmin]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.filter(status=True)
    serializer_class = CategorySerializer
    permission_classes = [IsAdmin]

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()


class ExpenseClaimViewSet(viewsets.ModelViewSet):
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
        claim = self.get_object()

        if claim.status != ExpenseClaim.Status.SUBMITTED:
            return Response(
                {
                    "detail":
                    "Only submitted claims can be approved."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        if request.user.role != request.user.Role.ADMIN:
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
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
        claim = self.get_object()

        if claim.status != ExpenseClaim.Status.SUBMITTED:
            return Response(
                {
                    "detail":
                    "Only submitted claims can be rejected."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if request.user.role != request.user.Role.ADMIN:
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
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
            ExpenseClaimSerializer(claim).data,
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
            ExpenseClaimSerializer(claim).data,
            status=status.HTTP_200_OK,
        )
