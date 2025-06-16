from django.contrib import admin
from apps.user_auth.models import User, Address
from django.contrib.auth.admin import UserAdmin
from apps.user_auth.models.role import Role, Permission, UserRole


@admin.register(User)
class UserAdminView(UserAdmin):
    def __init__(self, model: type, admin_site: admin.AdminSite | None) -> None:
        super().__init__(model, admin_site)
        self.opts.verbose_name_plural = "User"

    list_display = ["email", "username", "mobile", "id"]
    list_filter = ["date_joined", "username", "mobile", "email"]
    ordering = ["-date_joined"]

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            ("Personal info"),
            {"fields": ("first_name", "last_name", "email", "mobile", "dob", "image")},
        ),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    # "groups",
                    # "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "username",
                    "email",
                    "mobile",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "is_active",
                )
            },
        ),
        (
            "Password",
            {
                "fields": (
                    "password1",
                    "password2",
                )
            },
        ),
    )


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    class PermissionInline(admin.TabularInline):
        model = Permission
        extra = 1

    inlines = [PermissionInline]


admin.site.register(UserRole)
# admin.site.register(User)
admin.site.register(Address)
