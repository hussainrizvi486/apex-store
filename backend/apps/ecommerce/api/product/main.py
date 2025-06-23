from django.db.models import Subquery, OuterRef, Q, Prefetch
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
from django.db.models import Value


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

    serializer = ProductListSerializer(
        products_queryset, many=True, context={"request": request}
    )
    # print(products_queryset.query)
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
        return Response({"error": "invalid product id"}, status=404)

    serializer = ProductSerializer(product, context={"request": request})
    return Response({"product": serializer.data})


class ProductistAPIView(APIView):
    def get(self, *args, **kwargs):
        products_queryset = Product.objects.for_user(user=self.request.user).order_by(
            "-updated_at"
        )
        serializer = ProductListSerializer(
            products_queryset, many=True, context={"request": self.request}
        )

        return Response(
            {
                "results": serializer.data,
            }
        )


from django.db.models import Subquery, OuterRef, Q, Value, DecimalField
from django.db.models.functions import Coalesce
from django.utils import timezone


class ProductAPIView(APIView):
    def get(self, request, *args, **kwargs):

        data = {}
        try:

            product = (
                Product.objects.prefetch_related("images")
                .annotate(
                    price=Coalesce(
                        Subquery(
                            ProductPrice.objects.filter(product=OuterRef("id"))
                            .filter(
                                Q(valid_from__isnull=True)
                                | Q(valid_from__lte=timezone.now())
                            )
                            .filter(
                                Q(valid_till__isnull=True)
                                | Q(valid_till__gte=timezone.now())
                            )
                            .order_by("-valid_from")
                            .values("price")[:1]
                        ),
                        Value(0),
                        output_field=DecimalField(),
                    ),
                    rating=Value(5),
                )
                .get(id=kwargs.get("id"))
            )

            serializer = ProductSerializer(product, context={"request": request})
            data = serializer.data
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        return Response(data=data)
