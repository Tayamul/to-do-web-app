import React, { useState } from 'react'
import './todo.css'
import {db} from '../firebaseConfig'
import { collection, getDoc, addDoc } from 'firebase/firestore'
import { Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const Todo = () => {

    const [input, setInput] = useState('')

    // Create data in firebase
    const addTask = async () => {
      if(input==='') alert('Add a valid task')
      await addDoc(collection(db, "todos"), {
        text: input,
        completed: false,
      });
      setInput("");
    }

  return (
    <div className='todo-container'>
        <h3>Easily manage your daily tasks on the go</h3>
        <form className='todo-form' onSubmit={addTask}>
        <TextField fullWidth label="Add a new task" placeholder="What's on your mind?" variant="standard" value={input} onChange={(e)=>{setInput(e.target.value)}} autoComplete='off'/>
        <button className='todo-btn' variant='outlined'><AddIcon size={30}/></button>
        </form>
    </div>
  )
}

export default Todo