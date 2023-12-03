import { Box, Button } from "@mui/material";
import { AppDispatch } from "../app/Store";
import { useDispatch } from "react-redux";
import {
  toggleThemeMode,
  toggleDiscreetMode,
} from "../features/userParams/userParamsSlice";
export const ButtonToolbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap:8 }}
    >
      <Button onClick={() => dispatch(toggleThemeMode())}>Toggle Theme</Button>
      <Button onClick={() => dispatch(toggleDiscreetMode())}>
        Discreet Mode
      </Button>
    </Box>
  );
};
