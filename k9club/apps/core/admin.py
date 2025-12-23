from django.contrib import admin

# Register your models here.
from k9club.apps.core.models import (Adherent, Club, ClubUser, Dog, Invitation,
                                     Role)

admin.site.register(Club)
admin.site.register(Role)
admin.site.register(ClubUser)
admin.site.register(Adherent)
admin.site.register(Dog)
admin.site.register(Invitation)
