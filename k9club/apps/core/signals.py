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
def initialize_new_club(sender, instance, created, **kwargs):
    """
    1. Creates/gets default Roles and assigns their permissions.
    2. Assigns the 'Owner' Role to the Club's creator.
    """
    if created:
        creator: user_model = instance.owner  # <-- Using the new ForeignKey field

        # --- A. Create/Get and Assign Permissions to the Roles ---
        owner_role = None

        for role_name, config in ROLE_PERMISSIONS_CONFIG.items():

            # 1. Get or Create the Role
            role, _ = Role.objects.get_or_create(
                name=role_name,
                defaults={"description": f"Default system role: {role_name}"},
            )

            if role_name == "Owner":
                owner_role = role  # Cache the owner role for step B

            # 2. Collect Permissions
            permissions_to_assign = []
            model_list = config["models"]
            codenames = config["codenames"]

            if model_list and codenames:
                # Get ContentType IDs for the models
                content_type_ids = [
                    ContentType.objects.get_for_model(model).id for model in model_list
                ]

                # Filter for permissions matching the ContentTypes and codenames
                permissions_to_assign = Permission.objects.filter(
                    content_type__in=content_type_ids,
                    codename__in=[
                        f"{code}_{ct.model}"
                        for code in codenames
                        for ct in ContentType.objects.filter(id__in=content_type_ids)
                    ],
                )

            # 3. Assign Permissions to the Role
            if permissions_to_assign:
                role.permissions.set(permissions_to_assign)

        # --- B. Assign 'Owner' Role to the Club Creator ---
        # This part ensures the creator is the first member and has the Owner role.
        if creator and owner_role:
            ClubUser.objects.create(user=creator, club=instance, role=owner_role)
