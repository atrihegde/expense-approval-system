from rest_framework import generics

from .models import Category
from .serializers import CategorySerializer

from accounts.permissions import IsAdmin


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
