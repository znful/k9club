from django.urls import include, path

from . import views

club_patterns = (
    [
        path("", views.club_index, name="index"),
        path("create/", views.club_create, name="create"),
    ],
    "clubs",
)

urlpatterns = [path("", include(club_patterns, namespace="clubs"))]
