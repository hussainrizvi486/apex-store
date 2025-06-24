from django.utils import timezone
from django.db.models import Subquery, OuterRef, Q, Value, DecimalField
from django.db.models.functions import Coalesce
from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from apps.ecommerce.models.product import Product, ProductTypeChoices
from apps.ecommerce.serializer.product import ProductListSerializer
from apps.ecommerce.queries import PRODUCT_PRICE_SUBQUERY
from apps.ecommerce.models.product import ProductPrice


class ProductSearchPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = "page_size"
    max_page_size = 100


class Suggestions(APIView):
    def _default(self):
        names = Product.objects.only("product_name").order_by("product_name")[:20]
        suggestions = [
            {"title": name.product_name, "query": name.product_name} for name in names
        ]
        return Response({"suggestions": suggestions})

    def get(self, *args, **kwargs):
        query = self.request.GET.get("query", "")
        if not query:
            return self._default()

        return self._default()
        ...


class SearchProduct(APIView):
    def get_queryset_filters(self, filters: dict):
        filters = Q()
        query = filters.get("query", "")
        category = filters.get("category", "")
        min_price = float(filters.get("min_price", 0) or 0)
        max_price = float(filters.get("max_price", 0) or 0)

        if query:
            filters |= Q(product_name__icontains=query)
            filters |= Q(description__icontains=query)

        if category:
            filters |= Q(category_id=category)

        if min_price:
            filters |= Q(price__gte=min_price)

        if max_price:
            filters |= Q(price__lte=max_price)

        return filters

    def get(self, *args, **kwargs):
        filters: Q = self.get_queryset_filters(self.request.GET.dict())

        product_queryset = Product.objects.filter(filters).annotate(
            price=Coalesce(
                Subquery(
                    ProductPrice.objects.filter(product=OuterRef("id"))
                    .filter(
                        Q(valid_from__isnull=True) | Q(valid_from__lte=timezone.now())
                    )
                    .filter(
                        Q(valid_till__isnull=True) | Q(valid_till__gte=timezone.now())
                    )
                    .order_by("-valid_from")
                    .values("price")[:1]
                ),
                Value(0),
                output_field=DecimalField(),
            )
        )
        pagination = ProductSearchPagination()
        paginated_queryset = pagination.paginate_queryset(
            product_queryset, self.request, view=self
        )
        serializer = ProductListSerializer(
            paginated_queryset, many=True, context={"request": self.request}
        )
        return Response(
            data={
                "products": serializer.data,
                "count": pagination.page.paginator.count,
                "next": pagination.get_next_link(),
                "previous": pagination.get_previous_link(),
            },
            status=200,
        )

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
