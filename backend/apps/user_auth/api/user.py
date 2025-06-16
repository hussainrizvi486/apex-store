from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
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
