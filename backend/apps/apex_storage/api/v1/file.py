from rest_framework.views import APIView
from rest_framework.response import Response


class FileView(APIView):
    def post(self, *args, **kwargs):
        files = self.request.FILES
        return Response({"message": "File uploaded successfully"}, status=200)
