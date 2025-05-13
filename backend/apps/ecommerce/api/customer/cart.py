from rest_framework import status, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.ecommerce.models.cart import Cart, CartItem, Product, ProductVariant, Customer
from apps.ecommerce.serializer.cart import (
    CartSerializer,
    CartItemSerializer,
    CartItemAddSerializer,
    CartItemUpdateSerializer,
)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_customer(self):
        return Customer.objects.get(user=self.request.user)

    def get_object(self):
        customer = self.get_customer()
        cart, _ = Cart.objects.get_or_create(customer=customer)
        return cart

    def retrieve(self, request, *args, **kwargs):
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    def add_item(self, *args, **kwargs):
        cart = self.get_object()
        serializer = CartItemAddSerializer(data=self.request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data = serializer.validated_data

        product = get_object_or_404(Product, id=data["product_id"])
        variant = None
        if data.get("variant_id"):
            variant = get_object_or_404(ProductVariant, id=data["variant_id"])

        cart.add_item(
            product=product,
            variant=variant,
            quantity=serializer.validated_data["quantity"],
            price=serializer.validated_data["price"],
        )

        cart.save()

        return Response(
            data={
                "message": "Item added to cart",
            },
            status=status.HTTP_201_CREATED,
        )

    def update(self, *args, **kwargs):
        serializer = CartItemUpdateSerializer(data=self.request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        cart = self.get_object()
        data = serializer.validated_data
        action = data.get("action")

        filters = {
            "product__id": data["product_id"],
            "cart": cart,
        }

        if data.get("variant_id"):
            filters["variant__id"] = data["variant_id"]

        cart_item = get_object_or_404(CartItem, **filters)

        if action == "update":
            if not data.get("variant_id"):
                cart_item.quantity = data["quantity"]
                cart_item.save()

        elif action == "remove":
            cart_item = get_object_or_404(CartItem, **filters)
            cart_item.delete()

        cart.save()

        return Response(
            data={
                "message": "Cart updated successfully",
            },
            status=status.HTTP_200_OK,
        )
    