import { Grid, Box, Typography, Divider } from "@mui/material";
import { conversionColor, negativeColor, positiveColor } from "../constants";

export const BalanceFooter = () => {
  return (
    <Box textAlign={"center"}>
      <Typography variant="h2" color={"black"} fontSize={28} fontWeight={700}>
        <Grid container>
          <Grid item xs={12} md={3} sx={{ color: conversionColor, mb: 1 }}>
            <span>1€ = 1.0941</span>
          </Grid>
          <Grid item xs={12} md={4.5} sx={{ color: positiveColor, mb: 1 }}>
            <span>Total (USD): 1.203M (-1231)</span>
          </Grid>
          <Grid item xs={12} md={4.5} sx={{ color: negativeColor, mb: 1 }}>
            <span>Total (EUR): €1.203M (-€1231)</span>
          </Grid>
        </Grid>
      </Typography>
      <Divider />
    </Box>
  );
};
