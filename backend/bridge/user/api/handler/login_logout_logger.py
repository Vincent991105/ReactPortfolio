# bridge/api/logging/login_logout_logger.py

import logging
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.dispatch import receiver

logger = logging.getLogger("auth")

@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    logger.info(f"User '{user.username}' logged in from IP {request.META.get('REMOTE_ADDR')}")

@receiver(user_logged_out)
def log_user_logout(sender, request, user, **kwargs):
    logger.info(f"User '{user.username}' logged out from IP {request.META.get('REMOTE_ADDR')}")