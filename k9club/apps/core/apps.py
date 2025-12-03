from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "k9club.apps.core"

    def ready(self):
        # Import signal handlers to ensure they are registered
        import k9club.apps.core.signals
