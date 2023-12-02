import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { formatCurrency } from "../../util";
import { useTheme } from "@emotion/react";
import { RootState } from "../../app/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store";
import { deleteAsset, updateAsset } from "../../features/assets/assetsSlice";
import BasicModal from "../modals/BasicModal";
import { useState } from "react";
import { AddAsset } from "../modals/AddAsset";
import { availableCurrencies } from "../../constants";

export const AssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const [addIsOpen, setAddIsOpen] = useState(false);

  const getColor = (inputNum: number) => {
    if (inputNum === null || inputNum === undefined) return "black";

    if (inputNum > 0) return theme.palette.positiveColor.main;
    else if (inputNum < 0) return theme.palette.negativeColor.main;
  };

  const rows = assets.assets;

  const columns: GridColDef[] = [
    {
      field: "note",
      headerName: "Note",
      editable: true,
      flex: 0.375,
    },
    {
      field: "ticker",
      headerName: "Ticker",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      editable: true,
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Last Price",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.07,

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
          onClick={() => dispatch(deleteAsset(row))}
        >
          X
        </Button>
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
      case "ticker":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "700",
            }}
          >
            {value}
          </Box>
        );
      case "type":
        return (
          <Box
            sx={{
              color:
                value === "Crypto"
                  ? theme.palette.cryptoColor.main
                  : theme.palette.stockColor.main,
              fontWeight: "600",
            }}
          >
            {value}
          </Box>
        );
      case "amount":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "200",
            }}
          >
            {`${value.toFixed(params.row.type === "Crypto" ? 4 : 0)} ${
              params.row.ticker
            }`}
          </Box>
        );

      case "price":
        return (
          <Box
            sx={{
              color: getColor(params.row.change),
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, params.row.currency)} (${formatCurrency(
              params.row.change ?? 0,
              params.row.currency,
              0
            )})`}
          </Box>
        );
      case "totalPrice":
        return (
          <Box
            sx={{
              color: getColor(params.row.change * value),
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, params.row.currency)} (${formatCurrency(
              params.row.change ?? 0 * params.row.amount,
              params.row.currency,
              0
            )})`}
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
        <BasicModal
          onClose={() => setAddIsOpen(false)}
          sx={{ minWidth: "260px", maxWidth: "500px" }}
        >
          <AddAsset
            availableCryptoPairs={Object.values(assets.cryptoPrices)
              .filter((pair) => pair.symbol.endsWith("USDT"))
              .map((pair) => pair.symbol)}
            availableStocksPairs={assets.stockPrices.map(
              (ticker) => ticker.ticker
            )}
            availableCurrencies={availableCurrencies}
            onClose={() => setAddIsOpen(false)}
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

          if (updatedRow.amount <= 0 || updatedRow.amount >= 1000000000)
            return originalRow;

          dispatch(updateAsset(updatedRow));
          return updatedRow;
        }}
        onProcessRowUpdateError={(e) => console.log(e)}
      />
    </>
  );
};
