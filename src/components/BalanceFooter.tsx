import { Grid, Box, Typography, Divider } from "@mui/material";

export const BalanceFooter = () => {
  return (
    <Box textAlign={"center"}>
      <Typography variant="h2" color={"black"} fontSize={28} fontWeight={700}>
        <Grid container>
          <Grid item xs={12} md={3} sx={{ backgroundColor: "#b8fff3" }}>
            <span>1€ = 1.0941</span>
          </Grid>
          <Grid item xs={12} md={4.5} sx={{ backgroundColor: "#b8ffbc" }}>
            <span>Total (USD): 1.203M (-1231)</span>
          </Grid>
          <Grid item xs={12} md={4.5} sx={{ backgroundColor: "#ffb8c2" }}>
            <span>Total (EUR): €1.203M (-€1231)</span>
          </Grid>
        </Grid>
      </Typography>
      <Divider />
    </Box>
  );
};
