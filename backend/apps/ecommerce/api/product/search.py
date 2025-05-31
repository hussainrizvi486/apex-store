from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.ecommerce.models.product import Product, ProductTypeChoices
from apps.ecommerce.serializer.product import ProductListSerializer
from apps.ecommerce.queries import PRODUCT_PRICE_SUBQUERY

# from django.core.cache import cache
# from django.conf import settings
# from django.core.cache.backends.base import DEFAULT_TIMEOUT


# CACHE_TTL = getattr(settings, "CACHE_TTL", DEFAULT_TIMEOUT)


class Suggestions(APIView):
    def _default(self):
        # if cache.get("product_suggestions"):
        #     return Response({"suggestions": cache.get("product_suggestions")})

        names = Product.objects.only("product_name").order_by("product_name")[:20]
        suggestions = [
            {"title": name.product_name, "query": name.product_name} for name in names
        ]
        # cache.set("product_suggestions", suggestions, timeout=CACHE_TTL)
        return Response({"suggestions": suggestions})

    def get(self, *args, **kwargs):
        query = self.request.GET.get("query", "")
        if not query:
            return self._default()

        return self._default()
        ...


@api_view(["GET"])
def search_products(request):
    """
    Search for products based on various criteria.

    Query parameters:
    - q: Search term for product name or description
    - category: Category ID to filter by
    - min_price: Minimum price
    - max_price: Maximum price
    - sort: Sort direction (e.g., 'price', '-price', 'name', '-name')
    - limit: Maximum number of products to return (default: 20)
    """
    search_query = request.GET.get("query", "")
    category_id = request.GET.get("category")
    min_price = request.GET.get("min_price")
    max_price = request.GET.get("max_price")
    sort_by = request.GET.get("sort", "product_name")
    limit = int(request.GET.get("limit", 20))

    # Initial query - exclude templates
    products_queryset = Product.objects.exclude(
        product_type=ProductTypeChoices.TEMPLATE
    ).annotate(price=PRODUCT_PRICE_SUBQUERY)

    # Apply search term filter
    if search_query:
        products_queryset = products_queryset.filter(
            Q(product_name__icontains=search_query)
            | Q(description__icontains=search_query)
            | Q(variant_attributes__value__icontains=search_query)
        ).distinct()

    # Apply category filter
    if category_id:
        # Get all products in this category or its subcategories
        category_filter = Q(category_id=category_id)
        # If you want to include subcategories, add those conditions here
        products_queryset = products_queryset.filter(category_filter)

    # Apply price filters
    if min_price:
        try:
            min_price_value = float(min_price)
            products_queryset = products_queryset.filter(price__gte=min_price_value)
        except ValueError:
            pass

    if max_price:
        try:
            max_price_value = float(max_price)
            products_queryset = products_queryset.filter(price__lte=max_price_value)
        except ValueError:
            pass

    # Apply sorting
    if sort_by:
        if sort_by not in [
            "price",
            "-price",
            "product_name",
            "-product_name",
            "created_at",
            "-created_at",
        ]:
            sort_by = (
                "product_name"  # Default to product name if invalid sort parameter
            )
        products_queryset = products_queryset.order_by(sort_by)

    # Apply limit
    products_queryset = products_queryset[:limit]

    # Serialize data
    serializer = ProductListSerializer(
        products_queryset, many=True, context={"request": request}
    )

    # Return response
    return Response(
        {
            "products": serializer.data,
            "count": len(serializer.data),
            "search_term": search_query or None,
            "filters": {
                "category": category_id or None,
                "min_price": min_price or None,
                "max_price": max_price or None,
            },
        }
    )
