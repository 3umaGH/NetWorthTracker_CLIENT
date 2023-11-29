import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TableActions } from "./TableActions";
import { formatCurrency } from "../../util";
import { useTheme } from "@emotion/react";
import { RootState } from "../../app/Store";
import { useSelector } from "react-redux";


export const AssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const theme = useTheme();

  const getColor = (inputNum: number) => {
    if (inputNum === null || inputNum === undefined) return "black";

    if (inputNum > 0) return theme.palette.positiveColor.main;
    else if (inputNum < 0) return theme.palette.negativeColor.main;
  };


  const rows = assets.assets.map((row) => ({
    ...row,
    change: row.price - row.lastPrice,
    totalPrice: row.price * row.amount,
  }));

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
            {`${value.toFixed(8)} ${params.row.ticker}`}
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
            {`${formatCurrency(value, "USD")} (${formatCurrency(
              params.row.change,
              "USD",
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
            {`${formatCurrency(value, "USD")} (${formatCurrency(
              params.row.change * params.row.amount,
              "USD",
              0
            )})`}
          </Box>
        );
      case "actions":
        return <TableActions />;
      default:
        return value;
    }
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns.map((column) => ({
        ...column,
        renderCell: cellRenderer,
      }))}
      hideFooter={true}
      disableRowSelectionOnClick
      density={"compact"}
    />
  );
};
