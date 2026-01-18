from django.forms import ModelForm

from k9club.apps.core.models import Adherent, Club, Dog, Invitation


class ClubForm(ModelForm):
    class Meta:
        model = Club
        fields = ["name", "description"]


class ClubUpdateForm(ModelForm):
    class Meta:
        model = Club
        fields = ["name", "description", "slug"]


class InvitationForm(ModelForm):
    class Meta:
        model = Invitation
        fields = ["email"]


class AdherentForm(ModelForm):
    class Meta:
        model = Adherent
        fields = "__all__"


class AdherentDogForm(ModelForm):
    """Simplified form for quickly adding a dog to an adherent."""

    class Meta:
        model = Dog
        fields = ["name", "breed", "age"]


class DogForm(ModelForm):
    class Meta:
        model = Dog
        fields = "__all__"
