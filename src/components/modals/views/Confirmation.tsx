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
      sx={{ maxWidth: "max-content", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5">{title}</Typography>
      <Typography variant="caption" sx={{ mt: 0.5 }}>
        {subtitle}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", flexDirection: "row-reverse" }}>
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
