import { useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/Store";
import { getCurrencyRate, getCurrencySymbol } from "../../../util";
import { setSecondaryCurrency } from "../../../features/assets/assetsSlice";
import { saveUserData } from "../../../features/assets/thunks";

export const CurrencySelector = ({ onClose }: { onClose: () => void }) => {
  const prices = useSelector((state: RootState) => state.prices);
  const dispatch = useDispatch<AppDispatch>();

  const [clickedButton, setClickedButton] = useState<String>();

  return (
    <Box
      sx={{
        width: "100%",
        height: "330px",
      }}
    >
      <Typography variant="h5" align="center">
        Secondary currency
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 3,
          height: "220px",
          overflowY: "auto",
        }}
      >
        {prices.currencyRates.map((currency) => (
          <Tooltip
            placement="top"
            title={`1$ = ${getCurrencyRate(
              prices,
              currency.ticker
            )}${getCurrencySymbol(currency.ticker)}`}
          >
            <Button
              variant={
                clickedButton === currency.ticker ? "contained" : "outlined"
              }
              sx={{ m: 1 }}
              onClick={() => setClickedButton(currency.ticker)}
            >
              {currency.ticker}
            </Button>
          </Tooltip>
        ))}
      </Box>

      {clickedButton ? (
        <Button
          variant="outlined"
          color="positiveColor"
          sx={{ mt: 3 }}
          onClick={() => {
            dispatch(setSecondaryCurrency(clickedButton as string));
            dispatch(saveUserData());
            onClose();
          }}
        >
          Set {clickedButton} as secondary currency
        </Button>
      ) : (
        <Typography
          align="center"
          variant="subtitle2"
          color="gray"
          sx={{ mt: 3 }}
        >
          Select currency to continue
        </Typography>
      )}
    </Box>
  );
};
