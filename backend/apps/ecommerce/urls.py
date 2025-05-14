from django.urls import path
from .api.product import get_products
from .api.customer.cart import CartViewSet
from .api.category import CategoryViewSet
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path(
        "api/get/categories/list",
        CategoryViewSet.as_view({"get": "list"}),
        name="get_categories",
    ),
    path(
        "api/get/categories/tree",
        CategoryViewSet.as_view({"get": "tree"}),
        name="get_categories_tree",
    ),
    path("api/get/products/", get_products, name="get_products"),
    path(
        "api/customer/cart", CartViewSet.as_view({"get": "retrieve"}), name="get-cart"
    ),
    path(
        "api/customer/cart/add-item",
        CartViewSet.as_view({"post": "add_item"}),
        name="get-cart",
    ),
    path(
        "api/customer/cart/update",
        CartViewSet.as_view({"post": "update"}),
        name="update-cart",
    ),
]
