import { LineChart } from "@mui/x-charts/LineChart";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import { formatTimeMillis, formatTotalCurrency } from "../../util";

export const DetailedChart = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const userParams = useSelector((state: RootState) => state.userParams);
  const theme = useTheme();

  const dataPoints = useMemo(() => {
    const defaultValues = [null];

    const dates =
      assets.networthSnapshots.map((snapshot) => new Date(snapshot.dateTime)) ||
      defaultValues;

    const totalUSD =
      assets.networthSnapshots.map((snapshot) => snapshot.totalUSD) ||
      defaultValues;

    const BTCPrices =
      assets.networthSnapshots.map((snapshot) => snapshot.btcPrice) ||
      defaultValues;

    return {
      dates,
      totalUSD,
      BTCPrices,
    };
  }, [assets.networthSnapshots.length]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...(userParams.discreetMode
          ? {
              filter: "blur(4px)",
              "&:hover": {
                filter: "blur(0px)",
              },
            }
          : {}),
      }}
    >
      {assets.networthSnapshots.length === 0 ? (
        <>
          <Typography variant="h4" align="center">
            No Data
          </Typography>
          <Typography variant="caption" align="center" color="gray">
            Add some snapshots to see the charts.
          </Typography>
        </>
      ) : (
        <LineChart
          xAxis={[
            {
              data: dataPoints.dates,
              scaleType: "point",

              valueFormatter: (date) => {
                return `${formatTimeMillis(date)} ${date.toLocaleTimeString(
                  [],
                  { hour: "numeric", minute: "numeric" }
                )}`;
              },
            },
          ]}
          series={[
            {
              data: dataPoints.totalUSD,
              label: "Total USD",
              color: theme.palette.fiatColor.main,
              showMark: false,

              valueFormatter: (value) =>
                `${formatTotalCurrency(value, "USD", 0)}`,
            },
            {
              data: dataPoints.BTCPrices,
              label: "BTC Price",
              color: theme.palette.cryptoColor.main,
              showMark: false,
              valueFormatter: (value) =>
                `${formatTotalCurrency(value, "USD", 0)}`,
            },
          ]}
        />
      )}
    </Box>
  );
};
