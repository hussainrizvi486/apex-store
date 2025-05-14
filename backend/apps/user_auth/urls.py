from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from apps.user_auth.api.login import LoginAPI
from apps.user_auth.api.register import RegisterUserView


urlpatterns = [
    path("api/v1/login", LoginAPI.as_view(), name="login"),
    path("api/v1/login/refresh", TokenRefreshView.as_view(), name="refresh-jwt-token"),
    path("api/v1/user/register", RegisterUserView.as_view(), name="register"),
]
