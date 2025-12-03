# your_app/signals.py

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Adherent, Club, ClubUser, Document, Dog, Role

user_model = get_user_model()

# Map roles to the list of models they need permissions on.
ROLE_PERMISSIONS_CONFIG = {
    "Owner": {
        "models": [Club, Role, ClubUser, Adherent, Dog, Document],
        "codenames": ["add", "change", "delete", "view"],
    },
    "Admin": {
        "models": [Adherent, Dog, Document],
        "codenames": ["add", "change", "view"],
    },
    "Member": {
        "models": [Adherent, Dog],
        "codenames": ["view"],
    },
}


@receiver(post_save, sender=Club)
def initialize_new_club(sender: Club, instance: Club, created: bool, **kwargs) -> None:
    """
    1. Creates/gets default Roles and assigns their permissions.
    2. Assigns the 'Owner' Role to the Club's owner.
    """
    if created:
        club_owner = instance.owner

        owner_role = None

        for role_name, config in ROLE_PERMISSIONS_CONFIG.items():

            role, _ = Role.objects.get_or_create(
                name=role_name,
                club=instance,
                defaults={"description": f"Default system role: {role_name}"},
            )

            if role_name == "Owner":
                owner_role = role

            permissions_to_assign = []
            model_list = config["models"]
            codenames = config["codenames"]

            if model_list and codenames:
                content_type_ids = [
                    ContentType.objects.get_for_model(model).id for model in model_list
                ]

                permissions_to_assign = Permission.objects.filter(
                    content_type__in=content_type_ids,
                    codename__in=[
                        f"{code}_{ct.model}"
                        for code in codenames
                        for ct in ContentType.objects.filter(id__in=content_type_ids)
                    ],
                )

            if permissions_to_assign:
                role.permissions.set(permissions_to_assign)

        if club_owner and owner_role:
            ClubUser.objects.create(user=club_owner, club=instance, role=owner_role)
