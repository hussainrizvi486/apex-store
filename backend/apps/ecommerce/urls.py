from django.urls import path
from .api.product import get_products, get_product_detail, search_products
from .api.product.main import ProductistAPIView, ProductAPIView
from .api.customer.cart import CartViewSet
from .api.product.search import Suggestions
from .api.product.product import ProductView
from .api.category import CategoryViewSet
from .api.order.main import CustomerOrderView
from .api.queries.urls import urlpatterns as queries_urls

# from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("api/product/create", ProductView.as_view(), name="create-product"),
    path("api/get/product/list", get_products, name="get_products"),
    path("product/list", ProductistAPIView.as_view(), name="list-products"),
    path(
        "api/product/<str:id>",
        ProductAPIView.as_view(),
    ),
    path("search/suggestions", Suggestions.as_view(), name="suggestions"),
    path("api/get/product/detail", get_product_detail, name="get_product_detail"),
    path("api/product/search", search_products, name="search_products"),
    # path("api/get/product/reviews", get_product_detail, name="get_product_detail"),
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
    path("api/customer/orders/list", CustomerOrderView.as_view(), name="get-orders"),
    path(
        "api/customer/cart/add-item",
        CartViewSet.as_view({"post": "add_item"}),
        name="add-cart-item",
    ),
    path(
        "api/customer/cart/update",
        CartViewSet.as_view({"post": "update"}),
        name="update-cart",
    ),
]


urlpatterns += queries_urls
