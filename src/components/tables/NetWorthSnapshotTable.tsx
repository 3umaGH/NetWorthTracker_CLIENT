import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { currencySymbol } from "../../constants";
import { formatBTC, formatCurrency, formatTimeMillis } from "../../util";
import { TableActions } from "./TableActions";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
import { NetWorthTableActions } from "./NetWorthTableActions";

export const NetWorthSnapshotTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const theme = useTheme();

  const getColor = (inputNum: number) => {
    if (inputNum === null || inputNum === undefined) return "black";

    if (inputNum > 0) return theme.palette.positiveColor.main;
    else if (inputNum < 0) return theme.palette.negativeColor.main;
  };

  const rows = assets.networthSnapshots;

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
      headerName: "Actions",
      flex: 0.07,

      align: "center",
      headerAlign: "center",
    },
  ];

  const cellRenderer = (params: GridRenderCellParams) => {
    const { field, value } = params;

    switch (field) {
      case "dateTime":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "300",
            }}
          >
            {formatTimeMillis(value)}
          </Box>
        );
      case "btcPrice":
        return (
          <Box
            sx={{
              color: theme.palette.cryptoColor.main,
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
              color: theme.palette.conversionColor.main,
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
              color: theme.palette.cryptoColor.main,
              fontWeight: "500",
            }}
          >
            {formatBTC(value)}
          </Box>
        );
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
      case "actions":
        return (
          <NetWorthTableActions rowID={params.row.id} totalRows={rows.length} />
        );
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
