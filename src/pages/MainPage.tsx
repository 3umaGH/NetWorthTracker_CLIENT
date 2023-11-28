import { Container, Grid, Box, Typography, Divider } from "@mui/material";
import { AssetAllocationChart } from "../components/charts/AssetAllocationChart";
import { NetWorthSnapshotTable } from "../components/tables/NetWorthSnapshotTable";
import { AssetsTable } from "../components/tables/AssetsTable";
import { FiatAssetsTable } from "../components/tables/FiatAssetsTable";
import { CellTitle } from "../components/CellTitle";

export const MainPage = () => {
  return (
    <Box sx={{ backgroundColor: "" }}>
      <Grid container rowSpacing={6} columnSpacing={0.25}>
        <Grid item xs={12} md={4}>
          <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
            <CellTitle title="Asset Allocation" />

            <Box sx={{ width: "90%", height: "90%", p: 4 }}>
              <AssetAllocationChart />
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} md={8}>
          <Container maxWidth={false} disableGutters sx={{ height: "45vh" }}>
            <CellTitle title="Snapshots" />
            <NetWorthSnapshotTable />
          </Container>
        </Grid>

        <Grid item xs={12} md={9}>
          <Container maxWidth={false} disableGutters sx={{ height: "38vh" }}>
            <CellTitle title="Assets" />
            <AssetsTable />
          </Container>
        </Grid>
        <Grid item xs={12} md={3}>
          <Container maxWidth={false} disableGutters sx={{ height: "38vh" }}>
            <CellTitle title="Fiat Assets" />
            <FiatAssetsTable />
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ maxHeight: { xs: "20vh", md: "5vh" }, mb: { xs: 4, md: 0 } }}
        >
          <Box textAlign={"center"}>
            <Divider />
            <Typography
              variant="h2"
              color={"black"}
              fontSize={28}
              fontWeight={700}
            >
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
        </Grid>
      </Grid>
    </Box>
  );
};
