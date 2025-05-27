from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from apps.ecommerce.models.order import Order, OrderItem
from apps.ecommerce.models.customer import Customer


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ["product", "quantity", "price", "amount", "uom", "price_list"]

    def get_product(self, obj):
        request = self.context.get("request")
        """
        Custom method to retrieve product details.
        """
        return {
            "id": obj.product.id,
            "name": obj.product.product_name,
            "description": obj.product.description,
            "cover_image": request.build_absolute_uri(obj.product.cover_image.url) if request and obj.product.cover_image else None,
            "price": obj.price,
        }


class OrderListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing orders.
    """

    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "order_id",
            "customer",
            "total_qty",
            "total_amount",
            "order_date",
            "items",
            "id",
        ]


class CustomerOrderView(APIView):
    """
    View to handle customer orders.
    """

    def get(self, request, *args, **kwargs):
        customer = Customer.objects.get(user=self.request.user)
        orders_queryset = Order.objects.filter(customer=customer)
        serializer = OrderListSerializer(orders_queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to create a new customer order.
        """
        # Logic to create a new customer order would go here
        return Response({"message": "Customer order created"})
