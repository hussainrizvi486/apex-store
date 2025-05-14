from rest_framework import serializers
from apps.ecommerce.models import Category, Currency, PriceList


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "id", "description", "image"]


class PriceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceList
        fields = "__all__"


class CategoryTreeSerializer(serializers.ModelSerializer):
    """Recursive serializer for Category with children"""

    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "description", "image", "parent", "children"]

    def get_children(self, obj):
        """Get all children for this category"""
        # Get direct children
        children = Category.objects.filter(parent=obj)
        # Serialize them with the same serializer
        serializer = CategoryTreeSerializer(children, many=True, context=self.context)
        return serializer.data


class CategoryListSerializer(serializers.Serializer):
    """Serializer for listing all categories in a tree structure"""

    categories = serializers.SerializerMethodField()

    def get_categories(self, obj):
        # Get only root categories (those without parents)
        root_categories = Category.objects.filter(parent=None)
        serializer = CategoryTreeSerializer(
            root_categories, many=True, context=self.context
        )
        return serializer.data
