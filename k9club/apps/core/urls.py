from django.urls import include, path

from . import views

club_patterns = (
    [
        path("", views.club_index, name="index"),
        path("create/", views.club_create, name="create"),
        path("<str:slug>/", views.club_show, name="show"),
        path("<str:slug>/edit/", views.club_update, name="edit"),
        path("<str:slug>/delete/", views.club_delete, name="delete"),
    ],
    "clubs",
)

urlpatterns = [path("", include(club_patterns, namespace="clubs"))]
