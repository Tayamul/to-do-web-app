import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {setDoc, doc} from 'firebase/firestore'
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Signup = () => {
  const paperStyle = { width: 300, margin: "60px auto", padding: "35px 20px" };
  const textStyle = { mt: 2 };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
      const userId = userCredential.user.uid
      setDoc(doc(db, 'users', username), {
        Username: username,
        Email: email,
        Password: password,
        UserId: userId
      })
      alert('Sign up successful')
    })
    .catch(err => alert(err.message))

    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          <Avatar />
          <Typography variant="h5">Sign up!</Typography>
          <Typography variant="caption">Create an account.</Typography>
          <form onSubmit={signup}>
            <TextField
              label="Username"
              id="username"
              type="text"
              sx={textStyle}
              fullWidth
              autoComplete="off"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              id="email"
              type="email"
              sx={textStyle}
              fullWidth
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              id="password"
              type="password"
              sx={textStyle}
              fullWidth
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              sx={textStyle}
              fullWidth
              autoComplete="off"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant="contained" sx={textStyle} fullWidth type='submit'>
              Sign up
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Signup;
