import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const paperStyle = {
    width: 265,
    margin: "120px auto",
    padding: "35px 20px",
  };
  const textStyle = { mt: 2 };
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const signup = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "users", username.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("Username already taken!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        setDoc(doc(db, "users", username.toLowerCase()), {
          UserId: userId,
        });

        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: `https://api.multiavatar.com/Binx${username}.svg`,
        });

        setDoc(doc(db, `users-data`, userId), {
          Username: username,
          Email: email,
          UserId: userId,
        });

        alert("Sign up successful!");
        navigate("/");
      })
      .catch((err) => alert("Email already exists!"));

    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   const userId = userCredential.user.uid;

    //   await Promise.all([
    //     setDoc(doc(db, "users", username.toLowerCase()), {
    //       UserId: userId,
    //     }),
    //     updateProfile(auth.currentUser, {
    //       displayName: username,
    //       photoURL: `https://api.multiavatar.com/Binx${username}.svg`
    //     }),
    //     setDoc(doc(db, "users-data", userId), {
    //       Username: username,
    //       Email: email,
    //       UserId: userId,
    //     }),

    //   ]);
    //   alert("Sign up successful");
    // } catch (err) {
    //   alert("Email already exists!");
    // }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Grid>
      <Paper
        elevation={10}
        sx={paperStyle}
      >
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
              type={passwordVisible ? "text" : "password"}
              sx={textStyle}
              fullWidth
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password"
                      edge="end"
                      onClick={togglePassword}
                    >
                      {passwordVisible ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              id="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              sx={textStyle}
              fullWidth
              autoComplete="off"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm-password"
                      edge="end"
                      onClick={toggleConfirmPassword}
                    >
                      {confirmPasswordVisible ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {password === confirmPassword ? (
              <Button
                variant="contained"
                sx={textStyle}
                fullWidth
                type="submit"
              >
                Sign up
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={textStyle}
                fullWidth
                type="submit"
                disabled
              >
                Sign up
              </Button>
            )}
          </form>
          <Typography variant="caption" sx={{ pt: 10 }}>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Signup;
