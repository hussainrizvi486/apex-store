from django.contrib import admin
from apps.user_auth.models import User, Address

# Register your models here.


admin.site.register(User)
admin.site.register(Address)
