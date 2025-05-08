from django.db import models

from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from django.conf import settings

from . import BaseModel, Category, PriceList


class Product(BaseModel):
    product_name = models.TextField(max_length=255)
    cover_image = models.ImageField(upload_to="products/")
    description = models.TextField()
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, related_name="products"
    )

    def __str__(self):
        return self.product_name

    @property
    def current_price(self):
        """Return the current valid price"""
        now = timezone.now()
        price = self.prices.filter(valid_from__lte=now, valid_till__gt=now).first()
        return price


class ProductImage(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="products/")
    display_order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product.product_name} - Image {self.display_order}"


class ProductVariant(BaseModel):
    """Added model for product variants"""

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="variants"
    )
    sku = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    stock_quantity = models.PositiveIntegerField(default=0)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.product.product_name} - {self.name}"


class VariantAttribute(BaseModel):
    variant = models.ForeignKey(
        ProductVariant, on_delete=models.CASCADE, related_name="attributes"
    )
    attribute_name = models.CharField(max_length=50)
    attribute_value = models.CharField(max_length=50)

    class Meta:
        unique_together = ["variant", "attribute_name"]

    def __str__(self):
        return f"{self.variant.sku} - {self.attribute_name}: {self.attribute_value}"


class ProductPrice(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="prices"
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="prices",
        null=True,
        blank=True,
    )
    price_list = models.ForeignKey(
        PriceList, on_delete=models.CASCADE, related_name="item_prices"
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0)]
    )
    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
    )

    valid_from = models.DateTimeField(default=timezone.now)
    valid_till = models.DateTimeField()

    def is_valid(self):
        now = timezone.now()
        return self.valid_from <= now <= self.valid_till

    def __str__(self):
        return f"{self.product.product_name} - {self.price_list.currency.symbol}{self.price}"
