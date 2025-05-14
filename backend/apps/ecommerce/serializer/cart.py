from apps.ecommerce.models.cart import Cart, CartItem, Product
from .product import ProductSerializer
from rest_framework import serializers


class CartItemSerializer(serializers.ModelSerializer):

    class Product(serializers.ModelSerializer):
        class Meta:
            model = Product
            fields = [
                "product_name",
                "cover_image",
                "description",
                "category",
            ]

    product = Product()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "price", "amount"]
        read_only_fields = ["amount"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["grand_total", "total_qty", "updated_at", "items"]


class CartItemAddSerializer(serializers.Serializer):
    product_id = serializers.CharField(max_length=255)
    variant_id = serializers.CharField(max_length=255, required=False)
    quantity = serializers.DecimalField(max_digits=10, decimal_places=2)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate(self, data):
        if data["quantity"] <= 0:
            raise serializers.ValidationError(
                {"quantity": "Quantity must be greater than zero"}
            )

        if data["price"] <= 0:
            raise serializers.ValidationError(
                {"price": "Price must be greater than zero"}
            )
        return data


class CartItemUpdateSerializer(serializers.Serializer):
    quantity = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than zero")
        return value
