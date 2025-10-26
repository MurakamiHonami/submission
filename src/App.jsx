import './App.css';

import { useState, useEffect } from "react"; 

const API_URL = "http://localhost:8000/api/todos"; // APIエンドポイントはサーバー設定に合わせるため、ここでは変更しない

const Example = () => {
  return (
    <>
      <h2>タスク管理</h2>
      <TaskApp/>
    </>
  );
};

export default Example;


const TaskApp = () => { 
  const initialTasksList = [
    { id: 1, title: "前髪を切る", completed: false },
    { id: 2, title: "付箋を買う", completed: false },
    { id: 3, title: "シフト表出す", completed: false },
  ];
  
  const [tasks, setTasks] = useState(initialTasksList); // todos -> tasks, setTodos -> setTasks

  //データ取得
  useEffect(() => {
    fetchTasks(); // fetchTodos -> fetchTasks
  }, []); 

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        console.error("API接続失敗");
        return; 
      }
      const data = await response.json();
      setTasks(data); // setTodos -> setTasks
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  //タスクの削除
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) { 
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  //完了状態の切り替え
  const toggleTaskStatus = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;
    const newCompletedStatus = !taskToUpdate.completed;

    setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: newCompletedStatus } : task
    ));

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: newCompletedStatus }), 
      });
      if (!response.ok) {
        throw new Error("Failed to toggle status");
      }
    } catch (error) {
      console.error("Update error:", error);
      fetchTasks();
    }
  };

  //タスクの作成
  const createTask = async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        console.error("タスクの追加失敗");
        const fallbackTask = { ...task, id: Date.now() }; // fallbackTodo -> fallbackTask, todo -> task
        setTasks(prevTasks => [...prevTasks, fallbackTask]); // setTodos -> setTasks, prevTodos -> prevTasks
        return;
      }

      const newTaskFromServer = await response.json(); // newTodoFromServer -> newTaskFromServer
      setTasks(prevTasks => [...prevTasks, newTaskFromServer]); // setTodos -> setTasks, prevTodos -> prevTasks
      
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  return(
    <>
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTaskStatus={toggleTaskStatus}/>
      <TaskForm createTask={createTask}/>
    </>
  )
};

const TaskList=({tasks, deleteTask, toggleTaskStatus})=>{
    const deleted=(id)=>{
    deleteTask(id)
  }
  
  return(
    <div>
      {tasks.map(task=>{
        return(
          <div key={task.id}>
            <button onClick={()=>toggleTaskStatus(task.id)}>{task.completed? "完了":"未完了"}</button> {/* toggleTodoStatus -> toggleTaskStatus, todo -> task */}
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}> {/* todo -> task */}
              {task.title}
            </span>
            <button onClick={()=>deleted(task.id)}>削除</button> {/* todo -> task */}
          </div>
        )
      })}
    </div>
  )
}


const TaskForm=({createTask})=>{
  const [enteredTask, setEnteredTask] = useState(""); // enterdTodo -> enteredTask, setEnterdTodo -> setEnteredTask
  const addTask=async (e)=>{
    e.preventDefault();

    if (!enteredTask.trim()) {
      return; 
    }

    const newTask={
      title:enteredTask,
      completed: false,
    };
    
    await createTask(newTask);
    
    setEnteredTask("");
  };
  return(
    <div>
      <form onSubmit={addTask}>
        <input type="text" value={enteredTask} onChange={(e)=>setEnteredTask(e.target.value)} placeholder={"タイトルを入力"}/> {/* enterdTodo -> enteredTask, setEnterdTodo -> setEnteredTask */}
        <button type="submit">追加</button>
      </form>
    </div>
  )
}