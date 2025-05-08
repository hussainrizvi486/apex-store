from django.db.models import Subquery, OuterRef, Q
from django.utils import timezone
from apps.ecommerce.models.product import ProductPrice

PRODUCT_PRICE_SUBQUERY = Subquery(
    ProductPrice.objects.filter(product=OuterRef("id"), valid_till__gt=timezone.now())
    .filter(Q(valid_from__isnull=True) | Q(valid_from__lte=timezone.now()))
    .order_by("-valid_from")
    .values("price")[:1]
)
