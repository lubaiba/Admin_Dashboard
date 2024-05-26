"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { ProductService } from "../../services/product-service";
import { useDispatch } from "react-redux";
import { loginUser, setisLoggedIn } from "@/app/loginpage/login-slice";
const LoginForm = () => {
  const dispatch=useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = ($e: any) => setEmail($e.target.value);
  const handlePasswordChange = ($e: any) => setPassword($e.target.value);

  const handleSubmit = async ($e: any) => {
    $e.preventDefault();
    try{
      const response=await ProductService.userLogin(email,password);
      if (response) {
        localStorage.setItem("token", response.token);
        dispatch(setisLoggedIn(response.user));
        router.push("/dashboard"); 
      } else {
        console.log("login failed");
      }
    } catch (error) {
      console.log("login failed:", error);
    }
  };
  return (
    <Grid container>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href="#">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
