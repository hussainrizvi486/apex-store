from django.db.models import Subquery, OuterRef, Q, Value, DecimalField
from django.db.models.functions import Coalesce
from django.utils import timezone
from apps.ecommerce.models.product import ProductPrice

PRODUCT_PRICE_SUBQUERY = Coalesce(
    Subquery(
        ProductPrice.objects.filter(product=OuterRef("id"))
        .filter(Q(valid_from__isnull=True) | Q(valid_from__lte=timezone.now()))
        .filter(Q(valid_till__isnull=True) | Q(valid_till__gte=timezone.now()))
        .order_by("-valid_from")
        .values("price")[:1]
    ),
    Value(0),
    output_field=DecimalField(),
)
