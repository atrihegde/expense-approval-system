from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryListCreateView,
    CategoryDetailView,
    ExpenseClaimViewSet,
)

router = DefaultRouter()
router.register(
    r"claims",
    ExpenseClaimViewSet,
    basename="claims",
)

urlpatterns = [
    path(
        "categories/",
        CategoryListCreateView.as_view(),
        name="category-list",
    ),
    path(
        "categories/<int:pk>/",
        CategoryDetailView.as_view(),
        name="category-detail",
    ),
]

urlpatterns += router.urls
