
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.filters import SearchFilter

from .serializers import LoginSerializer, UserSerializer

from rest_framework import generics
from .models import User
from .serializers import (
    EmployeeSerializer,
    EmployeeUpdateSerializer,
)
from .permissions import IsAdmin


class LoginView(APIView):

    permission_classes = []

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        return Response(
            {"message": "Logged out successfully."},
            status=status.HTTP_200_OK,
        )


class CurrentUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)


class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.filter(
        role=User.Role.EMPLOYEE,
        status=True
    )
    permission_classes = [IsAdmin]
    serializer_class = EmployeeSerializer

    filter_backends = [SearchFilter]

    search_fields = [
        "username",
        "first_name",
        "last_name",
        "email",
        "department",
        "designation",
    ]


class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(
        role=User.Role.EMPLOYEE,
        status=True
    )
    permission_classes = [IsAdmin]

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return EmployeeUpdateSerializer
        return EmployeeSerializer

    def perform_destroy(self, instance):
        instance.status = False
        instance.save()
