from django.db import models
from .product import Product, ProductVariant, BaseModel, PriceList
from .customer import Customer


class OrderStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    SHIPPED = "shipped", "Shipped"
    DELIVERED = "delivered", "Delivered"
    CANCELED = "canceled", "Canceled"


class Order(BaseModel):
    order_id = models.CharField(max_length=255, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    total_qty = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.order_id

    def calculate_total(self):
        self.total_amount = sum(item.amount for item in self.items.all())
        self.total_qty = sum(item.quantity for item in self.items.all())

    def save(self, *args, **kwargs):
        self.calculate_total()
        super().save(*args, **kwargs)


class OrderItem(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    uom = models.CharField(max_length=50, null=True, blank=True)
    price_list = models.ForeignKey(
        PriceList, on_delete=models.CASCADE, related_name="order_items"
    )


    def __str__(self):
        return f"{self.product.product_name} - {self.quantity} {self.uom}"

    def calculate_total_amount(self):
        self.amount = self.price * self.quantity
        self.save()
