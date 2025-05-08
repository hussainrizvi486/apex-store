from rest_framework import status, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.ecommerce.models.cart import Cart, CartItem, Product, ProductVariant
from apps.ecommerce.serializer.main import (
    CartSerializer,
    CartItemSerializer,
    CartItemAddSerializer,
    CartItemUpdateSerializer,
)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(customer=self.request.user.customer)

    def retrieve(self, request, *args, **kwargs):
        # Get the user's current cart or create a new one if it doesn't exist
        try:
            cart = Cart.objects.get(customer=request.user.customer)
        except Cart.DoesNotExist:
            cart = Cart.objects.create(customer=request.user.customer)

        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def add_item(self, request, pk=None):
        cart = self.get_object()
        serializer = CartItemAddSerializer(data=request.data)

        if serializer.is_valid():
            product = get_object_or_404(
                Product, id=serializer.validated_data["product_id"]
            )
            variant = get_object_or_404(
                ProductVariant, id=serializer.validated_data["variant_id"]
            )

            cart.add_item(
                product=product,
                variant=variant,
                quantity=serializer.validated_data["quantity"],
                price=serializer.validated_data["price"],
            )

            # Refresh the cart to get updated values
            cart.refresh_from_db()

            return Response(CartSerializer(cart).data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["put"], url_path="update-item/(?P<item_id>[^/.]+)")
    def update_item(self, request, pk=None, item_id=None):
        cart = self.get_object()

        try:
            item = cart.items.get(id=item_id)
        except CartItem.DoesNotExist:
            return Response(
                {"detail": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = CartItemUpdateSerializer(data=request.data)

        if serializer.is_valid():
            item.quantity = serializer.validated_data["quantity"]
            item.save()

            # After updating the item, recalculate cart totals
            cart.calculate_totals()
            cart.save()

            return Response(CartSerializer(cart).data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["delete"], url_path="remove-item/(?P<item_id>[^/.]+)")
    def remove_item(self, request, pk=None, item_id=None):
        cart = self.get_object()

        try:
            item = cart.items.get(id=item_id)
        except CartItem.DoesNotExist:
            return Response(
                {"detail": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Delete the item
        item.delete()

        # Recalculate cart totals
        cart.calculate_totals()
        cart.save()

        return Response(CartSerializer(cart).data)


# {
#   "product_id": 123,
#   "variant_id": 456,
#   "quantity": 2.00,
#   "price": 19.99
# }