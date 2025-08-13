from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..models import Address
from ..serializers import AddressSerializer


class AddressView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, *args, **kwargs):
        queryset = Address.objects.filter(user=self.request.user)
        serializer = AddressSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, *args, **kwargs):
        data = self.request.data
        data["user"] = self.request.user.id
        serializer = AddressSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)

        return Response(
            {"message": "Address created successfully.", "data": serializer.data}
        )

    def update(self, *args, **kwargs):
        return Response({"message": "Address updated successfully."})

    def delete(self, *args, **kwargs):
        return Response({"message": "Address deleted successfully."})

    def retrieve(self, *args, **kwargs):
        return Response({"message": "Address retrieved successfully."})
