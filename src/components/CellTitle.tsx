import { Box, Typography, Divider } from "@mui/material";

export const CellTitle = ({ title }: { title: string }) => {
  return (
    <Box textAlign={"center"}>
      <Divider />
      <Typography variant="button" color={"primary"} fontSize={20}>
        {title}
      </Typography>
      <Divider />
    </Box>
  );
};
