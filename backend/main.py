from fastapi import FastAPI,Body
from tasks import taskList
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# @app.get("/")
# async def example():
#     return {"message":"Hello world"}

@app.get("/tasks")
async def get_all():
    return taskList.get_task()

@app.post("/tasks")
async def create(task_create=Body()):
    return taskList.create(task_create)

@app.patch("/tasks/{task_id}")
async def update(task_id:int,completed=Body()):
    return taskList.patch(id,completed)

@app.delete("tasks/{task_id}")
async def delete(task_id:int):
    return taskList.delete(task_id)