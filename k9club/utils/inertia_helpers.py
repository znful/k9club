from typing import Any

from django.forms import BaseForm
from django.forms.utils import ErrorDict
from django.http import (HttpRequest, HttpResponsePermanentRedirect,
                         HttpResponseRedirect)

VALIDATION_ERRORS_SESSION_KEY = "_inertia_validation_errors"

InertiaRedirect = HttpResponseRedirect | HttpResponsePermanentRedirect


class InertiaValidationError(Exception):
    def __init__(self, errors: ErrorDict, redirect: InertiaRedirect):
        super().__init__()
        self.redirect: InertiaRedirect = redirect
        self.errors: ErrorDict = errors


def is_inertia_request(request: HttpRequest) -> bool:
    return "X-Inertia" in request.headers


def continue_or_redirect_with_errors(
    form: BaseForm, redirect: InertiaRedirect
) -> dict[str, Any]:
    """Helper to validate a Django form and either return cleaned_data or redirect with the form errors.
    Only use this option if the request path your form was rendered on is not the same as the one you are posting to.
    """
    if not form.is_valid():
        raise InertiaValidationError(form.errors, redirect)

    return form.cleaned_data
