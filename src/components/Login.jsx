import { Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebaseConfig'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import './login.css'

const Login = () => {

    const paperStyle = {width: 240, margin: "120px auto 0 70px", padding:"35px 20px"}
    const textStyle = {mt:2}

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const navigate = useNavigate()

    const login = () => {
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user
            alert('Successfully Logged in!')
            navigate('/')
        })
        .catch(err => alert('Incorrect email or password'))
    }

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

  return (
    <section className='login-container'>
        <p className='login-text'>Log in</p>
        <p className='login-text2'>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        <form className='login-form'>
            <label htmlFor='email'>Email</label>
            <input 
            type="email"
            id="email" 
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            autoComplete='off'
            required
            />
            <label htmlFor='password'>Password</label>
            <input 
            type={passwordVisible ? "password" : "text"}
            id="password" 
            value={loginPassword}
            onChange={(e)=> setLoginPassword(e.target.value)}
            autoComplete='off'
            required
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label='toggle password' edge="end" onClick={togglePassword}>
                            {passwordVisible ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            />
            <button
            className='login-btn'
            onClick={login}>
                Log in
            </button>
        </form>
    </section>
    /*
    <Grid>
        <Paper elevation={10} sx={paperStyle} >
            <Grid align='center'>
                <Typography variant='h5'>
                    Log in
                </Typography>
                <Typography variant='caption'>
                    Don't have an account? <Link to='/signup'>Sign up</Link>
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
                    required
                    />
                     <TextField
                    label='Password'
                    id='password'
                    type={passwordVisible ? "type" : "password"}
                    fullWidth
                    sx={textStyle}
                    value={loginPassword}
                    onChange={(e)=>{setLoginPassword(e.target.value)}}
                    autoComplete='off'
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label='toggle password' edge="end" onClick={togglePassword}>
                                    {passwordVisible ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
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
    */
  )
}

export default Login