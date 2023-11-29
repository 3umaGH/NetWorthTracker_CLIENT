import { useTheme } from "@emotion/react";
import { Grid, Box, Typography, Divider } from "@mui/material";

export const BalanceFooter = () => {
  const theme = useTheme();
  
  return (
    <Box textAlign={"center"}>
      <Typography variant="h2" color={"black"} fontSize={28} fontWeight={700}>
        <Grid container>
          <Grid item xs={12} md={3} sx={{ color: theme.palette.conversionColor.main, mb: 1 }}>
            <span>1€ = 1.0941</span>
          </Grid>
          <Grid item xs={12} md={4.5} sx={{ color: theme.palette.positiveColor.main, mb: 1 }}>
            <span>Total (USD): 1.203M (-1231)</span>
          </Grid>
          <Grid item xs={12} md={4.5} sx={{ color: theme.palette.negativeColor.main, mb: 1 }}>
            <span>Total (EUR): €1.203M (-€1231)</span>
          </Grid>
        </Grid>
      </Typography>
      <Divider />
    </Box>
  );
};
