import './App.css';

import { useState } from "react";

const Example = () => {
  return (
    <>
      <h2>タスク管理</h2>
      <Todo/>
    </>
  );
};

export default Example;


const Todo = () => {
  const todosList = [
    {
      id: 1,
      title: "前髪を切る",
      completed: false,
    },
    {
      id: 2,
      title: "付箋を買う",
      completed: false,
    },
    {
      id: 3,
      title: "シフト表出す",
      completed: false,
    },
  ];
  const [todos,setTodos]=useState(todosList)
  const deleteTodo=(id)=>{
    const newTodos=todos.filter((todo)=>{
      return todo.id!==id;
    })
    setTodos(newTodos)
  }
  const toggleTodoStatus=(id)=>{
    const newTodos=todos.map(todo=>{
      if(todo.id===id){
        return{...todo,completed:!todo.completed};
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const createTodo=(todo)=>{
    setTodos([...todos,todo]);
  }
  return(
    <>
      <List todos={todos} deleteTodo={deleteTodo} toggleTodoStatus={toggleTodoStatus}/>
      <Form createTodo={createTodo}/>
    </>
  )
};

const List=({todos,deleteTodo,toggleTodoStatus})=>{
    const deleted=(id)=>{
        deleteTodo(id)
    }
    return(
        <div>
            {todos.map(todo=>{
                return(
                    <div key={todo.id}>
                        <button onClick={()=>toggleTodoStatus(todo.id)}>{todo.completed? "完了":"未完了"}</button>
                        <span>{todo.title}</span>
                        <button onClick={()=>deleted(todo.id)}>削除</button>
                    </div>
                )
            })}
        </div>
    )
}


const Form=({createTodo})=>{
    const [enterdTodo,setEnterdTodo]=useState("");
    const addTodo=(e)=>{
        e.preventDefault();
        const newTodo={
            id: Math.floor(Math.random()*1e5),
            title:enterdTodo,
        };
        createTodo(newTodo);
    };
    return(
        <div>
            <form onSubmit={addTodo}>
                <input type="text" value={enterdTodo} onChange={(e)=>setEnterdTodo(e.target.value)} placeholder={"タイトルを入力"}/>
                <button>追加</button>
                <span>{enterdTodo}</span>
            </form>

        </div>
    )
}


