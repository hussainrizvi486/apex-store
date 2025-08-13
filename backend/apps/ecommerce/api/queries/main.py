from ...models import Category, PriceList, UOM
from rest_framework.views import APIView
from rest_framework.response import Response


class PriceListQuery(APIView):
    def get(self, *args, **kwargs):
        data = PriceList.objects.values("name", "currency", "buying", "selling", "id")
        return Response(data)


class CategoryQuery(APIView):
    def get(self, *args, **kwargs):
        data = Category.objects.values("name", "description", "image", "id")
        return Response(data)


class UOMQuery(APIView):
    def get(self, *args, **kwargs):
        data = UOM.objects.values("name", "id")
        return Response(data)
