import { Box, Button } from "@mui/material";
import { AppDispatch } from "../app/Store";
import { useDispatch } from "react-redux";
import {
  toggleThemeMode,
  toggleDiscreetMode,
} from "../features/userParams/userParamsSlice";
import { saveUserConfig } from "../features/userParams/thunks";
export const ButtonToolbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Button
        onClick={() => {
          dispatch(toggleThemeMode());
          dispatch(saveUserConfig());
        }}
      >
        Toggle Theme
      </Button>
      <Button
        onClick={() => {
          dispatch(toggleDiscreetMode());
          dispatch(saveUserConfig());
        }}
      >
        Discreet Mode
      </Button>
    </Box>
  );
};
