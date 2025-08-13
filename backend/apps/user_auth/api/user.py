from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from ..models import User
from ..serializers import UserSerializer


class UserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, *args, **kwargs):
        user_queryset = User.objects.get(id=self.request.user.id)
        serializer = UserSerializer(user_queryset)
        return Response(data=serializer.data)

    def put(self, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)


class UserViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def update_password(self, *args, **kwargs):
        data = self.request.data

        from django.contrib.auth import authenticate

        current_password = data.get("current_password")
        new_password = data.get("new_password")

        user = authenticate(email=self.request.user.email, password=current_password)
        if user is None:
            return Response(
                {"detail": "Current password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if current_password == new_password:
            return Response(
                {"detail": "New password must be different from the current password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response(
            {"detail": "Password updated successfully."},
            status=status.HTTP_200_OK,
        )
