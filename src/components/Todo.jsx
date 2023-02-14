import React, { useContext, useEffect, useState } from "react";
import "./todo.css";
import { db } from "../firebaseConfig";
import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { Button, ListItemButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../Auth";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Todo = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("");

  // Create data in firebase
  const addTask = async (e) => {
    e.preventDefault();

    if (input === "") {
      alert("Add a valid task");
      return;
    }
    await addDoc(collection(db, `users-data/${userId}/todos`), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read data from firebase
  useEffect(() => {
    const q = query(collection(db, `users-data/${userId}/todos`))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="todo-container">
      <h3>Easily manage your daily tasks on the go</h3>
      <form className="todo-form" onSubmit={addTask}>
        <TextField
          fullWidth
          label="Add a new task"
          placeholder="What's on your mind?"
          variant="standard"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          autoComplete="off"
        />
        <button type="sumbit" className="todo-btn" variant="outlined">
          <AddIcon size={30} />
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.text} className={todo.completed ? 'todo-completed' : 'todo-li'}>
            <div className="todo-row">
              <input type='checkbox'/>
              <p className={todo.completed ? 'text-completed' : 'text'}>{todo.text.charAt(0).toUpperCase() + todo.text.slice(1)}</p>
            </div>
            <button className="delete-btn"><DeleteOutlineIcon/></button>
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default Todo;
