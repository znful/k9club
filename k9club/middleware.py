from django.contrib.messages import get_messages
from django.http import HttpRequest
from inertia import share

from k9club.utils.inertia_helpers import (VALIDATION_ERRORS_SESSION_KEY,
                                          InertiaValidationError,
                                          is_inertia_request)


def _share_the_messages_framework_to_inertia(request: HttpRequest):
    """Middleware helper to transfer Django messages framework messages to Inertia shared props."""
    messages = []
    for message in get_messages(request):
        message = {
            "message": message.message,
            "level": message.level,
            "tags": message.tags,
            "extra_tags": message.extra_tags,
            "level_tag": message.level_tag,
        }
        messages.append(message)
    share(request, messages=messages)


def _share_user(request: HttpRequest):
    if not request.user.is_authenticated:
        return

    auth = {"user": request.user}
    share(request, auth=auth)


def _share_validation_errors_to_inertia(request: HttpRequest):
    validation_errors = request.session.get(VALIDATION_ERRORS_SESSION_KEY, None)
    is_inertia_get_request = request.method == "GET" and "X-Inertia" in request.headers

    if is_inertia_get_request and validation_errors is not None:
        request.session.pop(VALIDATION_ERRORS_SESSION_KEY)
        request.session.modified = True
        share(request, errors=validation_errors)


class DataShareMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest):
        self._before_calling_view(request)
        response = self.get_response(request)
        self._after_calling_view(request)
        return response

    def _before_calling_view(self, request: HttpRequest):
        _share_the_messages_framework_to_inertia(request)
        _share_validation_errors_to_inertia(request)

    def _after_calling_view(self, request: HttpRequest):
        pass

    def process_exception(self, request: HttpRequest, exception: Exception):
        if isinstance(exception, InertiaValidationError):
            errors = {field: errors[0] for field, errors in exception.errors.items()}
            request.session[VALIDATION_ERRORS_SESSION_KEY] = errors
            request.session.modified = True
            return exception.redirect
        return None
