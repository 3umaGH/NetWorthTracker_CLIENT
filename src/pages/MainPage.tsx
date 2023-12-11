import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Tooltip,
  Button,
} from "@mui/material";

import { AssetAllocationChart } from "../components/charts/AssetAllocationChart";
import { NetWorthSnapshotTable } from "../components/tables/NetWorthSnapshotTable";
import { AssetsTable } from "../components/tables/AssetsTable";
import { FiatAssetsTable } from "../components/tables/FiatAssetsTable";
import { CellTitle } from "../components/CellTitle";
import { BalanceFooter } from "../components/BalanceFooter";

import { AppDispatch, RootState } from "../app/Store";

import { fetchUserData } from "../features/assets/thunks";
import { ButtonToolbar } from "../components/ButtonToolbar";
import { FirebaseAuth } from "../firebase/firebase";
import { fetchUserConfig } from "../features/userParams/thunks";
import { fetchCryptoPrices, fetchStockPrices } from "../features/prices/thunks";
import BasicModal from "../components/modals/BasicModal";
import { CurrencySelector } from "../components/modals/views/CurrencySelector";
import { PasswordPrompt } from "../components/modals/views/PasswordPrompt";
import { SetPasswordPrompt } from "../components/modals/views/SetPasswordPrompt";
import { DetailedChart } from "../components/charts/DetailedChart";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Confirmation } from "../components/modals/views/Confirmation";
import { ConfirmationProps } from "../constants";

export const MainPage = () => {
  //const assets = useSelector((state: RootState) => state.assets);
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setLoading] = useState(true);
  const [isCurrencySelectorOpen, setCurrencySelector] = useState(false);
  const [isSetPasswordOpen, setSetPasswordOpen] = useState(false);
  const [isPasswordPromptOpen, setPasswordPromptOpen] = useState(false);

  const [chartMode, setChartMode] = useState(false); // True will shift grid to make space for a new chart
  const [currentConfirmation, setCurrentConfirmation] =
    useState<ConfirmationProps | null>(null);

  const transitionEffect = {
    transition: "all 0.5s ease-in-out",
  };

  useEffect(() => {
    if (userParams.useCustomEncryption && !userParams.encryptionKey)
      setPasswordPromptOpen(true);
    else dispatch(fetchUserData());
  }, [userParams]); // Watch for changes in userParams

  useEffect(() => {
    const fetchData = async () => {
      if (FirebaseAuth.currentUser) {
        dispatch(fetchUserConfig());
        await dispatch(fetchCryptoPrices());
        await dispatch(fetchStockPrices());

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
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

  const handleConfirmationClose = () => {
    if (currentConfirmation && currentConfirmation.onClose)
      currentConfirmation.onClose();

    setCurrentConfirmation(null);
  };

  return (
    <Box>
      {currentConfirmation && (
        <BasicModal
          onClose={handleConfirmationClose}
          sx={{ minWidth: "150px", maxWidth: "max-content" }}
        >
          <Confirmation
            title={currentConfirmation!.title}
            subtitle={currentConfirmation!.subtitle}
            onConfirm={currentConfirmation!.onConfirm}
            onCancel={currentConfirmation!.onCancel}
            onClose={handleConfirmationClose}
          />
        </BasicModal>
      )}

      {isPasswordPromptOpen && (
        <BasicModal
          onClose={() => null}
          sx={{ minWidth: "260px", maxWidth: "400px" }}
        >
          <PasswordPrompt
            onClose={() => setPasswordPromptOpen(!isPasswordPromptOpen)}
          />
        </BasicModal>
      )}

      {isSetPasswordOpen && (
        <BasicModal
          onClose={() => setSetPasswordOpen(!isSetPasswordOpen)}
          sx={{ minWidth: "260px", maxWidth: "400px" }}
        >
          <SetPasswordPrompt
            onClose={() => setSetPasswordOpen(!isSetPasswordOpen)}
          />
        </BasicModal>
      )}

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
          <Grid
            item
            xs={12}
            md={chartMode ? 12 : 3}
            sx={{ ...transitionEffect }}
          >
            <Container maxWidth={false} sx={{ height: "45vh" }}>
              <CellTitle title="Asset Allocation" />
              <ButtonToolbar
                handleCurrencySelectorOpen={() => setCurrencySelector(true)}
                handleSetPasswordOpen={() => setSetPasswordOpen(true)}
              />

              <Box
                sx={{
                  height: "90%",
                  position: "relative",
                }}
              >
                <Box
                  sx={{ position: "absolute", right: 0, bottom: 5, zIndex: 1 }}
                >
                  <Tooltip title={`Expand charts`}>
                    <Button
                      color="textColor"
                      onClick={() => {
                        setChartMode(!chartMode);
                      }}
                    >
                      <MoreVertIcon />
                    </Button>
                  </Tooltip>
                </Box>

                <AssetAllocationChart />
              </Box>
            </Container>
          </Grid>

          <Grid
            item
            xs={chartMode ? 12 : 0}
            md={chartMode ? 12 : 0}
            sx={{
              ...transitionEffect,
              display: chartMode ? "block" : "none",
            }}
          >
            <Container
              maxWidth={false}
              sx={{ height: "45vh", opacity: chartMode ? 100 : 0 }}
            >
              <CellTitle title="Chart" />
              <DetailedChart />
            </Container>
          </Grid>

          <Grid item xs={12} md={chartMode ? 12 : 9} sx={{}}>
            <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
              <CellTitle title="Snapshots" />
              <NetWorthSnapshotTable
                setConfirmation={(props) => setCurrentConfirmation(props)}
              />
            </Container>
          </Grid>

          <Grid item xs={12} md={9}>
            <Container maxWidth={false} disableGutters sx={{ height: "38vh" }}>
              <CellTitle title="Assets" />
              <AssetsTable
                setConfirmation={(props) => setCurrentConfirmation(props)}
              />
            </Container>
          </Grid>
          <Grid item xs={12} md={3}>
            <Container maxWidth={false} disableGutters sx={{ height: "38vh" }}>
              <CellTitle title="Fiat Assets" />
              <FiatAssetsTable
                setConfirmation={(props) => setCurrentConfirmation(props)}
              />
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
