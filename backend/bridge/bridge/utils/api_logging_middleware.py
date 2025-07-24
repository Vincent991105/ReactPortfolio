# Duty on logging of every request, response 

import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger("django.request")  # 也可指定別的 logger

class APILoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        user = getattr(request, 'user', None)
        username = user.username if user else 'Anonymous'
        print("使用者為", username)
        logger.info(f"Incoming {request.method} {request.path} from {request.META.get('REMOTE_ADDR')} by user: {username}")

    def process_response(self, request, response):
        logger.info(f"Response {request.method} {request.path} -> {response.status_code}")
        return response
