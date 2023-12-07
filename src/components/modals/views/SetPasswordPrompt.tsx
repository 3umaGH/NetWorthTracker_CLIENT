import { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import BasicModal from "../BasicModal";
import { encryptionPasswordProps } from "../../../constants";
import {
  removeEncryption,
  setupEncryptionKey,
} from "../../../features/userParams/userParamsSlice";
import { saveUserConfig } from "../../../features/userParams/thunks";
import { saveUserData } from "../../../features/assets/thunks";

export const SetPasswordPrompt = ({ onClose }: { onClose: () => void }) => {
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    encryption_key: "",
    encryption_key_confirm: "",
    encryption_key_confirm_prompt: "",

    encryption_key_current: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  useEffect(() => {
    setErrorMessage("");

    if (
      formData.encryption_key_confirm &&
      formData.encryption_key !== formData.encryption_key_confirm
    )
      setErrorMessage("Passwords do not match.");

    if (
      formData.encryption_key_confirm_prompt &&
      formData.encryption_key !== formData.encryption_key_confirm_prompt
    )
      setErrorMessage("Passwords do not match.");

    if (
      userParams.useCustomEncryption &&
      formData.encryption_key_current !== userParams.encryptionKey
    )
      setErrorMessage("Current key is invalid.");
  }, [
    formData.encryption_key,
    formData.encryption_key_current,
    formData.encryption_key_confirm,
    formData.encryption_key_confirm_prompt,
  ]);

  const handleInitialFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errorMessage) return;

    setConfirmationVisible(true);
  };

  const handleConfirmationFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (errorMessage) return;

    onClose();

    await dispatch(setupEncryptionKey(formData.encryption_key));
    await dispatch(saveUserConfig());
    await dispatch(saveUserData());
  };

  return (
    <form onSubmit={handleInitialFormSubmit}>
      <Box
        sx={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" align="center">
          {userParams.useCustomEncryption ? "Change" : "Set up"} Encryption Key
        </Typography>

        <Typography
          variant="subtitle2"
          color="warning.main"
          align="center"
          sx={{ mt: 1 }}
        >
          Warning! If your forget this password, your portfolio data will be
          completely lost!
        </Typography>

        {userParams.useCustomEncryption && (
          <>
            <TextField
              required
              error={
                !!formData.encryption_key_current &&
                formData.encryption_key_current !== userParams.encryptionKey
              }
              label="Current Key"
              id="encryption_key_current"
              onChange={handleChange}
              type="password"
              inputProps={encryptionPasswordProps}
              sx={{ mt: 4 }}
            />

            {errorMessage ? (
              <Typography
                color="error"
                variant="caption"
                align="center"
                sx={{ mt: 1 }}
              >
                {errorMessage}
              </Typography>
            ) : null}

            <Button
              variant="outlined"
              color="warning"
              sx={{ mt: 2, mb: 4 }}
              onClick={() => {
                if (
                  userParams.encryptionKey === formData.encryption_key_current
                ) {
                  dispatch(removeEncryption());
                  dispatch(saveUserConfig());
                  dispatch(saveUserData());

                  onClose();
                }
              }}
            >
              Decrypt Forever
            </Button>

            <Divider />
          </>
        )}

        <TextField
          required
          label={
            userParams.useCustomEncryption
              ? "New Encryption Key"
              : "Encryption Key"
          }
          id="encryption_key"
          onChange={handleChange}
          type="password"
          inputProps={encryptionPasswordProps}
          sx={{ mt: 4 }}
        ></TextField>
        <TextField
          required
          error={
            formData.encryption_key_confirm
              ? formData.encryption_key !== formData.encryption_key_confirm
              : false
          }
          label="Confirm Key"
          id="encryption_key_confirm"
          onChange={handleChange}
          type="password"
          inputProps={encryptionPasswordProps}
          sx={{ mt: 4 }}
        ></TextField>

        {errorMessage ? (
          <Typography
            color="error"
            variant="caption"
            align="center"
            sx={{ mt: 1 }}
          >
            {errorMessage}
          </Typography>
        ) : null}

        <Button type="submit" variant="outlined" color="error" sx={{ mt: 2 }}>
          {userParams.useCustomEncryption ? "Change Encryption Key" : "Encrypt"}
        </Button>

        {confirmationVisible && (
          <BasicModal
            onClose={() => setConfirmationVisible(!confirmationVisible)}
            sx={{ minWidth: "260px", maxWidth: "400px" }}
          >
            <form onSubmit={handleConfirmationFormSubmit}>
              <Box
                sx={{
                  width: "100%",

                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="error.dark"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  Warning! If your forget this password, your portfolio will be
                  unable to be recovered!
                </Typography>

                <TextField
                  required
                  error={
                    formData.encryption_key_confirm_prompt
                      ? formData.encryption_key !==
                        formData.encryption_key_confirm_prompt
                      : false
                  }
                  label="Confirm Key"
                  id="encryption_key_confirm_prompt"
                  onChange={handleChange}
                  type="password"
                  inputProps={encryptionPasswordProps}
                  sx={{ mt: 4 }}
                ></TextField>

                {errorMessage ? (
                  <Typography
                    color="error"
                    variant="caption"
                    align="center"
                    sx={{ mt: 1 }}
                  >
                    {errorMessage}
                  </Typography>
                ) : null}

                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ mt: 4 }}
                >
                  Yes, continue.
                </Button>
              </Box>
            </form>
          </BasicModal>
        )}
      </Box>
    </form>
  );
};
