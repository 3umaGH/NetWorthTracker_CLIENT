import { Box, Button, Tooltip } from "@mui/material";
import { AppDispatch, RootState } from "../app/Store";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import {
  toggleThemeMode,
  toggleDiscreetMode,
} from "../features/userParams/userParamsSlice";
import { saveUserConfig } from "../features/userParams/thunks";
import { signOut } from "firebase/auth";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FirebaseAuth } from "../firebase/firebase";

export const ButtonToolbar = ({
  handleCurrencySelectorOpen,
}: {
  handleCurrencySelectorOpen: () => void;
}) => {
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,

        border: "2px ridge",
        borderRadius: "10px",
        borderColor: theme.palette.textColor.light + "4D",
      }}
    >
      <Box>
        <Tooltip
          title={`Switch to ${userParams.isLightTheme ? "dark" : "light"} mode`}
        >
          <Button
            color="textColor"
            onClick={() => {
              dispatch(toggleThemeMode());
              dispatch(saveUserConfig());
            }}
          >
            {userParams.isLightTheme ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
        </Tooltip>

        <Tooltip
          title={`Turn ${userParams.discreetMode ? "off" : "on"} discreet mode`}
        >
          <Button
            color="textColor"
            onClick={() => {
              dispatch(toggleDiscreetMode());
              dispatch(saveUserConfig());
            }}
          >
            {userParams.discreetMode ? (
              <VisibilityOffIcon />
            ) : (
              <VisibilityIcon />
            )}
          </Button>
        </Tooltip>

        <Tooltip title={`Change preferred secondary currency`}>
          <Button
            color="textColor"
            onClick={() => {
              handleCurrencySelectorOpen();
            }}
          >
            <AttachMoneyIcon fontSize="medium" />
          </Button>
        </Tooltip>
      </Box>

      <Box sx={{ position: "absolute", right: "0px" }}>
        <Tooltip title="Logout">
          <Button
            color="textColor"
            onClick={async () => {
              await signOut(FirebaseAuth);
            }}
          >
            <LogoutIcon />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
