import json

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from django.shortcuts import redirect
from django.views.decorators.http import require_GET, require_POST
from inertia import render

from k9club.apps.core.forms import ClubForm
from k9club.apps.core.models import Club


@login_required
@require_GET
def club_index(request: HttpRequest):
    user = request.user
    clubs = Club.objects.filter(members=user).order_by("-created_at")
    return render(request=request, component="Clubs/Index", props={"clubs": clubs})


@require_POST
def club_create(request: HttpRequest):
    form = ClubForm(json.loads(request.body))

    if form.is_valid():
        club: Club = form.save(commit=False)
        club.owner = request.user
        club.save()
        messages.success(request, "Successfully created club")
        return redirect("clubs:index")

    return redirect("clubs:index")
