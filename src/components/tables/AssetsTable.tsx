import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const AssetsTable = () => {
  const rows = [
    {
      id: 1,
      description: "My secret stash of bitcoins",
      ticker: "BTC",
      type: "Crypto",
      amount: "15.06598",
      lastPrice: "696969.69",
      change: "-1584",
      totalPrice: "10,454,535",
    },
    {
      id: 2,
      description: "My SP500",
      ticker: "SP500:NSQ",
      type: "Stocks",
      amount: "1337",
      lastPrice: "4250",
      change: "1584",
      totalPrice: "100,874",
    },
    {
      id: 3,
      description: "Ethereum investment",
      ticker: "ETH",
      type: "Crypto",
      amount: "8.257",
      lastPrice: "3500",
      change: "-1584",
      totalPrice: "28,954",
    },
    {
      id: 4,
      description: "Tech company stocks",
      ticker: "AAPL",
      type: "Stocks",
      amount: "20",
      lastPrice: "150",
      change: "1584",
      totalPrice: "3,000",
    },
    {
      id: 5,
      description: "Gold bars",
      ticker: "XAU",
      type: "Commodities",
      amount: "5",
      lastPrice: "1800",
      change: "-1584",
      totalPrice: "9,000",
    },
    {
      id: 6,
      description: "Real estate property",
      ticker: "RE:NYC",
      type: "Real Estate",
      amount: "1",
      lastPrice: "1,200,000",
      change: "1584",
      totalPrice: "1,200,000",
    },
    {
      id: 7,
      description: "Cryptocurrency mining equipment",
      ticker: "MINER",
      type: "Equipment",
      amount: "3",
      lastPrice: "5000",
      change: "-1584",
      totalPrice: "15,000",
    },
    {
      id: 8,
      description: "Government bonds",
      ticker: "BOND:US",
      type: "Bonds",
      amount: "50",
      lastPrice: "100",
      change: "1584",
      totalPrice: "5,000",
    },
    {
      id: 9,
      description: "Solar energy stocks",
      ticker: "SOLAR",
      type: "Stocks",
      amount: "15",
      lastPrice: "80",
      change: "-1584",
      totalPrice: "1,200",
    },
    {
      id: 10,
      description: "Art collection",
      ticker: "ART",
      type: "Collectibles",
      amount: "7",
      lastPrice: "5000",
      change: "1584",
      totalPrice: "35,000",
    },
  ];

  const columns: GridColDef[] = [
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
      field: "change",
      headerName: "Change",
      flex: 0.05,

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
