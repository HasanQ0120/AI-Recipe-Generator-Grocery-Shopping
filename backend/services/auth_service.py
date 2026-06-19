from firebase_admin import auth  # gives us functions to create/verify users in Firebase

def sign_up_user(email: str, password: str):  # function to create a new user account
    try:  # attempt the signup, catch errors instead of crashing
        user = auth.create_user(email=email, password=password)  # ask Firebase to create the user
        return {"user_id": user.uid, "email": user.email, "error": None}  # return success with user info
    except Exception as e:  # if anything went wrong (e.g. email already exists)
        return {"user_id": None, "error": str(e)}  # return the error message instead

def login_user(id_token: str):  # function to verify a login token (NOTE: expects a token, not email/password)
    try:  # attempt to verify, catch errors instead of crashing
        decoded = auth.verify_id_token(id_token)  # ask Firebase to check if this token is valid
        return {"user_id": decoded["uid"], "error": None}  # return success with the user's ID
    except Exception as e:  # if the token was invalid, expired, or fake
        return {"user_id": None, "error": str(e)}  # return the error message instead