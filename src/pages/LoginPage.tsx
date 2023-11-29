import { Button, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const LoginPage = () => {
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
        src="https://image-placeholder.com/images/image-placeholder.png"
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

        <Button component={Link} to={"/main"} variant="contained">
          Sign in with Google
        </Button>

        <Divider sx={{ width: "60%", my: 2 }} />

        <Typography align="center" variant="caption">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          VoluptatibusLorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatibus
        </Typography>
      </Paper>
    </div>
  );
};
