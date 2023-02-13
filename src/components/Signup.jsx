import React from 'react'
import {auth} from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Grid, Paper, Typography } from '@mui/material'

const Signup = () => {
    
  return (
    <Grid>
      <Paper elevation={10}>
        <Grid align='center'>
          <Typography variant='h5'>Sign up!</Typography>
          <Typography variant='caption'>Create an account.</Typography>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Signup