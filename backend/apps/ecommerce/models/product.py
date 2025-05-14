from django.db import models

from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
from django.conf import settings

from . import BaseModel, Category, PriceList


class ProductTypeChoices(models.TextChoices):
    TEMPLATE = "template", "Template"
    PRODUCT = "product", "Product"
    VARIANT = "variant", "Variant"


class Product(BaseModel):
    template = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="variants",
        blank=True,
        null=True,
    )
    product_type = models.CharField(
        max_length=50,
        choices=ProductTypeChoices.choices,
        default=ProductTypeChoices.PRODUCT,
    )
    product_name = models.TextField()
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to="products/", blank=True, null=True)
    unit_of_measurement = models.CharField(max_length=50, blank=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name="products", null=True
    )

    def __str__(self):
        return self.product_name

    @property
    def current_price(self):
        """Return the current valid price"""

        if not hasattr(self, "prices"):
            return 0

        now = timezone.now()
        price = self.prices.filter(valid_from__lte=now, valid_till__gt=now).first()
        return price

    @property
    def images(self):
        """Return the images for the product"""
        if not hasattr(self, "images"):
            return []

        return (
            self.images.all().order_by("display_order").values_list("image", flat=True)
        )


class ProductImage(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="products/")
    display_order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product.product_name} - Image {self.display_order}"


class VariantAttribute(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="variant_attributes"
    )
    attribute = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    # class Meta:
    #     unique_together = ["product", "attribute"]

    def __str__(self):
        return f"{self.product.product_name} - {self.attribute}: {self.value}"


class ProductPrice(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="prices"
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
