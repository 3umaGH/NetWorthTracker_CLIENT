import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { cryptoColor, positiveColor, stockColor } from "../../constants";

export const AssetAllocationChart = () => {
  return (
    <PieChart
      slotProps={{ legend: { hidden: true } }}
      colors={[cryptoColor, positiveColor, stockColor]}
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
          fontWeight: 600,
        },
      }}
    />
  );
};
