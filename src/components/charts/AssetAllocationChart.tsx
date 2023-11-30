import { useTheme } from "@emotion/react";
import { RootState } from "../../app/Store";
import { useSelector } from "react-redux";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

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
              value: assets.assets.reduce(
                (sum, obj) =>
                  obj.type === "Crypto"
                    ? sum + (obj.totalPrice as number)
                    : (sum = sum),
                0
              ),
              label: "Crypto",
            },
            {
              id: 1,
              value: assets.fiatAssets.reduce(
                (sum, obj) => sum + (obj.amount as number),
                0
              ),
              label: "Fiat",
            },
            {
              id: 2,
              value: assets.assets.reduce(
                (sum, obj) =>
                  obj.type === "Stock"
                    ? sum + (obj.totalPrice as number)
                    : (sum = sum),
                0
              ),
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
