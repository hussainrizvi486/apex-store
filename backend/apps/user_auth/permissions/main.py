from apps.user_auth.models import User
from django.db import models
from django.core.exceptions import PermissionDenied


class PermissionQuerySet(models.QuerySet):
    def for_user(self, user: User):
        if not user or not user.is_authenticated:
            return self.none()

        if user.is_superuser:
            return self

        if not user.has_permission("read", self.model):
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

    def for_user(self, user):
        return self.get_queryset().for_user(user)
