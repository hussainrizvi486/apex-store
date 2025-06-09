import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from apps.user_auth.permissions import PermissionManager, PermissionMixin


class BaseModel(models.Model, PermissionMixin):
    """
    Abstract base model that includes common fields for all models.
    """

    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=100
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = PermissionManager()

    class Meta:
        abstract = True

    def is_new(self):
        return self.id is None


class Currency(BaseModel):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=5)

    class Meta:
        verbose_name_plural = "Currencies"
        ordering = ["code"]

    def __str__(self):  # Fixed method name
        return f"{self.code} - {self.name}"


class Category(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="categories/", null=True, blank=True)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="children"
    )

    def __str__(self):
        return self.name


class PriceList(BaseModel):
    name = models.CharField(max_length=100)
    currency = models.ForeignKey(Currency, on_delete=models.PROTECT)
    buying = models.BooleanField(default=False)
    selling = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.currency.code})"


class Address(BaseModel):
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="addresses"
    )
    address_title = models.CharField(max_length=255)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255)
    address_type = models.CharField(
        max_length=100,
        choices=[
            ("home", "Home"),
            ("office", "Office"),
            ("personal", "Personal"),
            ("billing", "Billing"),
            ("shipping", "Shipping"),
            ("warehouse", "Warehouse"),
            ("store", "Store"),
            ("shop", "Shop"),
            ("other", "Other"),
        ],
        default="home",
    )

    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    postal_code = models.CharField(max_length=20)

    def __str__(self):
        return self.address_title


class UOM(BaseModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
