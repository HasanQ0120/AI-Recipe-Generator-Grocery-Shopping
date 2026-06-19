from fastapi import FastAPI
from typing import List
from config.firebase import initialize_firebase
from services.auth_service import sign_up_user, login_user
from services.recipe_api import fetch_recipes, fetch_recipe_by_id
from store.pantry_store import get_pantry, add_item, remove_item, clear_pantry
from store.user_store import save_onboarding, get_user_preferences

initialize_firebase()

app = FastAPI()

# ── Auth Routes ──────────────────────────────
@app.post("/signup")
def signup(email: str, password: str):
    return sign_up_user(email, password)

@app.post("/login")
def login(email: str):
    return login_user(email)

# ── Recipe Routes ────────────────────────────
@app.get("/recipes")
async def get_recipes():
    return await fetch_recipes()

@app.get("/recipes/{recipe_id}")
async def get_recipe(recipe_id: str):
    return await fetch_recipe_by_id(recipe_id)

# ── Pantry Routes ────────────────────────────
@app.get("/pantry")
def get_all_items():
    return get_pantry()

@app.post("/pantry")
def add_pantry_item(name: str, quantity: int = 1, unit: str = "pcs"):
    return add_item(name, quantity, unit)

@app.delete("/pantry/{item_id}")
def delete_item(item_id: str):
    return remove_item(item_id)

@app.delete("/pantry")
def clear_all():
    return clear_pantry()

# ── Onboarding Routes ────────────────────────
@app.post("/onboarding")
def onboarding(
    email: str,
    diet: str,
    cuisine: str,
    allergies: List[str],
    skill: str
):
    result = save_onboarding(email, diet, cuisine, allergies, skill)
    return {"success": True, "preferences": result}

@app.get("/onboarding/{email}")
def get_onboarding(email: str):
    prefs = get_user_preferences(email)
    if prefs:
        return {"preferences": prefs, "error": None}
    return {"preferences": None, "error": "No preferences found"}