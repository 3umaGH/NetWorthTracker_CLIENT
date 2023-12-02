import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { formatCurrency } from "../../util";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store";
import {
  deleteFiatAsset,
  updateFiatAsset,
} from "../../features/assets/assetsSlice";
import { useState } from "react";
import BasicModal from "../modals/BasicModal";
import { AddFiatAsset } from "../modals/AddFiatAsset";

export const FiatAssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const [addIsOpen, setAddIsOpen] = useState(false);

  const rows = assets.fiatAssets;

  const availableCurrencies = ["USD", "EUR"]; // TODO: make dynamic

  const columns: GridColDef[] = [
    {
      field: "note",
      headerName: "Note",
      editable: true,
      flex: 0.35,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      editable: true,
      flex: 0.2,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "currency",
      headerName: "Currency",
      editable: true,
      type: "singleSelect",
      valueOptions: availableCurrencies,
      flex: 0.2,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,

      align: "center",
      headerAlign: "center",
    },
  ];

  const TableActions = ({
    row,
  }: {
    row: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  }) => {
    return (
      <Box sx={{ "& button": { m: 0, p: 0, minWidth: "30px" } }}>
        <>
          <Button
            variant="text"
            color="success"
            sx={{ fontSize: 22 }}
            onClick={() => setAddIsOpen(true)}
          >
            +
          </Button>

          <Button
            variant="text"
            color="error"
            sx={{ fontSize: 18 }}
            onClick={() => dispatch(deleteFiatAsset(row))}
          >
            X
          </Button>
        </>
      </Box>
    );
  };

  const cellRenderer = (params: GridRenderCellParams) => {
    const { field, value } = params;

    switch (field) {
      case "note":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "200",
            }}
          >
            {value}
          </Box>
        );
      case "amount":
        return (
          <Box
            sx={{
              color: theme.palette.fiatColor.main,
              fontWeight: "500",
            }}
          >
            {formatCurrency(value, params.row.currency)}
          </Box>
        );
      case "currency":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "500",
            }}
          >
            {value}
          </Box>
        );
      case "actions":
        return <TableActions row={params.row} />;
      default:
        return value;
    }
  };

  const NoRowsComponent = () => {
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
        <Typography variant="body1">No assets here yet...</Typography>
        <Button
          variant="text"
          color="success"
          sx={{ fontSize: 18, p: 0, m: 0 }}
          onClick={() => setAddIsOpen(true)}
        >
          Add Asset
        </Button>
      </Box>
    );
  };

  return (
    <>
      {addIsOpen && (
        <BasicModal onClose={() => setAddIsOpen(false)} sx={{minWidth:"260px", maxWidth:"500px"}}>
          <AddFiatAsset
            onClose={() => setAddIsOpen(false)}
            availableCurrencies={availableCurrencies}
          />
        </BasicModal>
      )}
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: cellRenderer,
        }))}
        hideFooter={true}
        disableRowSelectionOnClick
        density={"compact"}
        slots={{
          noRowsOverlay: NoRowsComponent,
        }}
        processRowUpdate={(updatedRow, originalRow) => {
          if (updatedRow.note.length > 100) {
            alert("Maximum 100 symbols!");
            return originalRow;
          }

          if (updatedRow.amount >= 1000000000) return originalRow;

          dispatch(updateFiatAsset(updatedRow));
          return updatedRow;
        }}
        onProcessRowUpdateError={(e) => console.log(e)}
      />
    </>
  );
};
