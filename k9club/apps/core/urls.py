from django.urls import include, path

from . import views

dog_patterns = (
    [
        path("", views.club_dogs_index, name="index"),
        path("<int:dog_id>/", views.club_dogs_show, name="show"),
        path("create/", views.club_dogs_create, name="create"),
    ],
    "dogs",
)

adherent_dog_patterns = (
    [
        path("create/", views.club_adherents_dog_create, name="create"),
    ],
    "adherent-dogs",
)

adherent_patterns = (
    [
        path("", views.club_adherents_index, name="index"),
        path("<int:adherent_id>/", views.club_adherents_show, name="show"),
        path(
            "<int:adherent_id>/dogs/",
            include(adherent_dog_patterns, namespace="adherent-dogs"),
        ),
        path("create/", views.club_adherents_create, name="create"),
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
        path(
            "<str:slug>/adherents/", include(adherent_patterns, namespace="adherents")
        ),
        path("<str:slug>/dogs/", include(dog_patterns, namespace="dogs")),
    ],
    "clubs",
)
