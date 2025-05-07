from django.http import HttpRequest


def extract_client_ip(request: HttpRequest) -> str:
    """
    Extracts the client's IP address from the given HttpRequest object.
    Checks 'HTTP_X_FORWARDED_FOR' first, then falls back to 'REMOTE_ADDR'.
    """
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if not x_forwarded_for:
        return request.META.get("REMOTE_ADDR", "")

    return x_forwarded_for.split(",")[0].strip()
