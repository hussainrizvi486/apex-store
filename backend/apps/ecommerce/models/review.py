from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from . import BaseModel
from .product import Product
from .customer import Customer
from .order import Order, OrderItem


class ProductReview(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="reviews"
    )
    rating = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True, null=True)
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name="product_reviews"
    )
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="product_reviews"
    )
    order_item = models.ForeignKey(
        OrderItem, on_delete=models.CASCADE, related_name="product_reviews"
    )

    def __str__(self):
        return f"Review for {self.product.product_name} by {self.customer.user.username} - Rating: {self.rating}"
