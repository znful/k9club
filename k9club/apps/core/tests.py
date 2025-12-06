from typing import override

from django.contrib.auth import get_user_model
from django.test import TestCase

from k9club.apps.core.models import Adherent, Club, ClubUser

user_model = get_user_model()


# Create your tests here.
class ClubModelTest(TestCase):

    @override
    def setUp(self) -> None:
        user_model.objects.create(
            username="username", email="test@test.com", password="password"
        )

    def test_can_create_club(self) -> None:
        user = user_model.objects.first()
        club = Club.objects.create(name="club", owner=user)
        self.assertIsInstance(club, Club)
        self.assertEqual(club.name, "club")
        self.assertIsNot(club.slug, None)

    def test_clubuser_created_on_club_creation(self) -> None:
        user = user_model.objects.first()
        club = Club.objects.create(name="club", owner=user)

        club_user = ClubUser.objects.get(club=club)
        self.assertIsInstance(club_user, ClubUser)
        self.assertEqual(club_user.user, user)
        self.assertEqual(club_user.user, club.owner)

    def test_can_get_user_from_members_attribute(self) -> None:
        user = user_model.objects.first()
        club = Club.objects.create(name="club", owner=user)

        if user is None:
            self.fail("Failed to get user")

        self.assertIn(user, club.members.all())
        self.assertEqual(user, club.members.filter(pk=user.pk).get())

    def test_can_get_user_from_owner_attribute(self) -> None:
        user = user_model.objects.first()
        club = Club.objects.create(name="club", owner=user)

        self.assertEqual(user, club.owner)

    def test_can_get_clubs_from_user(self) -> None:
        user = user_model.objects.first()
        club = Club.objects.create(name="club", owner=user)

        self.assertEqual(user.owned_clubs.first(), club)

    def test_club_owner_has_clubuser_owner_role(self) -> None:
        user = user_model.objects.first()
        club = Club.objects.create(name="club", owner=user)

        club_user = ClubUser.objects.get(club=club, user=user)

        self.assertEqual(club_user.role.name, "Owner")


class AdherentModelTest(TestCase):

    @override
    def setUp(self) -> None:
        user = user_model.objects.create(
            username="username", email="test@test.com", password="password"
        )
        Club.objects.create(name="club", owner=user)

    def test_can_create_adherent(self) -> None:
        club = Club.objects.first()
        adherent = Adherent.objects.create(
            first_name="first", last_name="last", email="email@test.com", club=club
        )

        self.assertIsInstance(adherent, Adherent)

    def test_can_access_adherent_from_club(self):
        club = Club.objects.first()
        adherent = Adherent.objects.create(
            first_name="first", last_name="last", email="email@test.com", club=club
        )

        self.assertIsInstance(adherent.club, Club)
        self.assertEqual(adherent.club, club)
        self.assertEqual(club.adherents.get(pk=adherent.pk), adherent)
