import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { RootState } from "../../app/Store";
import { convertCurrency, formatTotalCurrency } from "../../util";
import { currencySymbols } from "../../constants";
import { Typography, Box } from "@mui/material";

export const AssetAllocationChart = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const prices = useSelector((state: RootState) => state.prices);
  const theme = useTheme();

  const formatter = (data: any) =>
    `${formatTotalCurrency(
      convertCurrency("from", prices, assets.secondaryISO_4217, data.value),
      assets.secondaryISO_4217 as keyof typeof currencySymbols,
      0
    )}  /  ${formatTotalCurrency(data.value, "USD", 0)}`;

  return (
    <>
      {assets.totals.cryptoUSD === 0 &&
      assets.totals.USD === 0 &&
      assets.totals.fiatUSD === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center">
            No Data
          </Typography>
          <Typography variant="caption" align="center" color="gray">
            Add some assets to see the charts.
          </Typography>
        </Box>
      ) : (
        <PieChart
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          margin={{ left: 100, right: 100 }}
          colors={[
            theme.palette.cryptoColor.main,
            theme.palette.positiveColor.main,
            theme.palette.stockColor.main,
          ]}
          series={[
            {
              innerRadius: 40,
              outerRadius: 135,
              cornerRadius: 10,
              data: [
                {
                  id: 0,
                  value: assets.totals.cryptoUSD,
                  label: "Crypto",
                },
                {
                  id: 1,
                  value: assets.totals.fiatUSD,
                  label: "Fiat",
                },
                {
                  id: 2,
                  value: assets.totals.stocksUSD,
                  label: "Stocks",
                },
              ],
              valueFormatter: formatter,
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
              fontWeight: 600,
            },
          }}
        />
      )}
    </>
  );
};
