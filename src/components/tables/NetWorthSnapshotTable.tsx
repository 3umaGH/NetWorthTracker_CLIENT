import { useState, useEffect } from "react";

// React-Redux related imports
import { useDispatch, useSelector } from "react-redux";

// Material-UI (MUI) related imports
import { Box, Button, Tooltip, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";

// Constants related imports
import { currencySymbol } from "../../constants";

// Utility functions related imports
import { formatBTC, formatCurrency, formatTimeMillis } from "../../util";

// Emotion-related imports
import { useTheme } from "@emotion/react";

// App-related imports
import { RootState } from "../../app/Store";
import { AppDispatch } from "../../app/Store";

// Redux actions related imports
import {
  addSnapshot,
  deleteSnapshot,
  updateSnapshot,
} from "../../features/assets/assetsSlice";
import { saveUserData } from "../../features/assets/thunks";
import { DataGridToolBar } from "./components/DataGridToolBar";
import { NoRowsComponent } from "./components/NoRowsComponent";

export const NetWorthSnapshotTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const rows = assets.networthSnapshots;
  const mobileVersion = useMediaQuery(theme.breakpoints.down("md"));

  const [columnVisibilityModel, setColumnVisibilityModel] =
  useState<GridColumnVisibilityModel>();

  const HIDE_COLUMNS_MOBILE = {
    btcPrice: false,
    eurUSD: false,
    totalBTC: false,
    note: false,
  };

  useEffect(() => {
    setColumnVisibilityModel(mobileVersion ? HIDE_COLUMNS_MOBILE : {});
  }, [mobileVersion]);

  const getColor = (inputNum: number) => {
    if (inputNum === null || inputNum === undefined) return "black";

    if (inputNum > 0) return theme.palette.positiveColor.main;
    else if (inputNum < 0) return theme.palette.negativeColor.main;
  };

  const NetWorthTableActions = ({
    row,
    totalRows,
  }: {
    row: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
    totalRows: number;
  }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
      <Box sx={{ "& button": { m: 0, p: 0, minWidth: "30px" } }}>
        {row.id === totalRows && (
          <div>
            {!(totalRows >= 1000) && (
              <Tooltip title="Create new snapshot">
                <Button
                  variant="text"
                  color="success"
                  sx={{ fontSize: 18, p: 0, m: 0 }}
                  onClick={() => {
                    dispatch(addSnapshot());
                    dispatch(saveUserData());
                  }}
                >
                  🖬
                </Button>
              </Tooltip>
            )}

            <Tooltip title="Delete this snapshot">
              <Button
                variant="text"
                color="error"
                sx={{ fontSize: 18 }}
                onClick={() => {
                  dispatch(deleteSnapshot(row));
                  dispatch(saveUserData());
                }}
              >
                X
              </Button>
            </Tooltip>
          </div>
        )}
      </Box>
    );
  };

  const cellRenderer = (params: GridRenderCellParams) => {
    const { field, value } = params;

    switch (field) {
      case "dateTime":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "300",
            }}
          >
            {formatTimeMillis(value)}
          </Box>
        );
      case "btcPrice":
        return (
          <Box
            sx={{
              color: theme.palette.cryptoColor.main,
              fontWeight: "500",
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
            {currencySymbol}
            {value}
          </Box>
        );
      case "eurUSD":
        return (
          <Box
            sx={{
              color: theme.palette.conversionColor.main,
              fontWeight: "500",
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
            {currencySymbol}
            {value}
          </Box>
        );
      case "totalEUR":
        return (
          <Box
            sx={{
              color: getColor(params.row.changeEUR),
              fontWeight: "500",
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
            {`${formatCurrency(value, "EUR")} (${formatCurrency(
              params.row.changeEUR,
              "EUR",
              0
            )})`}
          </Box>
        );
      case "totalUSD":
        return (
          <Box
            sx={{
              color: getColor(params.row.changeUSD),
              fontWeight: "500",
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
            {`${formatCurrency(value, "USD")} (${formatCurrency(
              params.row.changeUSD,
              "USD",
              0
            )})`}
          </Box>
        );
      case "totalBTC":
        return (
          <Box
            sx={{
              color: theme.palette.cryptoColor.main,
              fontWeight: "500",
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
            {formatBTC(value)}
          </Box>
        );
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
      case "actions":
        return (
          <NetWorthTableActions row={params.row} totalRows={rows.length} />
        );
      default:
        return value;
    }
  };

  return (
    <DataGrid
      rows={rows}
      columnVisibilityModel={columnVisibilityModel}
      hideFooter={true}
      disableRowSelectionOnClick
      density={"compact"}
      onColumnVisibilityModelChange={(newModel) =>
        setColumnVisibilityModel(newModel)
      }
      columns={columns.map((column) => ({
        ...column,
        renderCell: cellRenderer,
      }))}
      slots={{
        noRowsOverlay: () => (
          <NoRowsComponent
            text="No snapshots here yet..."
            buttonText="Create Snapshot"
            buttonOnClick={() => {
              dispatch(addSnapshot());
              dispatch(saveUserData());
            }}
          />
        ),
        toolbar: mobileVersion ? DataGridToolBar : null,
      }}

      processRowUpdate={(updatedRow, originalRow) => {
        if (updatedRow.note.length > 100) {
          alert("Maximum 100 symbols!");
          return originalRow;
        }

        dispatch(updateSnapshot(updatedRow));
        dispatch(saveUserData());

        return updatedRow;
      }}
      onProcessRowUpdateError={(e) => console.log(e)}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: "dateTime",
    headerName: "Date & Time",
    flex: 0.125,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "btcPrice",
    headerName: "BTC Price",
    flex: 0.125,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "eurUSD",
    headerName: "EUR/USD",
    flex: 0.125,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalEUR",
    headerName: "Total EUR",
    flex: 0.125,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalUSD",
    headerName: "Total USD",
    flex: 0.125,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalBTC",
    headerName: "Total BTC",
    flex: 0.125,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "note",
    headerName: "Note",
    editable: true,
    flex: 0.25,

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
