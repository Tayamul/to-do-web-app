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
        <form>
        <TextField id="standard-basic" label="Add a new task" variant="standard" />
        <Button ><AddIcon/></Button>
        </form>
    </div>
  )
}

export default Todo