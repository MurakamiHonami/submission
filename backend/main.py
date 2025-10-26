from fastapi import FastAPI,Body
from tasks import taskList
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/todos")
async def get_all():
    return taskList.get_task()

@app.post("/api/todos")
async def create(task_create: dict = Body(...)):
    return taskList.create(task_create)

@app.patch("/api/todos/{task_id}") 
async def update(task_id: int, completed_data: dict = Body(...)):
    return taskList.patch(task_id, completed_data.get("completed"))


@app.delete("/api/todos/{task_id}")
async def delete(task_id:int):
    return taskList.delete(task_id)