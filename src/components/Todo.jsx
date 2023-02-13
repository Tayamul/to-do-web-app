import React from 'react'
import './todo.css'
import {db} from '../firebaseConfig'
import { collection, getDoc } from 'firebase/firestore'
import { Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const Todo = () => {

    // Create data in firebase
    


  return (
    <div className='todo-container'>
        <h3>Easily manage your daily tasks on the go</h3>
        <form className='todo-form'>
        <TextField fullWidth label="Add a new task" variant="standard"/>
        <button className='todo-btn' variant='outlined'><AddIcon/></button>
        </form>
    </div>
  )
}

export default Todo