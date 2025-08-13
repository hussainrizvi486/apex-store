from django.db import models
from django.contrib.contenttypes.models import ContentType

FILE_DIR = "files/"


class BaseModel(models.Model):
    """
    An abstract base model that provides common fields and methods for all models.
    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class File(BaseModel):
    file = models.FileField(upload_to=FILE_DIR)
    file_name = models.CharField(max_length=255)
    file_path = models.CharField(max_length=255)
    file_size = models.PositiveIntegerField()
    file_type = models.CharField(max_length=50)
    object = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        related_name="files",
        null=True,
        blank=True,
    )
    object_id = models.CharField(max_length=255, null=True, blank=True)
    private = models.BooleanField(default=False)

    def __str__(self):
        return self.file_name

    def delete(self, *args, **kwargs):
        self.file.delete(save=False)
        super().delete(*args, **kwargs)
