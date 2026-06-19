import firebase_admin  # lets Python talk to Firebase
from firebase_admin import credentials  # used to load our secret key file
import os  # used to work with file paths

def initialize_firebase():  # sets up the connection to Firebase, called once when server starts
    if not firebase_admin._apps:  # only run if Firebase hasn't already been initialized
        base_dir = os.path.dirname(os.path.abspath(__file__))  # get the folder this file lives in
        key_path = os.path.join(base_dir, "serviceAccountKey.json")  # build full path to the secret key file
        cred = credentials.Certificate(key_path)  # load the secret key as credentials
        firebase_admin.initialize_app(cred)  # open the connection to Firebase using those credentials