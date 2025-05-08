from django.db.models import Subquery, OuterRef, Q, Prefetch
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response


from apps.ecommerce.models.product import Product, ProductPrice
from apps.ecommerce.serializer.product import ProductSerializer
from apps.ecommerce.queries import PRODUCT_PRICE_SUBQUERY


@api_view(["GET"])
def get_products(request):
    products = []
    products_queryset = Product.objects.annotate(price=PRODUCT_PRICE_SUBQUERY)[:20]
    serializer = ProductSerializer(products_queryset, many=True)
    products = serializer.data
    return Response({"products": products})
