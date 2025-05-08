from django.urls import path
from .api.product import get_products
from .api.customer.cart import CartViewSet
from rest_framework.routers import DefaultRouter


# router = DefaultRouter()
# router.register(r"api/customer/cart", CartViewSet, basename="cart")


urlpatterns = [
    path("api/get/products/", get_products, name="get_products"),
    path(
        "api/customer/cart", CartViewSet.as_view({"get": "retrieve"}), name="get-cart"
    ),
    path(
        "api/customer/cart/add-item", CartViewSet.as_view({"post": "add_item"}), name="get-cart"
    ),
    # path("api/customer/cart/get", get_cart, name="get_products"),
]

# urlpatterns += router.urls
