// React-related imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Material-UI (MUI) related imports
import { Container, Grid, Box } from "@mui/material";

// Components
import { AssetAllocationChart } from "../components/charts/AssetAllocationChart";
import { NetWorthSnapshotTable } from "../components/tables/NetWorthSnapshotTable";
import { AssetsTable } from "../components/tables/AssetsTable";
import { FiatAssetsTable } from "../components/tables/FiatAssetsTable";
import { CellTitle } from "../components/CellTitle";
import { BalanceFooter } from "../components/BalanceFooter";

// App-related imports
import { AppDispatch } from "../app/Store";

// Thunks
import { fetchCryptoPrices, fetchStockPrices } from "../features/assets/thunks";
import { updateUserData } from "../features/assets/assetsSlice";
import { fetchUserData } from "../firebase/firebase";
import { ButtonToolbar } from "../components/ButtonToolbar";

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCryptoPrices());
    setInterval(() => dispatch(fetchCryptoPrices()), 10000);

    dispatch(fetchStockPrices());
    setInterval(() => dispatch(fetchStockPrices()), 30000);

    const loadUserData = async () => {
      const data = await fetchUserData();

      if (data) dispatch(updateUserData(data));
    };

    loadUserData();
  }, []);

  return (
    <Box>
      <Grid container rowSpacing={6} columnSpacing={0.25}>
        <Grid item xs={12} md={3}>
          <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
            <CellTitle title="Asset Allocation" />
            <ButtonToolbar/>

            <Box
              sx={{
                width: "90%",
                height: "90%",
                m: "auto",
                ml: 10,
              }}
            >
              <AssetAllocationChart />
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={9}>
          <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
            <CellTitle title="Snapshots" />
            <NetWorthSnapshotTable />
          </Container>
        </Grid>

        <Grid item xs={12} md={9}>
          <Container maxWidth={false} disableGutters sx={{ height: "38vh" }}>
            <CellTitle title="Assets" />
            <AssetsTable />
          </Container>
        </Grid>
        <Grid item xs={12} md={3}>
          <Container maxWidth={false} disableGutters sx={{ height: "38vh" }}>
            <CellTitle title="Fiat Assets" />
            <FiatAssetsTable />
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ maxHeight: { xs: "20vh", md: "5vh" }, mb: { xs: 4, md: 0 } }}
        >
          <BalanceFooter />
        </Grid>
      </Grid>
    </Box>
  );
};
