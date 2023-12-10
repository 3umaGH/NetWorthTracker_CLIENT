import { Box, Typography, Button } from "@mui/material";

import { NetworthSnapshot } from "../../../constants";
import { useTheme } from "@emotion/react";
import { formatCurrency } from "../../../util";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";

export const NetworthRowDetails = ({
  row,
  onClose,
}: {
  row: NetworthSnapshot;
  onClose: () => void;
}) => {
  const userParams = useSelector((state: RootState) => state.userParams);
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "500px",
        overflow: "auto",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" align="center">
        Snapshot Details
      </Typography>
      <Typography variant="subtitle2" align="center">
        {new Date(row.dateTime).toDateString()}
      </Typography>

      <Typography variant="h5" align="center" sx={{ mt: 1 }}>
        Assets
      </Typography>
      {row.lastAssetPrices.map((asset) => (
        <Box
          key={asset.ticker + asset.amount}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            align="center"
            sx={{
              mt: 1,
              maxWidth: "50%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              color: theme.palette.text.secondary,
            }}
          >
            {asset.ticker}
          </Typography>
          {
            <Typography
              sx={{
                color:
                  asset.amount >= 0
                    ? theme.palette.fiatColor.main
                    : theme.palette.negativeColor.main,
                ...(userParams.discreetMode
                  ? {
                      filter: "blur(4px)",
                      "&:hover": {
                        filter: "blur(0px)",
                      },
                    }
                  : {}),
              }}
            >{`${formatCurrency(
              asset.amount * asset.lastPrice,
              "USD",
              2
            )}`}</Typography>
          }
        </Box>
      ))}

      <Typography variant="h5" align="center" sx={{ mt: 1 }}>
        Fiat Assets
      </Typography>
      {(row.fiatAssets ?? []).map(
        // Add support for snapshots before updates
        (asset) => (
          <Box
            key={asset.id}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              align="center"
              sx={{
                mt: 1,
                maxWidth: "25%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                color: theme.palette.text.secondary,
              }}
            >
              {asset.note || "No Title"}
            </Typography>
            {
              <Typography
                sx={{
                  color:
                    asset.amount >= 0
                      ? theme.palette.fiatColor.main
                      : theme.palette.negativeColor.main,
                  ...(userParams.discreetMode
                    ? {
                        filter: "blur(4px)",
                        "&:hover": {
                          filter: "blur(0px)",
                        },
                      }
                    : {}),
                }}
              >{`${formatCurrency(
                asset.amount,
                asset.currency,
                2
              )}`}</Typography>
            }
          </Box>
        )
      )}

      <Button
        variant="outlined"
        onClick={onClose}
        sx={{ width: "200px", mt: 2 }}
      >
        Close
      </Button>
    </Box>
  );
};
