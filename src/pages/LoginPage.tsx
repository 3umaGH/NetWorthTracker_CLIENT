// Material-UI (MUI) related imports
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
      <img
        src="https://www.goomlandscapes.co.nz/wp-content/uploads/2018/08/logo-placeholder.png"
        style={{ width: "100%", maxWidth: "600px" }}
      />

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
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          VoluptatibusLorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatibus
        </Typography>
      </Paper>
    </div>
  );
};
