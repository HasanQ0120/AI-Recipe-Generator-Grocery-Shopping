import asyncio

MOCK_RECIPES = [
    {
        "id": "1",
        "title": "Pasta Aglio e Olio",
        "ingredients": ["pasta", "garlic", "olive oil", "parsley"],
        "time": "20 mins",
        "image": "https://via.placeholder.com/150"
    },
    {
        "id": "2",
        "title": "Egg Fried Rice",
        "ingredients": ["rice", "eggs", "soy sauce", "onion"],
        "time": "15 mins",
        "image": "https://via.placeholder.com/150"
    },
    {
        "id": "3",
        "title": "Avocado Toast",
        "ingredients": ["bread", "avocado", "salt", "lemon"],
        "time": "10 mins",
        "image": "https://via.placeholder.com/150"
    },
]

async def fetch_recipes(pantry_items: list = []):
    await asyncio.sleep(1)
    return {"recipes": MOCK_RECIPES, "error": None}

async def fetch_recipe_by_id(recipe_id: str):
    await asyncio.sleep(0.5)
    recipe = next((r for r in MOCK_RECIPES if r["id"] == recipe_id), None)
    if recipe:
        return {"recipe": recipe, "error": None}
    return {"recipe": None, "error": "Recipe not found"}