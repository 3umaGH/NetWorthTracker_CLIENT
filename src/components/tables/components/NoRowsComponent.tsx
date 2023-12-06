import { Box, Button, Typography } from "@mui/material";

export const NoRowsComponent = ({
  text,
  buttonText,
  buttonOnClick,
}: {
  text: string;
  buttonText: string;
  buttonOnClick: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="body1">{text}</Typography>
      <Button
        variant="text"
        color="success"
        sx={{ fontSize: 18, p: 0, m: 0 }}
        onClick={buttonOnClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
