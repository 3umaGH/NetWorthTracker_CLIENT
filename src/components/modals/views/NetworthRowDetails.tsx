import { Box, Typography, Grid } from "@mui/material";
import { useMemo } from "react";
import {
  FiatAsset,
  LastAssetPrice,
  NetworthSnapshot,
} from "../../../constants";
import { useTheme } from "@emotion/react";
import { combineAssets, formatCurrency } from "../../../util";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";

export const NetworthRowDetails = ({
  row,
  prevRow,
}: {
  row: NetworthSnapshot;
  prevRow: NetworthSnapshot | undefined;
}) => {
  const userParams = useSelector((state: RootState) => state.userParams);
  const theme = useTheme();

  type CombinedAsset = {
    ticker?: string;
    amount?: string;
    total: number;
    currency: string;
  };

  const convertAsset = (assets: FiatAsset[] | LastAssetPrice[]) => {
    return assets.map((asset) => ({
      ticker: "ticker" in asset ? asset.ticker : asset.currency,
      total:
        "lastPrice" in asset ? asset.amount * asset.lastPrice : asset.amount,
      amount: asset.amount,
      currency: asset.currency,
    }));
  };

  const combinedAssets = useMemo(
    () => ({
      assets: combineAssets(convertAsset(row.lastAssetPrices ?? [])),
      fiat: combineAssets(convertAsset(row.fiatAssets ?? [])),

      prev: {
        assets: combineAssets(convertAsset(prevRow?.lastAssetPrices ?? [])),
        fiat: combineAssets(convertAsset(prevRow?.fiatAssets ?? [])),
      },
    }),
    []
  );

  const ChangeComponent = ({
    type,
    asset,
  }: {
    type: "Asset" | "Fiat";
    asset: CombinedAsset;
  }) => {
    const matchingAsset =
      type === "Asset"
        ? combinedAssets.prev.assets.find((a) => a.ticker === asset.ticker)
        : combinedAssets.prev.fiat.find((a) => a.ticker === asset.ticker);

    const diff = matchingAsset
      ? asset.total - matchingAsset.total
      : asset.total;

    if (isNaN(diff)) return;

    const formattedString = `( ${diff >= 0 ? "+" : ""}${formatCurrency(
      diff,
      asset.currency,
      0
    )} ${matchingAsset ? "" : "New!"})`;

    return (
      <Typography
        sx={{
          ml: 1,
          color:
            diff >= 0
              ? theme.palette.positiveColor.main
              : theme.palette.negativeColor.main,
        }}
      >
        {`${diff === 0 ? "" : formattedString}`}
      </Typography>
    );
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
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

        <Grid container rowSpacing={6} columnSpacing={0.25}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" sx={{ mt: 1 }}>
              Assets
            </Typography>

            {combinedAssets.assets.length === 0 && (
              <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                No Data
              </Typography>
            )}

            {combinedAssets.assets.map((asset: CombinedAsset) => (
              <Box
                key={asset.ticker}
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
                    maxWidth: "100%",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: theme.palette.text.secondary,
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
                  {`${asset.amount ?? 0} ${asset.ticker}`}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
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
                  <Typography
                    sx={{
                      color:
                        asset.total >= 0
                          ? theme.palette.fiatColor.main
                          : theme.palette.negativeColor.main,
                    }}
                  >
                    {`${formatCurrency(asset.total, asset.currency, 2)}`}
                  </Typography>
                  <ChangeComponent type="Asset" asset={asset} />
                </Box>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" sx={{ mt: 1 }}>
              Fiat Assets
            </Typography>

            {combinedAssets.fiat.length === 0 && (
              <Typography variant="h6" align="center" sx={{ mt: 1 }}>
                No Data
              </Typography>
            )}

            {combinedAssets.fiat.map((asset: CombinedAsset) => (
              <Box
                key={asset.ticker}
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
                    maxWidth: "100%",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: theme.palette.text.secondary,

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
                  {`${asset.amount ?? 0} ${asset.currency}`}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
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
                  <Typography
                    sx={{
                      color:
                        asset.total >= 0
                          ? theme.palette.fiatColor.main
                          : theme.palette.negativeColor.main,
                    }}
                  >
                    {`${formatCurrency(asset.total, asset.currency, 2)}`}
                  </Typography>
                  <ChangeComponent type="Fiat" asset={asset} />
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Typography
        variant="caption"
        sx={{ mt: 2, color: theme.palette.text.secondary }}
      >
        * The highlighted changes are based on the comparison between the
        current snapshot and its preceding version.
      </Typography>
    </Box>
  );
};
