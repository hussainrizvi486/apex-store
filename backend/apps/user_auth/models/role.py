from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ValidationError

from .main import BaseModel
from .user import User


PERMISSION_TYPES = [
    ("create", "Create"),
    ("read", "Read"),
    ("update", "Update"),
    ("delete", "Delete"),
]


class Role(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    # is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def get_permissions(self):
        """Get all permissions for this role"""
        return self.permissions.all()

    def has_permission(self, permission, model):
        """Check if this role has a specific permission for a model"""
        # if not self.is_active:
        #     return False

        if isinstance(model, str):
            try:
                content_type = ContentType.objects.get(model=model.lower())
            except ContentType.DoesNotExist:
                return False
        else:
            content_type = ContentType.objects.get_for_model(model)

        # print("content_type")
        # print(content_type)
        permission_exists = self.permissions.filter(
            object=content_type, permission=permission
        ).exists()

        return permission_exists

    class Meta:
        verbose_name = "Role"
        verbose_name_plural = "Roles"
        ordering = ["name"]


class Permission(BaseModel):
    role = models.ForeignKey(Role, related_name="permissions", on_delete=models.CASCADE)
    object = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        related_name="object_permissions",
        null=True,
        blank=True,
    )
    permission = models.CharField(
        max_length=20,
        choices=PERMISSION_TYPES,
        default="read",
        null=True,
        blank=True,
    )

    def __str__(self):
        object_name = self.object.model if self.object else "All"
        return f"{self.role.name} - {self.permission} - {object_name}"

    def clean(self):
        if self.permission:
            if not self.permission.replace("_", "").replace(".", "").isalnum():
                raise ValidationError(
                    "Permission must contain only alphanumeric characters, dots, and underscores"
                )


class UserRole(BaseModel):
    """
    User Role assignment model
    """

    user = models.ForeignKey(
        User, related_name="user_roles", on_delete=models.CASCADE, db_index=True
    )
    role = models.ForeignKey(Role, related_name="user_roles", on_delete=models.CASCADE)
    assigned_by = models.ForeignKey(
        User,
        related_name="assigned_roles",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    assigned_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ("user", "role")
        verbose_name = "User Role"
        ordering = ["user", "role"]

    def __str__(self):
        return f"{self.user.username} - {self.role.name}"
