import json
import hashlib
from pathlib import Path

USERS_FILE = Path(__file__).parent.parent / "data" / "users.json"


def _hash(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def _load():
    if not USERS_FILE.exists():
        USERS_FILE.parent.mkdir(parents=True, exist_ok=True)
        USERS_FILE.write_text("{}")
    return json.loads(USERS_FILE.read_text() or "{}")


def _save(data):
    USERS_FILE.write_text(json.dumps(data, indent=2))


def register_user(name, email, password):
    users = _load()
    if email in users:
        return False, "Email already registered."
    users[email] = {
        "name": name,
        "password": _hash(password),
        "profile": {},
        "progress": [],
    }
    _save(users)
    return True, "Registered successfully."


def login_user(email, password):
    users = _load()
    user = users.get(email)
    if not user or user["password"] != _hash(password):
        return False, "Invalid email or password.", None
    return True, "Login successful.", user


def update_profile(email, profile: dict):
    users = _load()
    if email in users:
        users[email]["profile"] = profile
        _save(users)


def save_progress(email, entry: dict):
    users = _load()
    if email in users:
        users[email].setdefault("progress", []).append(entry)
        _save(users)


def get_user(email):
    return _load().get(email)
