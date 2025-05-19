from ...models import Category, Currency, Customer, PriceList
from rest_framework.views import APIView
from rest_framework.response import Response


class CategoryQuery(APIView):
    def get(self, *args, **kwargs):
        data = Category.objects.values("name", "description", "image")
        return Response(data)
