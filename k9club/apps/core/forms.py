from django.forms import ModelForm

from k9club.apps.core.models import Club


class ClubForm(ModelForm):
    class Meta:
        model = Club
        fields = ["name", "description"]


class ClubUpdateForm(ModelForm):
    class Meta:
        model = Club
        fields = ["name", "description", "slug"]
