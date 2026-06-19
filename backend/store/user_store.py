# store/user_store.py

# In-memory storage for now (linked by email)
# Later: replace with Firestore for permanent storage
user_preferences = {}

def save_onboarding(email: str, diet: str, cuisine: str, allergies: list, skill: str):
    user_preferences[email] = {
        "diet": diet,
        "cuisine": cuisine,
        "allergies": allergies,
        "skill": skill
    }
    return user_preferences[email]

def get_user_preferences(email: str):
    return user_preferences.get(email, None)