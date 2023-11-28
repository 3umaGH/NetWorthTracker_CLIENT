import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const NetWorthSnapshotTable = () => {
  const rows = [
    {
      id: 1,
      dateTime: "16/27/2043",
      btcPrice: "Infinity",
      eurUSD: "1.09",
      totalEUR: "1.2405M",
      totalUSD: "1.4503M",
      totalBTC: "15.350 ₿",
      note: "Bought a space ship",
    },
    {
      id: 2,
      dateTime: "08/15/2023",
      btcPrice: "45000",
      eurUSD: "1.12",
      totalEUR: "950K",
      totalUSD: "1.064M",
      totalBTC: "23.801 ₿",
      note: "Investment portfolio",
    },
    {
      id: 3,
      dateTime: "05/10/2023",
      btcPrice: "55000",
      eurUSD: "1.15",
      totalEUR: "1.750M",
      totalUSD: "2.008M",
      totalBTC: "18.327 ₿",
      note: "Cryptocurrency trade",
    },
    {
      id: 4,
      dateTime: "12/03/2022",
      btcPrice: "60000",
      eurUSD: "1.08",
      totalEUR: "3.120M",
      totalUSD: "3.364M",
      totalBTC: "27.502 ₿",
      note: "Real estate investment",
    },
    {
      id: 5,
      dateTime: "02/18/2023",
      btcPrice: "48000",
      eurUSD: "1.10",
      totalEUR: "2.500M",
      totalUSD: "2.750M",
      totalBTC: "20.103 ₿",
      note: "Stock market purchase",
    },
    {
      id: 6,
      dateTime: "09/05/2023",
      btcPrice: "42000",
      eurUSD: "1.18",
      totalEUR: "1.950M",
      totalUSD: "2.301M",
      totalBTC: "14.720 ₿",
      note: "Hedging strategy",
    },
    {
      id: 7,
      dateTime: "11/22/2022",
      btcPrice: "58000",
      eurUSD: "1.05",
      totalEUR: "2.800M",
      totalUSD: "2.940M",
      totalBTC: "23.004 ₿",
      note: "Future planning",
    },
    {
      id: 8,
      dateTime: "07/08/2023",
      btcPrice: "51000",
      eurUSD: "1.14",
      totalEUR: "1.650M",
      totalUSD: "1.868M",
      totalBTC: "17.205 ₿",
      note: "Retirement fund",
    },
    {
      id: 9,
      dateTime: "03/12/2023",
      btcPrice: "47000",
      eurUSD: "1.20",
      totalEUR: "2.200M",
      totalUSD: "2.464M",
      totalBTC: "19.603 ₿",
      note: "Educational expenses",
    },
    {
      id: 10,
      dateTime: "01/30/2023",
      btcPrice: "52000",
      eurUSD: "1.16",
      totalEUR: "1.400M",
      totalUSD: "1.624M",
      totalBTC: "16.005 ₿",
      note: "Vacation planning",
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

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      hideFooter={true}
      disableRowSelectionOnClick
      density={"compact"}
    />
  );
};
