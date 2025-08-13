from uuid import uuid4
from django.db import models
from django.utils import timezone
from .product import Product, BaseModel, PriceList
from .customer import Customer
from apps.user_auth.models import Address


class OrderStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    SHIPPED = "shipped", "Shipped"
    DELIVERED = "delivered", "Delivered"
    CANCELED = "canceled", "Canceled"


class Order(BaseModel):
    def generate_order_id(self):
        """
        Generate a unique order ID with the following format:
        YYYYMMDD-HHMMSS-RR-XXXX-YYYY
        - YYYYMMDD: Current date
        - HHMMSS: Current time (hour-minute-second)
        - RR: Region code
        - XXXX: Random unique identifier
        - YYYY: Last 4 digits of customer ID
        """
        # Get current datetime
        now = timezone.now()
        date_part = now.strftime("%Y%m%d")
        time_part = now.strftime("%H%M%S")
        customer_suffix = (
            str(self.customer.id)[-4:].zfill(4) if self.customer else str(uuid4())[:4]
        )

        # Generate a unique random part
        unique_part = str(uuid4())[:4]
        order_id = f"{date_part}-{time_part}-{unique_part}-{customer_suffix}"

        return order_id

    status = models.CharField(
        max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING
    )
    order_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    total_qty = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)
    delivery_address = models.ForeignKey(
        Address, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return str(self.customer)

    def calculate_total(self):
        self.total_amount = sum(item.amount or 0 for item in self.items.all())
        self.total_qty = sum(item.quantity or 0 for item in self.items.all())

    def save(self, *args, **kwargs):
        if not self.is_new():
            self.calculate_total()

        super().save(*args, **kwargs)


class OrderItem(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    quantity = models.DecimalField(
        default=1, max_digits=10, decimal_places=2, null=True, blank=True
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, default=0.00
    )
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, default=0.00
    )
    uom = models.CharField(max_length=50, null=True, blank=True)
    price_list = models.ForeignKey(
        PriceList,
        on_delete=models.CASCADE,
        related_name="order_items",
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.product.product_name} - {self.quantity} {self.uom}"

    def calculate_total_amount(self):
        self.amount = self.price * self.quantity
        self.save()
