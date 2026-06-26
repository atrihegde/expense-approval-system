from django.urls import path
from .views import LoginView, LogoutView, CurrentUserView
from .views import (
    LoginView,
    LogoutView,
    CurrentUserView,
    EmployeeListCreateView,
    EmployeeDetailView,
)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
    path(
        "employees/",
        EmployeeListCreateView.as_view(),
        name="employee-list",
    ),

    path(
        "employees/<int:pk>/",
        EmployeeDetailView.as_view(),
        name="employee-detail",
    ),
]
