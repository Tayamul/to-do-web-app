import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Signup = () => {
  const paperStyle = { width: 300, margin: "120px auto", padding: "35px 20px" };
  const textStyle = { mt: 2 };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const signup = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "users", username.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("Username already taken!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      await Promise.all([
        setDoc(doc(db, "users", username.toLowerCase()), {
          UserId: userId,
        }),
        setDoc(doc(db, "users-data", userId), {
          Username: username,
          Email: email,
          UserId: userId,
        }),
      ]);
      alert("Sign up successful");
    } catch (err) {
      alert("Email already exists!");
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

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
            <Button variant="contained" sx={textStyle} fullWidth type="submit">
              Sign up
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Signup;
