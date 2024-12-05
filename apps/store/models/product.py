from django.db import models
from .base import BaseModel


class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class Product(BaseModel):
    product_name = models.CharField(max_length=999)
    description = models.TextField()
    category = models.ForeignKey()


class ProductVariant(BaseModel):
    product = models.ForeignKey(Product)
    attribute = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
