class Item:
    def __init__(self,task_id:int,title:str,completed:bool):
        self.task_id=task_id
        self.title=title
        self.completed=completed

tasks = [
    Item(
      1,
      "前髪を切る",
      False
    ),
    Item(
      2,
      "付箋を買う",
      False
    ),
    Item(
      3,
      "シフト表出す",
       False,
    ),
]

def get_task():
    return tasks

def create(item_create):
    new_task=Item(
        len(tasks)+1,
        item_create.get("title"),
        False
    )
    tasks.append(new_task)
    return new_task

def patch(task_id:int,completed:bool):
    for task in tasks:
        if task.task_id==task_id:
            completed=True
            return completed

def delete(task_id:int):
    for i in range(len(tasks)):
        if tasks[i].task_id==task_id:
            delete_task=tasks.pop(i)
            return delete_task
    return None