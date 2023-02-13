import React from 'react'
import {auth} from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'

const Signup = () => {
    const paperStyle={width: 300, margin:"60px auto", padding:"35px 20px"}
    const textStyle={mt:2}
  return (
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align='center'>
          <Avatar/>
          <Typography variant='h5'>Sign up!</Typography>
          <Typography variant='caption'>Create an account.</Typography>
          <TextField
          label='Username'
          id='username'
          type='text'
          sx={textStyle}
          fullWidth
          autoComplete='off'
          required
          />
          <TextField
          label='Email'
          id='email'
          type='email'
          sx={textStyle}
          fullWidth
          autoComplete='off'
          required
          />
          <TextField
          label='Password'
          id='password'
          type='password'
          sx={textStyle}
          fullWidth
          autoComplete='off'
          required
          />
          <TextField
          label='Confirm Password'
          id='confirmPassword'
          type='password'
          sx={textStyle}
          fullWidth
          autoComplete='off'
          required
          />
          <Button
          variant='contained'
          sx={textStyle}
          fullWidth>
            Sign up
          </Button>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Signup