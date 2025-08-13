from django.db import models
from .main import BaseModel


class Discount(BaseModel):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
