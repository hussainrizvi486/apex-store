from django.contrib import admin
from .models import Category, Currency, PriceList
from .models.cart import Customer, Cart, CartItem
from .models.order import Order, OrderItem
from .models.product import Product, ProductImage, ProductPrice, VariantAttribute
from django.utils.html import format_html


# Register your models here.

admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(Currency)
admin.site.register(PriceList)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ("image", "display_order", "image_preview")
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "No Image"


class ProductPriceInline(admin.TabularInline):
    model = ProductPrice
    extra = 1
    fields = (
        "price_list",
        "price",
        "discount_price",
        "valid_from",
        "valid_till",
    )


class VariantAttributeInline(admin.TabularInline):
    model = VariantAttribute
    extra = 1
    fields = ("attribute", "value")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "product_name",
        "category",
        "product_type",
        "thumbnail",
        "created_at",
    )
    list_filter = ("category", "created_at")
    search_fields = ("product_name", "description")
    inlines = [VariantAttributeInline, ProductImageInline, ProductPriceInline]

    def thumbnail(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" width="50" />', obj.cover_image.url)
        return "No Image"


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    fields = ("product", "quantity", "price", "amount")
    readonly_fields = ("amount",)


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("customer", "grand_total", "total_qty", "created_at", "updated_at")
    list_filter = ("created_at", "updated_at")
    search_fields = ("customer__email",)
    inlines = [CartItemInline]
    readonly_fields = ("grand_total", "total_qty")


class OrderItemInline(admin.TabularInline):
    model = OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity", "price", "amount")
    list_filter = ("cart__customer",)
    search_fields = ("product__product_name", "cart__customer__email")
    readonly_fields = ("amount",)
