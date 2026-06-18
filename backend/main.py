from fastapi import FastAPI
from config.firebase import initialize_firebase
from services.auth_service import sign_up_user, login_user
from services.recipe_api import fetch_recipes, fetch_recipe_by_id
from store.pantry_store import get_pantry, add_item, remove_item, clear_pantry

initialize_firebase()

app = FastAPI()

@app.post("/signup")
def signup(email: str, password: str):
    return sign_up_user(email, password)

@app.post("/login")
def login(id_token: str):
    return login_user(id_token)

@app.get("/recipes")
async def get_recipes():
    return await fetch_recipes()

@app.get("/recipes/{recipe_id}")
async def get_recipe(recipe_id: str):
    return await fetch_recipe_by_id(recipe_id)

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