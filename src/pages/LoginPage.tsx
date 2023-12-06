import { Button, Divider, Paper, Typography } from "@mui/material";

import { FirebaseAuth, GoogleProvider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [isUserUpdated, setUserUpdated] = useState(false);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(FirebaseAuth, GoogleProvider);
      setUserUpdated(!isUserUpdated);
    } catch (err) {
      console.error(err);
    }
  };

  FirebaseAuth.onAuthStateChanged(() => {
    setUserUpdated(!isUserUpdated);
  });

  useEffect(() => {
    FirebaseAuth.currentUser ? navigate("/main") : null;
  }, [isUserUpdated]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontWeight: 400, fontSize: { xs: 56, md: 130 } }}
      >
        {import.meta.env.VITE_APP_PROJECT_NAME}
      </Typography>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          borderRadius: "25px",
          maxWidth: "300px",
          mb: 20,
          mt: 4,
          mx: 2,
        }}
        elevation={8}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Login to{" "}
          <span style={{ color: "#3f91cc" }}>
            {import.meta.env.VITE_APP_PROJECT_NAME}
          </span>
        </Typography>

        <Button onClick={() => signInWithGoogle()} variant="contained">
          Sign in with Google
        </Button>

        <Divider sx={{ width: "60%", my: 2 }} />

        <Typography align="center" variant="caption" color="textColor.main">
          Manage your net worth with real-time updates on stocks and crypto.
          Gain insights into your wealth like never before.
        </Typography>
      </Paper>
    </div>
  );
};
