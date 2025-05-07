from django.urls import path
from apps.user_auth.api.login import LoginAPI
from apps.user_auth.api.register import RegisterUserView


urlpatterns = [
    path("api/v1/login", LoginAPI.as_view(), name="login"),
    path("api/v1/user/register", RegisterUserView.as_view(), name="register"),
]
