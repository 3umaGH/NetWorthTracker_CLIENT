import { Box, Button, Typography } from "@mui/material";

export const Confirmation = ({
  title,
  subtitle,
  onConfirm,
  onCancel,
  onClose,
}: {
  title: string;
  subtitle: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}) => {
  return (
    <Box
      sx={{
        maxWidth: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        {title}
      </Typography>
      <Typography variant="caption" align="center" sx={{ mt: -2 }}>
        {subtitle}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            onConfirm();
            if (onClose) onClose();
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            if (onCancel) onCancel();
            if (onClose) onClose();
          }}
          color="error"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
