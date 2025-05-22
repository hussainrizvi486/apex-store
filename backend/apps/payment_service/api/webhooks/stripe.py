import json
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response


class StripeWebhookView(APIView):
    def handle_checkout(self, event):
        meta_data: dict = event["data"]["object"]["metadata"]

        ...

    @csrf_exempt
    def post(self, *args, **kwargs):
        payload = self.request.body
        sig_header = self.request.META.get("HTTP_STRIPE_SIGNATURE")
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_END_SECRECT_KEY
            )
        except Exception as e:
            # Handle the error
            return Response({"error": str(e)}, status=400)
            # Log the error for further investigation
            # logging.error(f"Stripe webhook error: {str(e)}")

        if event.type == "checkout.session.completed":
            self.handle_checkout(event)

            ...
            