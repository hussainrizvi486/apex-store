from django.db.models import Subquery, OuterRef, Q, Prefetch
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response


from apps.ecommerce.models.product import (
    Product,
    ProductPrice,
    ProductTypeChoices,
    VariantAttribute,
)
from apps.ecommerce.serializer.product import ProductSerializer, ProductListSerializer
from apps.ecommerce.queries import PRODUCT_PRICE_SUBQUERY


@api_view(["GET"])
def get_products(request):
    products = []
    products_queryset = Product.objects.exclude(
        product_type=ProductTypeChoices.TEMPLATE
    ).annotate(price=PRODUCT_PRICE_SUBQUERY)[:20]

    serializer = ProductListSerializer(products_queryset, many=True)
    products = serializer.data
    return Response({"products": products})


@api_view(["GET"])
def get_product_detail(request):
    product_id = request.GET.get("id")

    if not product_id:
        return Response({"error": "Product ID is required"}, status=400)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

    serializer = ProductSerializer(product)
    return Response({"product": serializer.data})
