import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Grid, Box, CircularProgress } from "@mui/material";

import { AssetAllocationChart } from "../components/charts/AssetAllocationChart";
import { NetWorthSnapshotTable } from "../components/tables/NetWorthSnapshotTable";
import { AssetsTable } from "../components/tables/AssetsTable";
import { FiatAssetsTable } from "../components/tables/FiatAssetsTable";
import { CellTitle } from "../components/CellTitle";
import { BalanceFooter } from "../components/BalanceFooter";

import { AppDispatch, RootState } from "../app/Store";

import {
  fetchUserData,
  updateNumbers,
  updateTotals,
} from "../features/assets/thunks";
import { ButtonToolbar } from "../components/ButtonToolbar";
import { FirebaseAuth } from "../firebase/firebase";
import { fetchUserConfig } from "../features/userParams/thunks";
import { fetchCryptoPrices, fetchStockPrices } from "../features/prices/thunks";
import BasicModal from "../components/modals/BasicModal";
import { CurrencySelector } from "../components/modals/views/CurrencySelector";

export const MainPage = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const prices = useSelector((state: RootState) => state.prices);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(true);
  const [isCurrencySelectorOpen, setCurrencySelector] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (FirebaseAuth.currentUser) {
        await dispatch(fetchUserData());
        await dispatch(fetchUserConfig());
        await dispatch(fetchCryptoPrices());
        await dispatch(fetchStockPrices());

        setLoading(false);
      }
    };

    fetchData();

    const cryptoIntervalId = setInterval(() => {
      dispatch(fetchCryptoPrices());
    }, 10000);
    const stockIntervalId = setInterval(() => {
      dispatch(fetchStockPrices());
    }, 30000);

    return () => {
      clearInterval(cryptoIntervalId);
      clearInterval(stockIntervalId);
    };
  }, []);

  useEffect(() => {
    dispatch(updateNumbers()).then(() => dispatch(updateTotals()));
  }, [
    assets.secondaryISO_4217,
    assets.assets.length,
    assets.fiatAssets.length,
    prices.cryptoPrices,
    prices.currencyRates,
    prices.stockPrices,
  ]);

  return (
    <Box>
      {isCurrencySelectorOpen && (
        <BasicModal
          onClose={() => setCurrencySelector(!isCurrencySelectorOpen)}
          sx={{ minWidth: "260px", maxWidth: "350px" }}
        >
          <CurrencySelector
            onClose={() => setCurrencySelector(!isCurrencySelectorOpen)}
          />
        </BasicModal>
      )}

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={100} color="primary" />
        </Box>
      ) : (
        <Grid container rowSpacing={6} columnSpacing={0.25}>
          <Grid item xs={12} md={3}>
            <Container maxWidth={false} sx={{ height: "45vh" }}>
              <CellTitle title="Asset Allocation" />
              <ButtonToolbar
                handleCurrencySelectorOpen={() => setCurrencySelector(true)}
              />

              <Box
                sx={{
                  height: "90%",
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
      )}
    </Box>
  );
};
