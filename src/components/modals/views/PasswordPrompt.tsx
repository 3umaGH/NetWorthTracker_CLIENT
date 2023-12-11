import { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/Store";
import { encryptionPasswordProps } from "../../../constants";
import { updateEncryptionKey } from "../../../features/userParams/userParamsSlice";
import { fetchUserData } from "../../../features/assets/thunks";

export const PasswordPrompt = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [key, setKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateEncryptionKey(key));
    dispatch(fetchUserData()).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        if ("error" in result) setErrorMessage(result.error.message as string);
      } else onClose();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" align="center">
          Your portfolio is encrypted!
        </Typography>

        <Typography variant="caption" align="center">
          Enter key to access it.
        </Typography>

        <TextField
          autoFocus
          label="Encryption Key"
          type="password"
          inputProps={encryptionPasswordProps}
          onChange={(e) => setKey(e.currentTarget.value)}
          sx={{ mt: 4 }}
        ></TextField>

        {errorMessage ? (
          <Typography
            color="error"
            variant="subtitle2"
            align="center"
            sx={{ mt: 2 }}
          >
            {errorMessage}
          </Typography>
        ) : null}

        <Button type="submit" variant="outlined" color="success" sx={{ mt: 4 }}>
          Decrypt
        </Button>
      </Box>
    </form>
  );
};
