import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Tooltip, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  formatBTC,
  formatCurrency,
  formatTimeMillis,
  formatTotalCurrency,
  getCurrencySymbol,
} from "../../util";
import { useTheme } from "@emotion/react";
import { RootState } from "../../app/Store";
import { AppDispatch } from "../../app/Store";
import {
  deleteSnapshot,
  updateSnapshot,
} from "../../features/assets/assetsSlice";
import { createSnapshot, saveUserData } from "../../features/assets/thunks";
import { DataGridToolBar } from "./components/DataGridToolBar";
import { NoRowsComponent } from "./components/NoRowsComponent";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ClearIcon from "@mui/icons-material/Clear";

export const NetWorthSnapshotTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const rows = assets.networthSnapshots;
  const mobileVersion = useMediaQuery(theme.breakpoints.down("md"));
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>();
  const tableRef = useGridApiRef();

  const HIDE_COLUMNS_MOBILE = {
    btcPrice: false,
    secondaryCurrency: false,
    totalBTC: false,
    totalUSD: false,
    note: false,
  };

  const handleScrollToLastItem = () => {
    if (tableRef.current)
      tableRef.current.scrollToIndexes({
        rowIndex: rows.length - 1,
        colIndex: 0,
      });
  };

  useEffect(() => {
    setTimeout(() => handleScrollToLastItem(), 100);
  }, [rows.length]);

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
                  onClick={() => {
                    dispatch(createSnapshot()).then(() =>
                      dispatch(saveUserData())
                    );
                  }}
                >
                  <PostAddIcon />
                </Button>
              </Tooltip>
            )}

            <Tooltip title="Delete snapshot">
              <Button
                variant="text"
                color="error"
                onClick={() => {
                  dispatch(deleteSnapshot(row));
                  dispatch(saveUserData());
                }}
              >
                <ClearIcon />
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
              cursor: params.isEditable ? "pointer" :"default",
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
              cursor: params.isEditable ? "pointer" :"default",
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
            {getCurrencySymbol("USD")}
            {value}
          </Box>
        );
      case "secondaryRate":
        return (
          <Box
            sx={{
              color: theme.palette.conversionColor.main,
              fontWeight: "500",
              cursor: params.isEditable ? "pointer" :"default",
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
            {formatTotalCurrency(
              parseFloat(value) || -1,
              params.row.secondaryISO_4217
            )}
          </Box>
        );
      case "totalSecondary":
        return (
          <Box
            sx={{
              color: getColor(params.row.changeSecondary),
              fontWeight: "500",
              cursor: params.isEditable ? "pointer" :"default",
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
            {`${formatCurrency(value, params.row.secondaryISO_4217)} 
            `}{" "}
            {params.row.changeSecondary !== 0 &&
              `(${formatCurrency(
                params.row.changeSecondary,
                params.row.secondaryISO_4217,
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
              cursor: params.isEditable ? "pointer" :"default",
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
              cursor: params.isEditable ? "pointer" :"default",
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
              cursor: params.isEditable ? "pointer" :"default",
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

  const columns: GridColDef[] = [
    {
      field: "dateTime",
      headerName: "Date & Time",
      flex: 0.125,
      minWidth: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "btcPrice",
      headerName: "BTC Price",
      flex: 0.125,
      minWidth: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "secondaryRate",
      headerName: `${assets.secondaryISO_4217}/USD`,
      flex: 0.125,
      minWidth: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalSecondary",
      headerName: `Total ${assets.secondaryISO_4217}`,
      flex: 0.225,
      minWidth: 180,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalUSD",
      headerName: "Total USD",
      flex: 0.225,
      minWidth: 180,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "totalBTC",
      headerName: "Total BTC",
      flex: 0.125,
      minWidth: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "note",
      headerName: "Note",
      editable: true,
      flex: 0.25,
      minWidth: 150,

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

  return (
    <DataGrid
      apiRef={tableRef}
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
              dispatch(createSnapshot()).then(() => dispatch(saveUserData()));
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
