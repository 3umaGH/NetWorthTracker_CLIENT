import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { currencySymbol } from "../../constants";
import {
  formatBTC,
  formatCurrency,
  formatTimeMillis,
  getColor,
} from "../../util";
import { TableActions } from "./TableActions";

export const NetWorthSnapshotTable = () => {
  const rows = [
    {
      id: 1,
      dateTime: 53245623634,
      btcPrice: 589452,
      eurUSD: 1.09,
      totalEUR: 12956165,
      changeEUR: 1503,
      totalUSD: 14113125.85,
      changeUSD: -1503,
      totalBTC: 15.353456454,
      note: "Bought a space ship",
    },
    {
      id: 2,
      dateTime: 2135132456234,
      btcPrice: 45000,
      eurUSD: 1.12,
      totalEUR: 12956165,
      changeEUR: -1503,
      totalUSD: 14524262.5,
      changeUSD: 1503,
      totalBTC: 23.801,
      note: "Investment portfolio",
    },
    {
      id: 3,
      dateTime: 14253524,
      btcPrice: 52000,
      eurUSD: 1.15,
      totalEUR: 17500000,
      changeEUR: 2300,
      totalUSD: 20148000,
      changeUSD: 2300,
      totalBTC: 18.75,
      note: "Real estate investment",
    },
    {
      id: 4,
      dateTime: 6534654362,
      btcPrice: 48000,
      eurUSD: 1.18,
      totalEUR: 9800000,
      changeEUR: -1200,
      totalUSD: 11544000,
      changeUSD: -1200,
      totalBTC: 12.5,
      note: "Cryptocurrency diversification",
    },
    {
      id: 5,
      dateTime: 1432523445123,
      btcPrice: 55000,
      eurUSD: 1.14,
      totalEUR: 15500000,
      changeEUR: 3000,
      totalUSD: 17670000,
      changeUSD: 3000,
      totalBTC: 20,
      note: "Gold and precious metals",
    },
    {
      id: 6,
      dateTime: 5324152234,
      btcPrice: 60000,
      eurUSD: 1.08,
      totalEUR: 21000000,
      changeEUR: 1800,
      totalUSD: 22680000,
      changeUSD: 1800,
      totalBTC: 35,
      note: "Tech stock investment",
    },
    {
      id: 7,
      dateTime: 23452345523452,
      btcPrice: 51000,
      eurUSD: 1.2,
      totalEUR: 14000000,
      changeEUR: -2500,
      totalUSD: 16800000,
      changeUSD: -2500,
      totalBTC: 22,
      note: "Global bond market",
    },
    {
      id: 8,
      dateTime: 234523445234,
      btcPrice: 48000,
      eurUSD: 1.22,
      totalEUR: 10000000,
      changeEUR: 1200,
      totalUSD: 12200000,
      changeUSD: 1200,
      totalBTC: 18.5,
      note: "Sustainable energy investments",
    },
    {
      id: 9,
      dateTime: 6325463456234,
      btcPrice: 55000,
      eurUSD: 1.18,
      totalEUR: 16500000,
      changeEUR: 2700,
      totalUSD: 19470000,
      changeUSD: 2700,
      totalBTC: 28,
      note: "Precious metals and commodities",
    },
    {
      id: 10,
      dateTime: 632456345632,
      btcPrice: 50000,
      eurUSD: 1.25,
      totalEUR: 12000000,
      changeEUR: -1800,
      totalUSD: 15000000,
      changeUSD: -1800,
      totalBTC: 20.5,
      note: "Real estate development",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "dateTime",
      headerName: "Date & Time",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "btcPrice",
      headerName: "BTC Price",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "eurUSD",
      headerName: "EUR/USD",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalEUR",
      headerName: "Total EUR",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalUSD",
      headerName: "Total USD",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalBTC",
      headerName: "Total BTC",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "note",
      headerName: "Note",
      editable: true,
      flex: 0.25,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "",
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
      case "dateTime":
        return (
          <Box
            sx={{
              color: "#575757",
              fontWeight: "500",
            }}
          >
            {formatTimeMillis(value)}
          </Box>
        );
      case "btcPrice":
        return (
          <Box
            sx={{
              color: "#f57e0f",
              fontWeight: "500",
            }}
          >
            {currencySymbol}
            {value}
          </Box>
        );
      case "eurUSD":
        return (
          <Box
            sx={{
              color: "#2aa5b0",
              fontWeight: "500",
            }}
          >
            {currencySymbol}
            {value}
          </Box>
        );
      case "totalEUR":
        return (
          <Box
            sx={{
              color: getColor(params.row.changeEUR),
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, "EUR")} (${formatCurrency(
              params.row.changeEUR,
              "EUR",
              0
            )})`}
          </Box>
        );
      case "totalUSD":
        return (
          <Box
            sx={{
              color: getColor(params.row.changeUSD),
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, "USD")} (${formatCurrency(
              params.row.changeUSD,
              "USD",
              0
            )})`}
          </Box>
        );
      case "totalBTC":
        return (
          <Box
            sx={{
              color: "#f57e0f",
              fontWeight: "500",
            }}
          >
            {formatBTC(value)}
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
