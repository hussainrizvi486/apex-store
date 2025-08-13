import graphene
from graphene_django import DjangoObjectType
from .models.product import Product


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = "__all__"


class Query(graphene.ObjectType):
    products = graphene.List(ProductType)

    def resolve_products(self, info, **kwargs):
        return Product.objects.all()
