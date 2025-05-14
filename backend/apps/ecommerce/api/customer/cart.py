from rest_framework import status, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.ecommerce.models.cart import Cart, CartItem, Product,  Customer
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
        cart.add_item(
            product=product,
            quantity=serializer.validated_data["quantity"],
            price=serializer.validated_data["price"],
        )

        # Refresh the cart to get updated values
        cart.refresh_from_db()
        return Response(
            data={
                "message": "Item added to cart",
            },
            status=status.HTTP_201_CREATED,
        )

    # @action(detail=True, methods=["put"], url_path="update-item/(?P<item_id>[^/.]+)")
    def update_item(self, request, pk=None, item_id=None):
        cart = self.get_object()
        

    #     try:
    #         item = cart.items.get(id=item_id)
    #     except CartItem.DoesNotExist:
    #         return Response(
    #             {"detail": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
    #         )

    #     serializer = CartItemUpdateSerializer(data=request.data)

    #     if serializer.is_valid():
    #         item.quantity = serializer.validated_data["quantity"]
    #         item.save()

    #         # After updating the item, recalculate cart totals
    #         cart.calculate_totals()
    #         cart.save()

    #         return Response(CartSerializer(cart).data)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # @action(detail=True, methods=["delete"], url_path="remove-item/(?P<item_id>[^/.]+)")
    # def remove_item(self, request, pk=None, item_id=None):
    #     cart = self.get_object()

    #     try:
    #         item = cart.items.get(id=item_id)
    #     except CartItem.DoesNotExist:
    #         return Response(
    #             {"detail": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND
    #         )

    #     # Delete the item
    #     item.delete()

    #     # Recalculate cart totals
    #     cart.calculate_totals()
    #     cart.save()

    #     return Response(CartSerializer(cart).data)


# {
#   "product_id": 123,
#   "variant_id": 456,
#   "quantity": 2.00,
#   "price": 19.99
# }
