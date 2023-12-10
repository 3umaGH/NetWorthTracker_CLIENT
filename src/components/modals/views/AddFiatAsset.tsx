import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { addFiatAsset } from "../../../features/assets/assetsSlice";
import { FiatAsset, noteCharLimit } from "../../../constants";
import { saveUserData } from "../../../features/assets/thunks";
import { AppDispatch, RootState } from "../../../app/Store";

export const AddFiatAsset = ({ onClose }: { onClose: () => void }) => {
  const prices = useSelector((state: RootState) => state.prices);
  const dispatch = useDispatch<AppDispatch>();

  const currencyTickers = prices.currencyRates.map((curr) => curr.ticker);

  const [formData, setFormData] = useState({
    note: "",
    currency: currencyTickers.find((cur) => cur === "USD"),
    amount: "0",
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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addFiatAsset({
        id: 0, // Id is assigned automatically
        currency: formData.currency,
        amount: parseFloat(formData.amount),
        note: formData.note,
      } as FiatAsset)
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
          Add Fiat Asset
        </Typography>
        <TextField
          inputProps={noteCharLimit}
          name="note"
          label="Note"
          variant="standard"
          onChange={(e) => handleChange(e)}
          sx={{ width: "100%" }}
        />

        <div>
          <TextField
            required
            InputProps={{ inputProps: { min: -1000000000, max: 1000000000 } }}
            name="amount"
            label="Amount"
            type="number"
            variant="standard"
            onChange={(e) => handleChange(e)}
            onKeyDown={(evt) =>
              ["e", "E", "+"].includes(evt.key) && evt.preventDefault()
            } // Disable e, + - chars
            sx={{ width: "60%" }}
          />
          <FormControl sx={{ ml: 2, width: "35%" }}>
            <InputLabel>Currency</InputLabel>
            <Select
              required
              name="currency"
              value={formData.currency}
              label="Currency"
              onChange={(e) => handleChange(e)}
            >
              {currencyTickers.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button type="submit" variant="outlined" color="success">
          Add
        </Button>
      </Box>
    </form>
  );
};
