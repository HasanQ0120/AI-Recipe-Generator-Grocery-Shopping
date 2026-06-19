from fastapi import FastAPI  # import FastAPI, the framework that powers this backend
from typing import List  # import List type, used to define the allergies parameter as a list
from config.firebase import initialize_firebase  # import the function that connects to Firebase
from services.auth_service import sign_up_user, login_user  # import signup/login logic
from store.pantry_store import get_pantry, add_item, remove_item, clear_pantry  # import pantry functions
from store.user_store import save_onboarding, get_user_preferences  # import onboarding/preferences functions

initialize_firebase()  # run Firebase connection setup once when the server starts

app = FastAPI()  # create the main FastAPI application instance

# ── Auth Routes ──────────────────────────────
@app.post("/signup")  # define a POST endpoint at /signup
def signup(email: str, password: str):  # accepts email and password as query parameters
    return sign_up_user(email, password)  # call the signup logic and return its result

@app.post("/login")  # define a POST endpoint at /login
def login(email: str):  # accepts email as a query parameter
    return login_user(email)  # call the login logic and return its result

# ── Pantry Routes ────────────────────────────
@app.get("/pantry")  # define a GET endpoint at /pantry
def get_all_items():  # no parameters needed
    return get_pantry()  # return the full list of pantry items

@app.post("/pantry")  # define a POST endpoint at /pantry
def add_pantry_item(name: str, quantity: int = 1, unit: str = "pcs"):  # accepts name (required), quantity/unit (optional)
    return add_item(name, quantity, unit)  # add the item and return it

@app.delete("/pantry/{item_id}")  # define a DELETE endpoint, item_id comes from the URL path
def delete_item(item_id: str):  # accepts the item's ID to delete
    return remove_item(item_id)  # remove that item and confirm

@app.delete("/pantry")  # define a DELETE endpoint at /pantry (no ID = clear everything)
def clear_all():  # no parameters needed
    return clear_pantry()  # wipe the entire pantry and confirm

# ── Onboarding Routes ────────────────────────
@app.post("/onboarding")  # define a POST endpoint at /onboarding
def onboarding(  # accepts the following parameters:
    email: str,  # the user's email, used as their unique identifier
    diet: str,  # their diet preference
    cuisine: str,  # their preferred cuisine
    allergies: List[str],  # a list of allergy strings
    skill: str  # their cooking skill level
):
    result = save_onboarding(email, diet, cuisine, allergies, skill)  # save all this to user_store
    return {"success": True, "preferences": result}  # confirm success and return what was saved

@app.get("/onboarding/{email}")  # define a GET endpoint, email comes from the URL path
def get_onboarding(email: str):  # accepts the email to look up
    prefs = get_user_preferences(email)  # fetch saved preferences for this email
    if prefs:  # check if preferences were actually found
        return {"preferences": prefs, "error": None}  # return them with no error
    return {"preferences": None, "error": "No preferences found"}  # otherwise return an error message