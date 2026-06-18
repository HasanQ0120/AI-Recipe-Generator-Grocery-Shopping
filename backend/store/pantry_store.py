from datetime import datetime

pantry_items = []

def get_pantry():
    return pantry_items

def add_item(name: str, quantity: int = 1, unit: str = "pcs"):
    item = {
        "id": str(len(pantry_items) + 1),
        "name": name,
        "quantity": quantity,
        "unit": unit,
        "added_at": datetime.now().isoformat()
    }
    pantry_items.append(item)
    return item

def remove_item(item_id: str):
    global pantry_items
    pantry_items = [i for i in pantry_items if i["id"] != item_id]
    return {"success": True}

def clear_pantry():
    global pantry_items
    pantry_items = []
    return {"success": True}