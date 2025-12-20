import json
from datetime import datetime

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.http import (require_GET, require_http_methods,
                                          require_POST)
from inertia import render

from k9club.apps.core.forms import ClubForm, ClubUpdateForm
from k9club.apps.core.models import Club
from k9club.utils.inertia_helpers import continue_or_redirect_with_errors


@login_required
@require_GET
def club_index(request: HttpRequest):
    user = request.user
    clubs = Club.objects.filter(members=user, is_active=True).order_by("-created_at")
    return render(request=request, component="Clubs/Index", props={"clubs": clubs})


@login_required
@require_POST
def club_create(request: HttpRequest):
    form = ClubForm(json.loads(request.body))
    _ = continue_or_redirect_with_errors(form, redirect("clubs:index"))

    club: Club = form.save(commit=False)
    club.owner = request.user
    club.save()
    messages.success(request, "Successfully created club")
    return redirect("clubs:index")


@login_required
@require_GET
def club_show(request: HttpRequest, slug: str):
    club: Club = Club.objects.get(slug=slug, members=request.user)
    return render(request=request, component="Clubs/Detail", props={"club": club})


@login_required
@require_POST
def club_update(request: HttpRequest, slug: str):
    club = get_object_or_404(Club, slug=slug)
    form = ClubUpdateForm(json.loads(request.body), instance=club)
    _ = continue_or_redirect_with_errors(form, redirect("clubs:show", slug=slug))

    club: Club = form.save()
    messages.success(request, "Successfully updated club")
    return redirect("clubs:show", slug=club.slug)


@login_required
@require_http_methods(["DELETE"])
def club_delete(request: HttpRequest, slug: str):
    club = Club.objects.get(slug=slug, members=request.user)
    club.is_active = False
    club.deleted_at = datetime.now()
    club.save()
    return redirect("clubs:index")
