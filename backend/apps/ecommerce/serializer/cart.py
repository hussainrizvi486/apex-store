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
    product_id = serializers.CharField(max_length=255, required=False)
    variant_id = serializers.CharField(max_length=255, required=False)
    action = serializers.ChoiceField(
        choices=["remove", "update"], default="update"
    )

    def validate(self, data):

        try:
            product = Product.objects.get(id=data["product_id"])
        except Product.DoesNotExist:
            raise serializers.ValidationError({"product_id": "Invalid product ID"})

        if data.get("variant_id"):
            try:
                variant = ProductVariant.objects.get(id=data.get("variant_id"))
                if variant.product.id != product.id:
                    raise serializers.ValidationError(
                        {"variant": "Variant does not belong to the specified product"}
                    )
            except ProductVariant.DoesNotExist:
                raise serializers.ValidationError({"variant": "Invalid variant ID"})

        if data["quantity"] < 0:
            raise serializers.ValidationError(
                {"quantity": "Quantity must be greater than or equal to zero"}
            )

        return data