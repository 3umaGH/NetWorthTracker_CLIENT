import { Box, Button } from "@mui/material";

export const TableActions = () => {
  return (
    <Box sx={{ "& button": { m: 0, p: 0, minWidth: "30px" } }}>
      <Button variant="text" color="primary" sx={{ fontSize: 18, p: 0, m: 0 }}>
        ✓
      </Button>
      <Button variant="text" color="error" sx={{ fontSize: 18 }}>
        X
      </Button>
    </Box>
  );
};
