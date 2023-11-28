import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TableActions } from "./TableActions";
import { formatCurrency, getColor } from "../../util";
import { positiveColor } from "../../constants";

export const AssetsTable = () => {
  const rows = [
    {
      id: 1,
      note: "Bitcoin Investment",
      ticker: "BTC",
      type: "Crypto",
      amount: 100,
      lastPrice: 100000,
      change: -10,
      totalPrice: 10000000,
    },
    {
      id: 2,
      note: "Amazon Inc.",
      ticker: "AMZN",
      type: "Stock",
      amount: 500,
      lastPrice: 5500.75,
      change: 20,
      totalPrice: 2750375,
    },
    {
      id: 3,
      note: "Ethereum Holdings",
      ticker: "ETH",
      type: "Crypto",
      amount: 300,
      lastPrice: 4800,
      change: 15,
      totalPrice: 1440000,
    },
    {
      id: 4,
      note: "Microsoft Corporation",
      ticker: "MSFT",
      type: "Stock",
      amount: 1000,
      lastPrice: 400.5,
      change: -8,
      totalPrice: 400500,
    },
    {
      id: 5,
      note: "Litecoin Investment",
      ticker: "LTC",
      type: "Crypto",
      amount: 500,
      lastPrice: 450,
      change: 30,
      totalPrice: 225000,
    },
    {
      id: 6,
      note: "Google Alphabet Inc.",
      ticker: "GOOGL",
      type: "Stock",
      amount: 200,
      lastPrice: 4200.25,
      change: 25,
      totalPrice: 840050,
    },
    {
      id: 7,
      note: "Ripple XRP Holdings",
      ticker: "XRP",
      type: "Crypto",
      amount: 1000,
      lastPrice: 5.75,
      change: 35,
      totalPrice: 5750,
    },
    {
      id: 8,
      note: "Facebook Inc.",
      ticker: "FB",
      type: "Stock",
      amount: 300,
      lastPrice: 600.5,
      change: 30,
      totalPrice: 180150,
    },
    {
      id: 9,
      note: "Cardano ADA Investment",
      ticker: "ADA",
      type: "Crypto",
      amount: 800,
      lastPrice: 9.5,
      change: -5,
      totalPrice: 7600,
    },
    {
      id: 10,
      note: "Tesla Inc.",
      ticker: "TSLA",
      type: "Stock",
      amount: 150,
      lastPrice: 2000.75,
      change: 40,
      totalPrice: 300112.5,
    },
  ];

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
      field: "lastPrice",
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
              color: "#575757",
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
              color: "#575757",
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
              color: value === "Crypto" ? "#f0851a" : "#3958e3",
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
              color: "#575757",
              fontWeight: "200",
            }}
          >
            {`${value.toFixed(8)} ${params.row.ticker}`}
          </Box>
        );

      case "lastPrice":
        return (
          <Box
            sx={{
              color: getColor(params.row.change),
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, "USD")} (${formatCurrency(
              params.row.change * value,
              "USD",
              0
            )})`}
          </Box>
        );
      case "totalPrice":
        return (
          <Box
            sx={{
              color: positiveColor,
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, "USD")}`}
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
