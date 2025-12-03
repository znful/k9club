from typing import override

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.db import models

user_model = get_user_model()


# Create your models here.
class BaseModelMixin(models.Model):
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True


class Club(BaseModelMixin):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(
        user_model, on_delete=models.CASCADE, related_name="owned_clubs"
    )

    @override
    def __str__(self) -> str:
        return str(self.name)


class Role(BaseModelMixin):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    permissions = models.ManyToManyField(Permission, related_name="roles")
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="roles")

    @override
    def __str__(self) -> str:
        return str(self.name)

    class Meta:
        unique_together = ("name", "club")


class ClubUser(BaseModelMixin):
    user = models.ForeignKey(user_model, on_delete=models.CASCADE, related_name="clubs")
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="members")
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permissions = models.ManyToManyField(
        Permission, related_name="club_users", blank=True
    )

    @override
    def __str__(self) -> str:
        return f"{self.user.username} - {self.club.name} ({self.role})"


class Adherent(BaseModelMixin):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="adherents")
    notes = models.TextField(blank=True, null=True)
    documents = models.ManyToManyField("Document", blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Dog(BaseModelMixin):
    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    chip_number = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    owner = models.ForeignKey(Adherent, on_delete=models.CASCADE, related_name="dogs")
    notes = models.TextField(blank=True, null=True)
    documents = models.ManyToManyField("Document", blank=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.breed})"


class Invitation(BaseModelMixin):
    email = models.EmailField()
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="invitations")
    invited_by = models.ForeignKey(
        user_model, on_delete=models.CASCADE, related_name="sent_invitations"
    )
    token = models.CharField(max_length=64, unique=True)
    accepted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Invitation to {self.email} for {self.club.name}"


class Document(BaseModelMixin):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="documents/")
    uploaded_by = models.ForeignKey(
        user_model, on_delete=models.CASCADE, related_name="uploaded_documents"
    )
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.title
