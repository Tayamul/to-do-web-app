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
import PasswordStrengthIndicator from './PasswordStrengthIndicator'
import './passwordStrengthIndicator.css'

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const Signup = () => {
  const paperStyle = {
    width: 300,
    margin: "120px auto",
    padding: "35px 20px",
  };
  const textStyle = { mt: 2 };
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // password validation
  const[passwordFoucsed, setPasswordFocused] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null
  })

  const onChangePassword = (password) => {
    setPassword(password)

    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false,
    })
  }

  const signup = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "users", username.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("Username already taken! Try another one.");
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
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: `https://api.multiavatar.com/Binx${username}.svg`,
        }),
        setDoc(doc(db, "users-data", userId), {
          Username: username,
          Email: email,
          UserId: userId,
        }),
      ]);
      alert("Sign up successful");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (err) {
      alert("Email already exists!");
    }
  };

  return (
    <div className="signup-container">
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
              color= {username.length > 0 && "success"}
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
              color={email.length > 10 && "success"}
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
              color={
                passwordValidity.minChar === true &&
                passwordValidity.number === true &&
                passwordValidity.specialChar === true
                  ? "success"
                  : "error"
              }
              sx={textStyle}
              fullWidth
              autoComplete="off"
              required
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
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
            {passwordFoucsed && (
              <PasswordStrengthIndicator validity={passwordValidity} />
            )}
            <TextField
              label="Confirm Password"
              id="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              color={password === confirmPassword ? "success" : "error"}
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
            {password === confirmPassword && 
            passwordValidity.minChar === true &&
            passwordValidity.number === true &&
            passwordValidity.specialChar === true ? (
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
            Already have an account? <Link to="/login" style={{color: "#1976d2", textDecoration:"none", fontWeight:"bold"}}>Log in</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
    </div>
  );
};

export default Signup;
