import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from django.db.utils import IntegrityError

from apps.ecommerce.models import Category, Currency, PriceList
from apps.ecommerce.models.product import Product, ProductPrice, ProductTypeChoices


class Command(BaseCommand):
    help = "Generate 10,000 temporary products for testing"

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=10000,
            help="Number of products to generate (default: 10000)",
        )
        parser.add_argument(
            "--batch-size",
            type=int,
            default=1000,
            help="Batch size for database operations (default: 1000)",
        )

    def handle(self, *args, **options):
        count = options["count"]
        batch_size = options["batch_size"]

        self.stdout.write(self.style.SUCCESS(f"Starting to generate {count} products"))

        # Get or create a default category
        category, created = Category.objects.get_or_create(
            name="Temporary Products",
            defaults={
                "description": "Category for temporary test products",
            },
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created default category"))

        # Get or create a default currency
        currency, created = Currency.objects.get_or_create(
            code="USD",
            defaults={
                "name": "US Dollar",
                "symbol": "$",
            },
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created default currency"))

        # Get or create a default price list
        price_list, created = PriceList.objects.get_or_create(
            name="Standard Price",
            defaults={
                "currency": currency,
                "selling": True,
            },
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created default price list"))

        # Generate products in batches
        products_created = 0

        for batch_num in range(0, count, batch_size):
            batch_end = min(batch_num + batch_size, count)
            batch_size_actual = batch_end - batch_num

            self.stdout.write(
                f"Processing batch {batch_num//batch_size + 1}, creating {batch_size_actual} products..."
            )

            with transaction.atomic():
                # Create products in this batch
                products = []
                for i in range(batch_size_actual):
                    product_number = batch_num + i + 1
                    product = Product(
                        product_name=f"Temp Product {product_number}",
                        description=f"This is a temporary test product {product_number}",
                        product_type=ProductTypeChoices.PRODUCT,
                        unit_of_measurement="Unit",
                        category=category,
                    )
                    products.append(product)

                # Bulk create products
                created_products = Product.objects.bulk_create(products)

                # Create prices for each product
                prices = []
                now = timezone.now()
                valid_till = now + timedelta(days=365)

                for product in created_products:
                    price = ProductPrice(
                        product=product,
                        price_list=price_list,
                        price=round(random.uniform(10.0, 1000.0), 2),
                        valid_from=now,
                        valid_till=valid_till,
                    )
                    prices.append(price)

                # Bulk create prices
                ProductPrice.objects.bulk_create(prices)

                products_created += len(created_products)
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created {len(created_products)} products in batch {batch_num//batch_size + 1}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully generated {products_created} temporary products with prices"
            )
        )
