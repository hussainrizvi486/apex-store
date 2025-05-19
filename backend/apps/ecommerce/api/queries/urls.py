from django.urls import path
from .main import CategoryQuery

urlpatterns = [
    path("query/category", CategoryQuery.as_view()),
]
