
class Item:
    def __init__(self, task_id: int, title: str, completed: bool):
        self.id = task_id
        self.title = title
        self.completed = completed

tasks = [
    Item(1, "前髪を切る", False),
    Item(2, "付箋を買う", False),
    Item(3, "シフト表出す", False),
]

def get_task():
    return [{"id": t.id, "title": t.title, "completed": t.completed} for t in tasks]

def create(item_create: dict):
    global tasks
    new_id = max([t.id for t in tasks]) + 1 if tasks else 1

    new_task = Item(
        new_id,
        item_create.get("title"),
        False
    )
    tasks.append(new_task)
    return {"id": new_task.id, "title": new_task.title, "completed": new_task.completed}


def patch(task_id: int, completed: bool): 
    for task in tasks:
        if task.id == task_id:
            task.completed = completed
            return {"id": task.id, "title": task.title, "completed": task.completed}
    return None

def delete(task_id: int):
    global tasks
    initial_len = len(tasks)
    tasks = [task for task in tasks if task.id != task_id]
    
    if len(tasks) < initial_len:
        return {"success": True}
    return {"success": False, "message": "Task not found"}