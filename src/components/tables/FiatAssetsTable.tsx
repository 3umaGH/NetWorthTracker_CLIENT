import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { positiveColor } from "../../constants";
import { formatCurrency } from "../../util";
import { TableActions } from "./TableActions";

export const FiatAssetsTable = () => {
  const rows = [
    { id: 1, note: "Lorem ipsum", amount: 1000, currency: "USD" },
    { id: 2, note: "Dolor sit amet", amount: 750, currency: "EUR" },
    { id: 3, note: "Consectetur adipiscing", amount: 1200, currency: "GBP" },
    { id: 4, note: "Sed do eiusmod", amount: 500, currency: "JPY" },
    { id: 5, note: "Incididunt ut labore", amount: 900, currency: "CAD" },
    { id: 6, note: "Et dolore magna", amount: 1500, currency: "AUD" },
    { id: 7, note: "Ut enim ad minim", amount: 800, currency: "CHF" },
    { id: 8, note: "Quis nostrud exercitation", amount: 1100, currency: "SEK" },
    { id: 9, note: "Sunt in culpa", amount: 600, currency: "INR" },
    { id: 10, note: "Cillum dolore eu", amount: 1300, currency: "NZD" },
  ];

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
      flex: 0.2,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "currency",
      headerName: "Currency",
      flex: 0.2,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.2,

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
      case "amount":
        return (
          <Box
            sx={{
              color: positiveColor,
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
              color: "#575757",
              fontWeight: "500",
            }}
          >
            {value}
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
