// Emotion-related imports
import { useTheme } from "@emotion/react";

// React-Redux related imports
import { useSelector } from "react-redux";

// Material-UI (MUI) related imports
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

// App-related imports
import { RootState } from "../../app/Store";

export const AssetAllocationChart = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const theme = useTheme();

  return (
    <PieChart
      slotProps={{ legend: { hidden: true } }}
      colors={[
        theme.palette.cryptoColor.main,
        theme.palette.positiveColor.main,
        theme.palette.stockColor.main,
      ]}
      series={[
        {
          innerRadius: 68,
          data: [
            {
              id: 0,
              value: assets.totals.crypto,
              label: "Crypto",
            },
            {
              id: 1,
              value: assets.totals.fiat,
              label: "Fiat",
            },
            {
              id: 2,
              value: assets.totals.stocks,
              label: "Stocks",
            },
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
          fontWeight: 600,
        },
      }}
    />
  );
};
