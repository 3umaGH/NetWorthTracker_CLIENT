import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { RootState } from "../app/Store";
import { formatTotalCurrency, getCurrencyRate, getLastSnapshot } from "../util";
import { currencySymbols } from "../constants";

export const BalanceFooter = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const prices = useSelector((state: RootState) => state.prices);
  const userParams = useSelector((state: RootState) => state.userParams);
  const theme = useTheme();

  const lastSnapshot = getLastSnapshot(assets);
  const USDChange = assets.totals.USD - (lastSnapshot.totalUSD ?? 0);

  const secondaryChange =
    assets.secondaryISO_4217 === lastSnapshot.secondaryISO_4217
      ? assets.totals.secondaryCurrency - (lastSnapshot.totalSecondary ?? 0)
      : -1;

  return (
    <Box textAlign={"center"}>
      <Typography variant="h2" color={"black"} fontSize={28} fontWeight={700}>
        <Grid container>
          {assets.isLoading && (
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
            sx={{
              color: theme.palette.conversionColor.main,
              mb: 1,
              ...(userParams.discreetMode
                ? {
                    filter: "blur(8px)",
                    "&:hover": {
                      filter: "blur(0px)",
                    },
                  }
                : {}),
            }}
          >
            <span>
              1 {assets.secondaryISO_4217} = $
              {getCurrencyRate(prices, assets.secondaryISO_4217)}
            </span>
          </Grid>
          <Grid
            item
            xs={12}
            md={4.5}
            sx={{
              color:
                secondaryChange === -1
                  ? theme.palette.textColor.dark
                  : secondaryChange >= 0
                  ? theme.palette.positiveColor.main
                  : theme.palette.negativeColor.main,

              mb: 1,
              ...(userParams.discreetMode
                ? {
                    filter: "blur(8px)",
                    "&:hover": {
                      filter: "blur(0px)",
                    },
                  }
                : {}),
            }}
          >
            <span>
              Total ({assets.secondaryISO_4217}):{" "}
              {formatTotalCurrency(
                assets.totals.secondaryCurrency,
                assets.secondaryISO_4217 as keyof typeof currencySymbols,
                0
              )}{" "}
              {secondaryChange === -1 || secondaryChange === 0
                ? ""
                : `( 
                ${formatTotalCurrency(
                  secondaryChange,
                  assets.secondaryISO_4217 as keyof typeof currencySymbols,
                  0
                )}
                   )`}
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
              ...(userParams.discreetMode
                ? {
                    filter: "blur(8px)",
                    "&:hover": {
                      filter: "blur(0px)",
                    },
                  }
                : {}),
            }}
          >
            <span>
              Total (USD): {formatTotalCurrency(assets.totals.USD, "USD", 0)}
              {USDChange !== 0 &&
                ` ( ${formatTotalCurrency(USDChange, "USD", 0)} )`}
            </span>
          </Grid>
        </Grid>
      </Typography>
      <Divider />
    </Box>
  );
};
