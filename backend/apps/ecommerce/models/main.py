import uuid
from django.db import models


class BaseModel(models.Model):
    """
    Abstract base model that includes common fields for all models.
    """

    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=100
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


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
