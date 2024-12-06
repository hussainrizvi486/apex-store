from django.db import models
from . import BaseModel
from .product import Product


class Customer: ...


class CustomerCart(BaseModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return super().__str__()


class CustomerCartItem(BaseModel):
    cart = models.ForeignKey(CustomerCart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rate = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def save(self, *args, **kwargs):
        self.amount = self.rate * self.quantity
        return super().save(*args, **kwargs)


class SaleOrder(BaseModel):
    order_id = models.CharField(max_length=100)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    grand_total = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=100)

    def __str__(self):
        return self.order_id


class SaleOrderItem(BaseModel):
    order = models.ForeignKey(
        SaleOrder, on_delete=models.CASCADE, related_name="order_items"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rate = models.DecimalField(max_digits=12, decimal_places=2)
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return self.order.order_id

    def save(self, *args, **kwargs):
        self.amount = self.rate * self.quantity
        return super().save(*args, **kwargs)
