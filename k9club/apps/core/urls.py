from django.urls import path

from . import views

club_patterns = (
    [
        path("", views.club_index, name="index"),
        path("create/", views.club_create, name="create"),
        path("<str:slug>/", views.club_show, name="show"),
        path("<str:slug>/edit/", views.club_update, name="edit"),
        path("<str:slug>/destroy/", views.club_destroy, name="destroy"),
        path("<str:slug>/invitations/", views.club_invitations, name="invitations"),
        path(
            "<str:slug>/invitations/create/",
            views.club_invitations_create,
            name="create_invitations",
        ),
    ],
    "clubs",
)

invitation_patterns = (
    [
        path("<int:id>/destroy/", views.invitation_destroy, name="destroy"),
    ],
    "invitations",
)
