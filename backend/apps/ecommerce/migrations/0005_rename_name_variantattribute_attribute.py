# Generated by Django 5.1.1 on 2025-05-13 13:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0004_product_template'),
    ]

    operations = [
        migrations.RenameField(
            model_name='variantattribute',
            old_name='name',
            new_name='attribute',
        ),
    ]
