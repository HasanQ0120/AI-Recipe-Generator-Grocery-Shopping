from datetime import datetime  # import datetime to timestamp when items are added

pantry_items = []  # in-memory list holding all pantry items (resets on server restart)

def get_pantry():  # function to retrieve all pantry items
    return pantry_items  # return the full list as-is

def add_item(name: str, quantity: int = 1, unit: str = "pcs"):  # function to add a new item (quantity/unit optional)
    item = {  # build a dictionary representing one pantry item
        "id": str(len(pantry_items) + 1),  # generate a simple ID based on current list length
        "name": name,  # store the item's name
        "quantity": quantity,  # store how many of this item
        "unit": unit,  # store the measurement unit (e.g. pcs, kg)
        "added_at": datetime.now().isoformat()  # record current timestamp as text
    }
    pantry_items.append(item)  # add the new item to the list
    return item  # send back the created item (including its new ID)

def remove_item(item_id: str):  # function to remove an item by its ID
    global pantry_items  # tell Python we're modifying the outer pantry_items list
    pantry_items = [i for i in pantry_items if i["id"] != item_id]  # rebuild list excluding the matched item
    return {"success": True}  # confirm removal succeeded

def clear_pantry():  # function to wipe the entire pantry
    global pantry_items  # tell Python we're modifying the outer pantry_items list
    pantry_items = []  # reset the list to empty
    return {"success": True}  # confirm it was cleared