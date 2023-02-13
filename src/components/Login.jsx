import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebaseConfig'

const Login = () => {

    const paperStyle = {width:300, margin:"120px auto", padding:"35px 20px"}
    const textStyle = {mt:2}

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const login = () => {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
        })
        .catch(err => alert('Incorrect email or password'))
    }

  return (
    <Grid>
        <Paper elevation={10} sx={paperStyle}>
            <Grid align='center'>
                <Typography variant='h5'>
                    Log in
                </Typography>
                <Typography variant='caption'>
                    Don't have an account? Sign up
                </Typography>
                <form>
                    <TextField
                    label='Email'
                    id='email'
                    type='email'
                    fullWidth
                    sx={textStyle}
                    value={loginEmail}
                    onChange={(e)=>{setLoginEmail(e.target.value)}}
                    autoComplete='off'
                    />
                     <TextField
                    label='Password'
                    id='password'
                    type='password'
                    fullWidth
                    sx={textStyle}
                    value={loginPassword}
                    onChange={(e)=>{setLoginPassword(e.target.value)}}
                    autoComplete='off'
                    />
                    <Button
                    variant='contained'
                    sx={textStyle}
                    fullWidth
                    onClick={login}
                    >
                        Log in
                    </Button>
                </form>
            </Grid>
        </Paper>
    </Grid>
  )
}

export default Login