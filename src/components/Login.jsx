import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Login = () => {

    const paperStyle = {width:300, margin:"120px auto", padding:"35px 20px"}
    const textStyle = {mt:2}
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
                    />
                     <TextField
                    label='Password'
                    id='password'
                    type='password'
                    fullWidth
                    sx={textStyle}
                    />
                    <Button
                    type='submit'
                    variant='contained'
                    sx={textStyle}
                    fullWidth
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