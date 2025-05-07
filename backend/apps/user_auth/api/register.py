from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user_auth.serializers import RegisterUserSerializer


class RegisterUserView(APIView):
    def post(self, *args, **kwargs):
        serializer = RegisterUserSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)
