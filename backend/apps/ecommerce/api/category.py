from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status


from apps.ecommerce.serializer.main import CategorySerializer, Category


class CategoryViewSet(viewsets.ViewSet):
    """
    API view to retrieve categories.
    """

    def list(self, *args, **kwargs):
        queryset = Category.objects.all()
        serializer = CategorySerializer(
            queryset, many=True, context={"request": self.request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    def tree(self, *args, **kwargs):
        return Response({}, status=status.HTTP_200_OK)
