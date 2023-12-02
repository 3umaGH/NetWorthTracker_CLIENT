import { Container, Grid, Box, Button } from "@mui/material";
import { AssetAllocationChart } from "../components/charts/AssetAllocationChart";
import { NetWorthSnapshotTable } from "../components/tables/NetWorthSnapshotTable";
import { AssetsTable } from "../components/tables/AssetsTable";
import { FiatAssetsTable } from "../components/tables/FiatAssetsTable";
import { CellTitle } from "../components/CellTitle";
import { BalanceFooter } from "../components/BalanceFooter";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/Store";
import { useEffect } from "react";
import { fetchCryptoPrices, fetchStockPrices } from "../features/assets/thunks";

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCryptoPrices());
    setInterval(() => dispatch(fetchCryptoPrices()), 10000);

    dispatch(fetchStockPrices());
    setInterval(() => dispatch(fetchStockPrices()), 30000);
  }, []);

  return (
    <Box>
      <Grid container rowSpacing={6} columnSpacing={0.25}>
        <Grid item xs={12} md={3}>
          <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
            <CellTitle title="Asset Allocation" />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                m: "auto",
                ml: 6,
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
