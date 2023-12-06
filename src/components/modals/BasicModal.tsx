import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CSSProperties } from "@mui/material/styles/createTypography";

export default function BasicModal({
  children,
  onClose,
  sx,
}: {
  children: React.ReactElement;
  onClose: () => void;
  sx?: CSSProperties;
}) {
  const style: CSSProperties = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: "24",
    p: 4,
    width: "100%",
    ...sx,
  };

  return (
    <Modal onClose={onClose} open={true}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
