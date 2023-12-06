import { useTheme } from "@emotion/react";
import { Box, Typography, Divider } from "@mui/material";

export const CellTitle = ({ title }: { title: string }) => {
  const theme = useTheme();

  return (
    <Box textAlign={"center"}>
      <Divider />
      <Typography
        variant="button"
        color={theme.palette.textColor.main}
        fontSize={20}
      >
        {title}
      </Typography>
      <Divider />
    </Box>
  );
};
