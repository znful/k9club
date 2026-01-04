import json
from datetime import datetime

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpRequest
from django.shortcuts import get_object_or_404, redirect
from django.views.decorators.http import (require_GET, require_http_methods,
                                          require_POST)
from inertia import render

from k9club.apps.core.forms import (AdherentForm, ClubForm, ClubUpdateForm,
                                    InvitationForm)
from k9club.apps.core.models import Adherent, Club, Invitation
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
def club_destroy(request: HttpRequest, slug: str):
    club = Club.objects.get(slug=slug, members=request.user)
    club.is_active = False
    club.deleted_at = datetime.now()
    club.save()
    return redirect("clubs:index")


@login_required
@require_GET
def club_invitations(request: HttpRequest, slug: str):
    club = Club.objects.get(slug=slug, members=request.user)
    invitations: list[Invitation] = (
        club.invitations.select_related("invited_by")
        .filter(is_active=True)
        .order_by("-created_at")
    )

    json_invitations = [
        {
            "id": invitation.id,
            "email": invitation.email,
            "invited_by": {
                "id": invitation.invited_by.id,
                "username": invitation.invited_by.username,
                "email": invitation.invited_by.email,
            },
            "created_at": invitation.created_at.isoformat(),
            "is_active": invitation.is_active,
            "token": invitation.token,
        }
        for invitation in invitations
    ]

    return render(
        request=request,
        component="Clubs/Invitations",
        props={"club": club, "invitations": json_invitations},
    )


@login_required
@require_POST
def club_invitations_create(request: HttpRequest, slug: str):
    club = Club.objects.get(slug=slug, members=request.user)
    form = InvitationForm(json.loads(request.body))
    _ = continue_or_redirect_with_errors(
        form, redirect("clubs:invitations", slug=club.slug)
    )

    invitation: Invitation = form.save(commit=False)
    invitation.invited_by = request.user
    invitation.club = club
    invitation.save()
    messages.success(request, f"Successfully created invitation")
    return redirect("clubs:invitations", slug=club.slug)


def invitation_destroy(request: HttpRequest, id: int):
    invitation = get_object_or_404(Invitation, id=id)
    club = invitation.club

    if not club.members.filter(id=request.user.pk).exists():
        messages.error(request, "You do not have permission to delete this invitation")
        return redirect("clubs:invitations", slug=club.slug)

    invitation.is_active = False
    invitation.deleted_at = datetime.now()
    invitation.save()
    messages.success(request, "Successfully deleted invitation")
    return redirect("clubs:invitations", slug=club.slug)


@login_required
@require_GET
def club_adherents_index(request: HttpRequest, slug: str):
    club = Club.objects.get(slug=slug, members=request.user)
    adherents: list[Adherent] = club.adherents.all()
    return render(
        request=request,
        component="Clubs/Adherents/Index",
        props={"club": club, "adherents": adherents},
    )


@login_required
@require_POST
def club_adherents_create(request: HttpRequest, slug: str):
    club = Club.objects.get(slug=slug, members=request.user)
    form = AdherentForm(json.loads(request.body))
    _ = continue_or_redirect_with_errors(
        form, redirect("clubs:adherents:index", slug=club.slug)
    )

    adherent: Adherent = form.save(commit=False)
    adherent.club = club
    adherent.save()
    messages.success(request, "Successfully created adherent")
    return redirect("clubs:adherents:index", slug=club.slug)
