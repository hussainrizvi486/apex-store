from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from apps.user_auth.api.login import LoginAPI
from apps.user_auth.api.register import RegisterUserView
from apps.user_auth.api.address import AddressView
from apps.user_auth.api.user import UserAPIView


urlpatterns = [
    path("api/v1/login", LoginAPI.as_view(), name="login"),
    path("api/v1/login/refresh", TokenRefreshView.as_view(), name="refresh-jwt-token"),
    path("api/v1/user/register", RegisterUserView.as_view(), name="register"),
    path("api/v1/user", UserAPIView.as_view()),
    path(
        "api/user/address/create",
        AddressView.as_view({"post": "create"}),
        name="create-address",
    ),
    path(
        "api/user/address/list",
        AddressView.as_view({"get": "list"}),
        name="get-address",
    ),
]
