import uuid
from django.db import models


class BaseModel(models.Model):
    id = models.CharField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
        primary_key=True,
        max_length=100,
    )
    creation = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-modified"]
