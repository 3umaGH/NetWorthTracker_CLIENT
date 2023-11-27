import { Container, Grid, Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const savedColumns: GridColDef[] = [
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

const assetsColumns: GridColDef[] = [
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

const fiatColumns: GridColDef[] = [
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

const fiatRows_MOCK = [
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

const assetsRows_MOCK = [
  {
    id: 1,
    description: "My secret stash of bitcoins",
    ticker: "BTC",
    type: "Crypto",
    amount: "15.06598",
    lastPrice: "$696969.69",
    totalPrice: "$10,454,535",
  },
  {
    id: 2,
    description: "My SP500",
    ticker: "SP500:NSQ",
    type: "Stocks",
    amount: "1337",
    lastPrice: "$4250",
    totalPrice: "$100,874",
  },
  {
    id: 3,
    description: "Ethereum investment",
    ticker: "ETH",
    type: "Crypto",
    amount: "8.257",
    lastPrice: "$3500",
    totalPrice: "$28,954",
  },
  {
    id: 4,
    description: "Tech company stocks",
    ticker: "AAPL",
    type: "Stocks",
    amount: "20",
    lastPrice: "$150",
    totalPrice: "$3,000",
  },
  {
    id: 5,
    description: "Gold bars",
    ticker: "XAU",
    type: "Commodities",
    amount: "5",
    lastPrice: "$1800",
    totalPrice: "$9,000",
  },
  {
    id: 6,
    description: "Real estate property",
    ticker: "RE:NYC",
    type: "Real Estate",
    amount: "1",
    lastPrice: "$1,200,000",
    totalPrice: "$1,200,000",
  },
  {
    id: 7,
    description: "Cryptocurrency mining equipment",
    ticker: "MINER",
    type: "Equipment",
    amount: "3",
    lastPrice: "$5000",
    totalPrice: "$15,000",
  },
  {
    id: 8,
    description: "Government bonds",
    ticker: "BOND:US",
    type: "Bonds",
    amount: "50",
    lastPrice: "$100",
    totalPrice: "$5,000",
  },
  {
    id: 9,
    description: "Solar energy stocks",
    ticker: "SOLAR",
    type: "Stocks",
    amount: "15",
    lastPrice: "$80",
    totalPrice: "$1,200",
  },
  {
    id: 10,
    description: "Art collection",
    ticker: "ART",
    type: "Collectibles",
    amount: "7",
    lastPrice: "$5000",
    totalPrice: "$35,000",
  },
];

const savedRows_MOCK = [
  {
    id: 1,
    dateTime: "16/27/2043",
    btcPrice: "Infinity",
    eurUSD: "$1.09",
    totalEUR: "1.2405M",
    totalUSD: "1.4503M",
    totalBTC: "15.34950B",
    note: "Bought a space ship",
  },
  {
    id: 2,
    dateTime: "08/15/2023",
    btcPrice: "45000",
    eurUSD: "$1.12",
    totalEUR: "950K",
    totalUSD: "1.064M",
    totalBTC: "23.801B",
    note: "Investment portfolio",
  },
  {
    id: 3,
    dateTime: "05/10/2023",
    btcPrice: "55000",
    eurUSD: "$1.15",
    totalEUR: "1.750M",
    totalUSD: "2.008M",
    totalBTC: "18.327B",
    note: "Cryptocurrency trade",
  },
  {
    id: 4,
    dateTime: "12/03/2022",
    btcPrice: "60000",
    eurUSD: "$1.08",
    totalEUR: "3.120M",
    totalUSD: "3.364M",
    totalBTC: "27.502B",
    note: "Real estate investment",
  },
  {
    id: 5,
    dateTime: "02/18/2023",
    btcPrice: "48000",
    eurUSD: "$1.10",
    totalEUR: "2.500M",
    totalUSD: "2.750M",
    totalBTC: "20.103B",
    note: "Stock market purchase",
  },
  {
    id: 6,
    dateTime: "09/05/2023",
    btcPrice: "42000",
    eurUSD: "$1.18",
    totalEUR: "1.950M",
    totalUSD: "2.301M",
    totalBTC: "14.720B",
    note: "Hedging strategy",
  },
  {
    id: 7,
    dateTime: "11/22/2022",
    btcPrice: "58000",
    eurUSD: "$1.05",
    totalEUR: "2.800M",
    totalUSD: "2.940M",
    totalBTC: "23.004B",
    note: "Future planning",
  },
  {
    id: 8,
    dateTime: "07/08/2023",
    btcPrice: "51000",
    eurUSD: "$1.14",
    totalEUR: "1.650M",
    totalUSD: "1.868M",
    totalBTC: "17.205B",
    note: "Retirement fund",
  },
  {
    id: 9,
    dateTime: "03/12/2023",
    btcPrice: "47000",
    eurUSD: "$1.20",
    totalEUR: "2.200M",
    totalUSD: "2.464M",
    totalBTC: "19.603B",
    note: "Educational expenses",
  },
  {
    id: 10,
    dateTime: "01/30/2023",
    btcPrice: "52000",
    eurUSD: "$1.16",
    totalEUR: "1.400M",
    totalUSD: "1.624M",
    totalBTC: "16.005B",
    note: "Vacation planning",
  },
];

export const MainPage = () => {
  return (
    <Box sx={{ backgroundColor: "" }}>
      <Grid container rowSpacing={6} columnSpacing={0.25}>
        <Grid item xs={12} md={4}>
          <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
            <Box style={{ border: "1px solid black" }}>
              <Typography textAlign="center" variant="h4">
                Asset Allocation
              </Typography>
            </Box>
            <Box sx={{ width: "90%", height: "90%", p: 4 }}>
              <PieChart
                colors={["red", "blue", "green"]}
                series={[
                  {
                    innerRadius: 68,
                    data: [
                      { id: 0, value: 10, label: "Crypto" },
                      { id: 1, value: 15, label: "Fiat" },
                      { id: 2, value: 20, label: "Stocks" },
                    ],
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: {
                      innerRadius: 30,
                      additionalRadius: -30,
                      color: "gray",
                    },
                    arcLabel: (item) => `${item.label}`,
                    arcLabelMinAngle: 45,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontFamily: "roboto",
                  },
                }}
              />
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={8}>
          <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
            <Box style={{ border: "1px solid black" }}>
              <Typography textAlign="center" variant="h4">
                Total net worth:{" "}
                <span style={{ color: "greenyellow" }}>$123.456.000</span>
              </Typography>
            </Box>
            <DataGrid
              rows={savedRows_MOCK}
              columns={savedColumns}
              hideFooter={true}
              disableRowSelectionOnClick
            />
          </Container>
        </Grid>

        <Grid item xs={12} md={9}>
          <Container maxWidth={false} disableGutters sx={{ height: "44vh" }}>
            <Box style={{ border: "1px solid black" }}>
              <Typography textAlign="center" variant="h4">
                Asset Allocation
              </Typography>
            </Box>
            <DataGrid
              rows={assetsRows_MOCK}
              columns={assetsColumns}
              hideFooter={true}
              disableRowSelectionOnClick
            />
          </Container>
        </Grid>
        <Grid item xs={12} md={3}>
          <Container maxWidth={false} disableGutters sx={{ height: "44vh" }}>
            <Box style={{ border: "1px solid black" }}>
              <Typography textAlign="center" variant="h4">
                Fiat
              </Typography>
            </Box>
            <DataGrid
              rows={fiatRows_MOCK}
              columns={fiatColumns}
              hideFooter={true}
              disableRowSelectionOnClick
            />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};
