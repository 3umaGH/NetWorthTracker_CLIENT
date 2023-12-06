import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { formatCurrency } from "../../util";
import { useTheme } from "@emotion/react";
import { RootState } from "../../app/Store";
import { AppDispatch } from "../../app/Store";
import { deleteAsset, updateAsset } from "../../features/assets/assetsSlice";
import BasicModal from "../modals/BasicModal";
import { AddAsset } from "../modals/views/AddAsset";
import {
  saveUserData,
  updateNumbers,
  updateTotals,
} from "../../features/assets/thunks";
import { DataGridToolBar } from "./components/DataGridToolBar";
import { NoRowsComponent } from "./components/NoRowsComponent";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export const AssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>();
  const mobileVersion = useMediaQuery(theme.breakpoints.down("md"));
  const rows = assets.assets;

  const HIDE_COLUMNS_MOBILE = {
    note: false,
    type: false,
    amount: false,
  };

  useEffect(() => {
    setColumnVisibilityModel(mobileVersion ? HIDE_COLUMNS_MOBILE : {});
  }, [mobileVersion]);

  const getColor = (inputNum: number) => {
    if (inputNum === null || inputNum === undefined) return "black";

    if (inputNum > 0) return theme.palette.positiveColor.main;
    else if (inputNum < 0) return theme.palette.negativeColor.main;
  };

  const TableActions = ({
    row,
  }: {
    row: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  }) => {
    return (
      <Box sx={{ "& button": { m: 0, p: 0, minWidth: "30px" } }}>
        <Button
          variant="text"
          color="success"
          sx={{ fontSize: 22 }}
          onClick={() => setAddIsOpen(true)}
        >
          <AddIcon />
        </Button>
        <Button
          variant="text"
          color="error"
          sx={{ fontSize: 18 }}
          onClick={() => {
            dispatch(deleteAsset(row));
            dispatch(saveUserData());
          }}
        >
          <ClearIcon />
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
            {`${formatCurrency(value, params.row.currency)} (${formatCurrency(
              params.row.change ?? 0,
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
            {`${formatCurrency(value, params.row.currency)} (${formatCurrency(
              (params.row.change ?? 0) * params.row.amount,
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
    <>
      {addIsOpen && (
        <BasicModal
          onClose={() => setAddIsOpen(false)}
          sx={{ minWidth: "260px", maxWidth: "500px" }}
        >
          <AddAsset onClose={() => setAddIsOpen(false)} />
        </BasicModal>
      )}

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
              text="No assets here yet..."
              buttonText="Add Asset"
              buttonOnClick={() => setAddIsOpen(true)}
            />
          ),
          toolbar: mobileVersion ? DataGridToolBar : null,
        }}
        processRowUpdate={(updatedRow, originalRow) => {
          if (updatedRow.note.length > 100) {
            alert("Maximum 100 symbols!");
            return originalRow;
          }

          if (updatedRow.amount <= 0 || updatedRow.amount >= 1000000000)
            return originalRow;

          dispatch(updateAsset(updatedRow));

          dispatch(updateNumbers()).then(() =>
            dispatch(updateTotals()).then(() => {
              dispatch(saveUserData());
            })
          );

          return updatedRow;
        }}
        onProcessRowUpdateError={(e) => console.log(e)}
      />
    </>
  );
};

const columns: GridColDef[] = [
  {
    field: "note",
    headerName: "Note",
    editable: true,
    flex: 0.15,
    minWidth: 150,
  },
  {
    field: "ticker",
    headerName: "Ticker",

    flex: 0.125,
    minWidth: 100,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.125,
    minWidth: 100,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    editable: true,
    flex: 0.125,
    minWidth: 150,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Last Price",
    flex: 0.125,
    minWidth: 150,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    flex: 0.125,
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
