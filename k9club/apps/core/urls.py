from django.urls import include, path

from . import views

club_patterns = ([path("", views.club_index, name="index")], "clubs")

urlpatterns = [path("", include(club_patterns, namespace="clubs"))]
