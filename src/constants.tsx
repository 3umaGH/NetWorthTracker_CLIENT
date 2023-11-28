import { GridColDef } from "@mui/x-data-grid";

export const networthSnapshotTableColumns: GridColDef[] = [
  {
    field: "dateTime",
    headerName: "Date & Time",
    flex: 0.125,
  },
  {
    field: "btcPrice",
    headerName: "BTC Price",
    flex: 0.125,
  },
  {
    field: "eurUSD",
    headerName: "EUR/USD",
    flex: 0.125,
  },
  {
    field: "totalEUR",
    headerName: "Total EUR",
    flex: 0.125,
  },
  {
    field: "totalUSD",
    headerName: "Total USD",
    flex: 0.125,
  },
  {
    field: "totalBTC",
    headerName: "Total BTC",
    flex: 0.125,
  },
  {
    field: "note",
    headerName: "Note",
    editable: true,
    flex: 0.25,
  },
];

export const assetsColumns: GridColDef[] = [
  {
    field: "description",
    headerName: "Description",
    editable: true,
    flex: 0.375,
  },
  {
    field: "ticker",
    headerName: "Ticker",
    flex: 0.125,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.125,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.125,
  },
  {
    field: "lastPrice",
    headerName: "Last Price",
    flex: 0.125,
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    flex: 0.125,
  },
];

export const fiatAssetsColumns: GridColDef[] = [
  {
    field: "note",
    headerName: "Note",
    editable: true,
    flex: 0.4,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.4,
  },
  {
    field: "currency",
    headerName: "Currency",
    flex: 0.2,
  },
];
