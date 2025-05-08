from rest_framework import serializers
from apps.ecommerce.models import Category, Currency, PriceList
from apps.ecommerce.models.cart import Cart, CartItem, Product, ProductVariant
from .product import ProductSerializer, ProductVariantSerializer


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PriceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceList
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "variant", "quantity", "price", "amount"]
        read_only_fields = ["amount"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "customer", "grand_total", "total_qty", "items"]
        read_only_fields = ["grand_total", "total_qty"]


class CartItemAddSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    variant_id = serializers.IntegerField()
    quantity = serializers.DecimalField(max_digits=10, decimal_places=2)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate(self, data):
        # Validate product exists
        try:
            product = Product.objects.get(id=data["product_id"])
        except Product.DoesNotExist:
            raise serializers.ValidationError({"product_id": "Product not found"})

        # Validate variant exists and belongs to the product
        try:
            variant = ProductVariant.objects.get(id=data["variant_id"])
            if variant.product.id != product.id:
                raise serializers.ValidationError(
                    {"variant_id": "Variant does not belong to the specified product"}
                )
        except ProductVariant.DoesNotExist:
            raise serializers.ValidationError(
                {"variant_id": "Product variant not found"}
            )

        # Ensure quantity is positive
        if data["quantity"] <= 0:
            raise serializers.ValidationError(
                {"quantity": "Quantity must be greater than zero"}
            )

        # Ensure price is positive
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
