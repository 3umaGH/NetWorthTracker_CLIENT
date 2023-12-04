import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

export const DataGridToolBar = () => {
  return (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "center" }}>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
};
