from django.urls import include, path

from . import views

adherent_patterns = (
    [
        path("", views.club_adherents_index, name="adherents_index"),
        path("create/", views.club_adherents_create, name="adherents_create"),
    ],
    "adherents",
)


invitation_patterns = (
    [
        path("<int:id>/destroy/", views.invitation_destroy, name="destroy"),
    ],
    "invitations",
)


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
        path("<str:slug>/adherents/", include(adherent_patterns)),
    ],
    "clubs",
)
