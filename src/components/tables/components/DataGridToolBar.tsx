import { GridToolbarContainer,GridToolbarColumnsButton,GridToolbarExport } from "@mui/x-data-grid"


export const DataGridToolBar = () => {
  return (
    <GridToolbarContainer sx={{display:"flex", justifyContent:"center"}}>
    <GridToolbarColumnsButton />
    <GridToolbarExport />
  </GridToolbarContainer>
  )
}
