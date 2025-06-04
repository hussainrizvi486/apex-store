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
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    def get_permissions(self):
        """Get all permissions for this role"""
        for i in self.permissions.all():
            print(f"Permission: {i.permission} for object: {i.object}")
        return self.permissions.all()

    def has_permission(self, permission, model):
        print(self.get_permissions())
        print(
            f"Checking permission: {permission} for model: {model} in role: {self.name}"
        )
        return True

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
        return f"{self.role.name} - {self.permission}"

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


class PermissionQuerySet(models.QuerySet):
    def for_user(self, user: User):
        """Filter queryset based on user permissions"""
        if not user or not user.is_authenticated:
            return self.none()

        if user.is_superuser:
            return self

        if not user.has_permission("read", self.model.__name__):
            return self.none()

        return self


class PermissionMixin:
    """Mixin to add permission checking to models"""

    def check_user_permission(self, user, action="read", raise_exception=True):
        """Check if user has permission for this model instance"""
        if not user or not user.is_authenticated:
            if raise_exception:
                raise PermissionDenied("Authentication required")
            return False

        if user.is_superuser:
            return True

        model_name = self.__class__.__name__.lower()
        has_perm = user.has_permission(action, model_name)

        if not has_perm and raise_exception:
            raise PermissionDenied(
                f"User does not have '{action}_{self.__class__.__name__.lower()}' permission"
            )

        return has_perm


class PermissionManager(models.Manager):
    def get_queryset(self):
        return PermissionQuerySet(self.model, using=self._db)

    def for_user(self, user, permission=None):
        return self.get_queryset().for_user(user)
