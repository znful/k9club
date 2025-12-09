from inertia import render
from inertia.http import InertiaRequest


# Create your views here.
def club_index(request: InertiaRequest):
    return render(request=request, component="Clubs/Index", props={})
