import { Input } from "@mui/icons-material";
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
import { useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store";
import { addFiatAsset } from "../../features/assets/assetsSlice";
import { fiatAsset } from "../../constants";

export const AddFiatAsset = ({
  availableCurrencies,
  onClose,
}: {
  availableCurrencies: String[];
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    note: "-",
    currency: availableCurrencies[0],
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
      } as fiatAsset)
    );

    onClose();
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <Box
        sx={{
          width:"100%",
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
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            } // Disable e, + - chars
            sx={{ width: "60%" }}
          />
          <FormControl sx={{ ml: 2, width: "35%" }}>
            <InputLabel>Currency</InputLabel>
            <Select
              required
              name="currency"
              value={availableCurrencies[0]}
              label="Currency"
              onChange={(e) => handleChange(e)}
            >
              {availableCurrencies.map((currency) => (
                <MenuItem key={currency as string} value={currency as string}>
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
