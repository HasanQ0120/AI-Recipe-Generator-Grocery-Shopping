import firebase_admin
from firebase_admin import credentials
import os

def initialize_firebase():
    if not firebase_admin._apps:
        # This finds the file no matter where you run from
        base_dir = os.path.dirname(os.path.abspath(__file__))
        key_path = os.path.join(base_dir, "serviceAccountKey.json")
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)