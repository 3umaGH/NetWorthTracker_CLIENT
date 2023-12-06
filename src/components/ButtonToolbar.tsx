import { Box, Button, Tooltip } from "@mui/material";
import { AppDispatch, RootState } from "../app/Store";
import { useDispatch, useSelector } from "react-redux";
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
import { FirebaseAuth } from "../firebase/firebase";
import { setSecondaryCurrency } from "../features/assets/assetsSlice";
import { saveUserData, updateNumbers, updateTotals } from "../features/assets/thunks";

export const ButtonToolbar = () => {
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 2,
      }}
    >
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
          {userParams.isLightTheme ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </Tooltip>

      <Tooltip
        title={`Turn ${userParams.discreetMode ? "on" : "off"} discreet mode`}
      >
        <Button
          color="textColor"
          onClick={() => {
            dispatch(toggleDiscreetMode());
            dispatch(saveUserConfig());
          }}
        >
          {userParams.discreetMode ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </Button>
      </Tooltip>

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
  );
};
