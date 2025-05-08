from rest_framework import serializers
from apps.ecommerce.models.order import Order, OrderItem, Customer
from . import (
    ProductListSerializer,
    ProductVariantSerializer,
    PriceListSerializer,
)


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderListSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    status = serializers.SerializerMethodField()
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
