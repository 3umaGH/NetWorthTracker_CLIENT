// React-related imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material-UI (MUI) related imports
import {
  Box,
  Button,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

// App-related imports
import { AppDispatch, RootState } from "../../app/Store";

// Redux actions related imports
import { addAsset } from "../../features/assets/assetsSlice";

// Constants related imports
import { Asset } from "../../constants";
import { saveUserData } from "../../features/assets/thunks";
import { getStockCurrency } from "../../util";

export const AddAsset = ({ onClose }: { onClose: () => void }) => {
  const assets = useSelector((state: RootState) => state.assets);
  const dispatch = useDispatch<AppDispatch>();
  const [viewingCrypto, setViewingCrypto] = useState(true);

  const stockTickers = assets.stockPrices.map((stock) => stock.ticker);
  const cryptoTickers = assets.cryptoPrices
    .filter((crypto) => crypto.symbol.endsWith("USDT"))
    .map((crypto) => crypto.symbol);
  const currencyTickers = assets.currencyRates.map((cur) => cur.ticker);

  const [formData, setFormData] = useState({
    note: "-",
    currency: "USD",
    amount: "0",
    type: "Crypto",
    ticker: "BTCUSDT",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<String>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (newValue: String | null) => {
    const selectedValue =
      newValue ?? (viewingCrypto ? cryptoTickers[0] : stockTickers[0]);

    setFormData((prevFields) => ({
      ...prevFields,
      ticker: selectedValue as string,
      currency: viewingCrypto
        ? "USD" // Supporting only USD for crypto atm.
        : getStockCurrency(assets, selectedValue as string),
      type: viewingCrypto ? "Crypto" : "Stock",
    }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.ticker === null) {
      alert("Please select correct ticker.");
      return;
    }

    const objNote =
      formData.note === "-"
        ? `My ${formData.ticker} Investment`
        : formData.note;

    const objTicker =
      formData.ticker === ""
        ? viewingCrypto
          ? cryptoTickers[0]
          : stockTickers[0]
        : formData.ticker;

    const objType =
      formData.type === ""
        ? viewingCrypto
          ? "Crypto"
          : "Stock"
        : formData.type;

    dispatch(
      addAsset({
        id: 0, // Id is assigned automatically
        note: objNote,
        ticker: objTicker,
        type: objType,
        currency: formData.currency,
        amount: parseFloat(formData.amount),
        lastPrice: 0,
        totalPrice: 0,
        price: 0,
      } as Asset)
    );

    dispatch(saveUserData());

    onClose();
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          gap: 4,
        }}
      >
        <Typography variant="h5" align="center">
          Add Asset
        </Typography>
        <TextField
          name="note"
          label="Note"
          variant="standard"
          onChange={(e) => handleChange(e)}
          sx={{ width: "100%" }}
        />

        <div>
          <TextField
            required
            InputProps={{
              inputProps: {
                min: 0.0000001,
                max: 1000000000,
                step: 0.000000001,
              },
            }}
            name="amount"
            label="Amount"
            type="number"
            variant="standard"
            onChange={(e) => handleChange(e)}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            } // Disable e, + - chars
            sx={{ width: "60%" }}
          />
          <FormControl sx={{ ml: 2, width: "35%" }}>
            <InputLabel>Currency</InputLabel>
            <Select
              required
              disabled
              name="currency"
              value={formData.currency}
              label="Currency"
              onChange={(e) => handleChange(e)}
            >
              {currencyTickers.map((currency) => (
                <MenuItem key={currency as string} value={currency as string}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {viewingCrypto ? (
          <Autocomplete
            id="amount"
            disablePortal
            onChange={(_e, newValue) => handleAutocompleteChange(newValue)}
            value={formData.ticker 

            }
            options={cryptoTickers}
            renderInput={(params) => (
              <TextField {...params} label="Crypto ticker" />
            )}
          />
        ) : (
          <Autocomplete
            id="amount"
            disablePortal
            onChange={(_e, newValue) => handleAutocompleteChange(newValue)}
            value={formData.ticker 

            }
            options={stockTickers}
            renderInput={(params) => (
              <TextField {...params} label="Stock ticker" />
            )}
          />
        )}

        <Button
          variant="outlined"
          color={viewingCrypto ? "stockColor" : "cryptoColor"}
          onClick={() => {
            setFormData({...formData, ticker: !viewingCrypto ? cryptoTickers[0] : stockTickers[0]});
            setViewingCrypto(!viewingCrypto)

            console.log(formData)
          }}
        >
          View {viewingCrypto ? "Stock pairs" : "Crypto pairs"}
        </Button>

        <Button type="submit" variant="outlined" color="success">
          Add
        </Button>
      </Box>
    </form>
  );
};
