import secrets


def generate_slug():
    return secrets.token_hex(8)
