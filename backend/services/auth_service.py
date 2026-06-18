from firebase_admin import auth

def sign_up_user(email: str, password: str):
    try:
        user = auth.create_user(email=email, password=password)
        return {"user_id": user.uid, "email": user.email, "error": None}
    except Exception as e:
        return {"user_id": None, "error": str(e)}

def login_user(id_token: str):
    try:
        decoded = auth.verify_id_token(id_token)
        return {"user_id": decoded["uid"], "error": None}
    except Exception as e:
        return {"user_id": None, "error": str(e)}