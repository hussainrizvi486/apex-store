# Generated by Django 5.1.5 on 2025-06-16 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0003_remove_role_is_active_alter_permission_object'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='default',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
