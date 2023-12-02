// React-Redux related imports
import { useSelector } from "react-redux";

// Emotion-related imports
import { useTheme } from "@emotion/react";

// Material-UI (MUI) related imports
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

// App-related imports
import { RootState } from "../app/Store";

// Utility functions related imports
import { formatTotalCurrency, getLastSnapshot } from "../util";

export const BalanceFooter = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const theme = useTheme();

  const USDChange = assets.totals.USD - (getLastSnapshot(assets).totalUSD ?? 0);
  const EURChange = assets.totals.EUR - (getLastSnapshot(assets).totalEUR ?? 0);

  return (
    <Box textAlign={"center"}>
      <Typography variant="h2" color={"black"} fontSize={28} fontWeight={700}>
        <Grid container>
          {assets.fetching && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.palette.textColor.main,
                position: "absolute",
                right: 15,
                mt: 0.5,
              }}
            />
          )}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ color: theme.palette.conversionColor.main, mb: 1 }}
          >
            <span>1€ = {assets.eurUSDRate}</span>
          </Grid>
          <Grid
            item
            xs={12}
            md={4.5}
            sx={{
              color:
                EURChange >= 0
                  ? theme.palette.positiveColor.main
                  : theme.palette.negativeColor.main,
              mb: 1,
            }}
          >
            <span>
              Total (EUR): €{formatTotalCurrency(assets.totals.EUR)} (€
              {formatTotalCurrency(EURChange)})
            </span>
          </Grid>
          <Grid
            item
            xs={12}
            md={4.5}
            sx={{
              color:
                USDChange >= 0
                  ? theme.palette.positiveColor.main
                  : theme.palette.negativeColor.main,
              mb: 1,
            }}
          >
            <span>
              Total (USD): ${formatTotalCurrency(assets.totals.USD)} ($
              {formatTotalCurrency(USDChange)})
            </span>
          </Grid>
        </Grid>
      </Typography>
      <Divider />
    </Box>
  );
};
