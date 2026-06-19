# store/user_store.py

# In-memory storage for now (linked by email)
# Later: replace with Firestore for permanent storage
user_preferences = {}  # dictionary holding each user's preferences, keyed by their email

def save_onboarding(email: str, diet: str, cuisine: str, allergies: list, skill: str):  # function to save a user's onboarding answers
    user_preferences[email] = {  # create/overwrite the entry for this email with a new dictionary
        "diet": diet,  # store their diet preference (e.g. Vegan)
        "cuisine": cuisine,  # store their preferred cuisine (e.g. Italian)
        "allergies": allergies,  # store their list of allergies (e.g. ["Nuts", "Dairy"])
        "skill": skill  # store their cooking skill level (e.g. Beginner)
    }
    return user_preferences[email]  # return what was just saved, as confirmation

def get_user_preferences(email: str):  # function to look up a user's saved preferences
    return user_preferences.get(email, None)  # return their preferences if found, otherwise return None