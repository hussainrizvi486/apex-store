from rest_framework import serializers
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "dob",
            "image",
            "email",
            "first_name",
            "last_name",
            "username",
            "mobile",
            "verified",
        )

    def get_image(self, obj):
        if not obj.image:
            return

        if self.context.get("request") is None:
            return obj.image.url

        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)
