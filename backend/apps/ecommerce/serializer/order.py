from rest_framework import serializers
from apps.ecommerce.models.order import Order, OrderItem, Customer

# from . import (
# ProductListSerializer,
# ProductVariantSerializer,
# PriceListSerializer,
# )


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    def get_product(self, obj):
        return {
            "id": obj.product.id,
            "product_name": obj.product.product_name,
            "image": obj.product.image,
            "category": obj.product.category.name,
        }

    class Meta:
        model = OrderItem
        fields = [
            "product",
            "order",
            "quantity",
            "price",
            "amount",
            "uom",
            "price_list",
        ]


class OrderListSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "order_id",
            "customer",
            "total_qty",
            "total_amount",
            "order_date",
        ]
