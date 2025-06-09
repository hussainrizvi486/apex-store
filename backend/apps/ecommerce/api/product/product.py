from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.ecommerce.models.product import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["product_name", "category", "description", "uom", "cover_image"]

    def create(self, validated_data):
        return super().create(validated_data)


class ProductView(APIView):
    def post(self, *args, **kwargs):
        files = self.request.FILES
        serializer = ProductSerializer(data=self.request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        for file in files.getlist("cover_image"):
            product = serializer.instance
            product.cover_image = file
            product.save()

        return Response(
            {"message": "Product created successfully"}, status=status.HTTP_201_CREATED
        )
