from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, viewsets
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
            "product_name": obj.product.product_name,
            "description": obj.product.description,
            "cover_image": (
                request.build_absolute_uri(obj.product.cover_image.url)
                if request and obj.product.cover_image
                else None
            ),
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
            "status",
            "order_id",
            "customer",
            "total_qty",
            "total_amount",
            "order_date",
            "items",
            "id",
        ]


class OrderSerializer(serializers.ModelSerializer):
    class ItemSerializer(serializers.ModelSerializer):
        product = serializers.SerializerMethodField()

        class Meta:
            model = OrderItem
            fields = ["product"]

        def get_product(self, obj):
            product = obj.product
            category = product.category
            request = self.context.get("request")

            return {
                "id": product.id,
                "product_name": product.product_name,
                "category": (
                    {"name": category.name, "id": category.id} if category else None
                ),
                "cover_image": (
                    request.build_absolute_uri(product.cover_image.url)
                    if request and product.cover_image
                    else None
                ),
            }

    class CustomerSerializer(serializers.ModelSerializer):
        class Meta:
            model = Customer
            fields = [
                "first_name",
                "last_name",
                "email",
                "phone_number",
            ]

    items = ItemSerializer(many=True, read_only=True)
    customer = CustomerSerializer(read_only=True)
    delivery_address = serializers.SerializerMethodField()

    def get_delivery_address(self, obj):
        address = obj.delivery_address
        if not address:
            return None

        return {
            "address_line_1": address.address_line_1,
            "address_line_2": address.address_line_2,
            "city": address.city,
            "state": address.state,
            "postal_code": address.postal_code,
            "country": address.country,
        }

    class Meta:
        model = Order
        fields = [
            "delivery_address",
            "id",
            "order_id",
            "customer",
            "items",
            "status",
            "total_qty",
            "total_amount",
            "order_date",
            "created_at",
        ]


class OrderAPIView(viewsets.ViewSet):
    def list(self, *args, **kwargs):
        """
        Handle GET requests to retrieve order details.
        """
        return Response({})

    def retrieve(self, *args, **kwargs):
        id = self.request.GET.get("id")

        if not id:
            return Response({"error": "Order ID is required"}, status=400)

        try:
            order_queryset = Order.objects.get(id=id)
            serializer = OrderSerializer(
                order_queryset, context={"request": self.request}
            )
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)


class CustomerOrderView(APIView):
    """
    View to handle customer orders.
    """

    def get(self, request, *args, **kwargs):
        customer = Customer.objects.get(user=self.request.user)
        orders_queryset = Order.objects.filter(customer=customer).order_by(
            "-order_date"
        )
        serializer = OrderListSerializer(
            orders_queryset, many=True, context={"request": request}
        )
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to create a new customer order.
        """
        # Logic to create a new customer order would go here
        return Response({"message": "Customer order created"})
