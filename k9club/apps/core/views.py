from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from inertia import render
from inertia.http import InertiaRequest

from k9club.apps.core.models import Club


@login_required
def club_index(request: InertiaRequest):
    user = request.user
    clubs = Club.objects.filter(members=user).order_by("-created_at")
    return render(request=request, component="Clubs/Index", props={"clubs": clubs})
