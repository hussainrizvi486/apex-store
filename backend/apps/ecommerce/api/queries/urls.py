from django.urls import path
from .main import CategoryQuery, PriceListQuery, UOMQuery

urlpatterns = [
    path("query/category", CategoryQuery.as_view()),
    path("query/pricelist", PriceListQuery.as_view()),
    path("query/uom", UOMQuery.as_view()),
]
