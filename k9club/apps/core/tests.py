from typing import override

from django.contrib.auth import get_user_model
from django.test import TestCase

user_model = get_user_model()


# Create your tests here.
class ClubModelTest(TestCase):

    @override
    def setUp(self) -> None:
        user_model.objects.create(
            username="username", email="test@test.com", password="password"
        )

    def test_can_create_club(self) -> None: ...

    def test_clubuser_created_on_club_creation(self) -> None: ...

    def test_can_get_user_from_members_attribute(self) -> None: ...

    def test_can_get_user_from_owner_attribute(self) -> None: ...
