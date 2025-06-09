from rest_framework import serializers
from apps.ecommerce.models.product import Product, ProductPrice, VariantAttribute
from .main import CategorySerializer


class ProductPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPrice
        fields = ["price", "variant", "product"]


class VariantAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VariantAttribute
        fields = ["attribute", "value"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False, read_only=True)
    variant_attributes = VariantAttributeSerializer(many=True, read_only=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False, read_only=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    uom = serializers.CharField(source="uom.name", read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "category",
            "price",
            "cover_image",
            "uom",
        ]

    def get_cover_image(self, obj: Product):
        if not obj.cover_image:
            return None

        request = self.context.get("request")
        if request is None:
            return obj.cover_image.url

        return request.build_absolute_uri(obj.cover_image.url)
