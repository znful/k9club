from django.contrib.auth import get_user_model

from k9club.apps.core.models import Club, ClubUser

user_model = get_user_model()


def has_club_permission(user: user_model, club: Club, permission: str) -> bool:
    """
    Check if the user has a specific permission for the given club.

    Args:
        user (User): The user to check permissions for.
        club (Club): The club to check permissions against.
        permission (str): The permission to check (e.g., 'view', 'edit').

    Returns:
        bool: True if the user has the specified permission for the club, False otherwise.
    """
    if club not in user.clubs.all():
        return False

    club_user: ClubUser = user.club_users.get(club=club)

    if not club_user:
        return False

    if club_user.role.permissions.filter(codename=permission).exists():
        return True

    if club_user.permissions.filter(codename=permission).exists():
        return True

    return False
