import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { formatCurrency } from "../../util";
import { useTheme } from "@emotion/react";
import { RootState } from "../../app/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store";
import { deleteAsset } from "../../features/assets/assetsSlice";

export const AssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const theme = useTheme();

  const getColor = (inputNum: number) => {
    if (inputNum === null || inputNum === undefined) return "black";

    if (inputNum > 0) return theme.palette.positiveColor.main;
    else if (inputNum < 0) return theme.palette.negativeColor.main;
  };

  const rows = assets.assets;

  const columns: GridColDef[] = [
    {
      field: "note",
      headerName: "Note",
      editable: true,
      flex: 0.375,
    },
    {
      field: "ticker",
      headerName: "Ticker",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Last Price",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 0.125,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.07,

      align: "center",
      headerAlign: "center",
    },
  ];

  const TableActions = ({
    row,
  }: {
    row: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
      <Box sx={{ "& button": { m: 0, p: 0, minWidth: "30px" } }}>
        <Button
          variant="text"
          color="primary"
          sx={{ fontSize: 18, p: 0, m: 0 }}
        >
          ✓
        </Button>
        <Button
          variant="text"
          color="error"
          sx={{ fontSize: 18 }}
          onClick={() => dispatch(deleteAsset(row))}
        >
          X
        </Button>
      </Box>
    );
  };

  const cellRenderer = (params: GridRenderCellParams) => {
    const { field, value } = params;

    switch (field) {
      case "note":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "200",
            }}
          >
            {value}
          </Box>
        );
      case "ticker":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "700",
            }}
          >
            {value}
          </Box>
        );
      case "type":
        return (
          <Box
            sx={{
              color:
                value === "Crypto"
                  ? theme.palette.cryptoColor.main
                  : theme.palette.stockColor.main,
              fontWeight: "600",
            }}
          >
            {value}
          </Box>
        );
      case "amount":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "200",
            }}
          >
            {`${value.toFixed(params.row.type === "Crypto" ? 4 : 0)} ${
              params.row.ticker
            }`}
          </Box>
        );

      case "price":
        return (
          <Box
            sx={{
              color: getColor(params.row.change),
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, params.row.currency)} (${formatCurrency(
              params.row.change,
              params.row.currency,
              0
            )})`}
          </Box>
        );
      case "totalPrice":
        return (
          <Box
            sx={{
              color: getColor(params.row.change * value),
              fontWeight: "500",
            }}
          >
            {`${formatCurrency(value, params.row.currency)} (${formatCurrency(
              params.row.change * params.row.amount,
              params.row.currency,
              0
            )})`}
          </Box>
        );
      case "actions":
        return <TableActions row={params.row} />;
      default:
        return value;
    }
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns.map((column) => ({
        ...column,
        renderCell: cellRenderer,
      }))}
      hideFooter={true}
      disableRowSelectionOnClick
      density={"compact"}
    />
  );
};
