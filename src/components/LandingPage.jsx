import { Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import './landingPage.css'

const LandingPage = () => {
    const paperStyle = {padding:"20px 20px", margin:"30px 30px"}
  return (
    <Container fixed maxWidth="sm" sx={{margin:"120px auto"}}>
        <Paper elevation={0} sx={paperStyle} align='center'>
            <Typography variant='h6'>A simple web-app allowing you to plan your day according to your needs. Jot down your plans in a list and cross them out once its completed.</Typography>
            <Typography variant='caption'>Advise: Break down your plans into seprate easy-to-tackle tasks, and then attack it!</Typography>
        </Paper>
    </Container>
  )
}

export default LandingPage