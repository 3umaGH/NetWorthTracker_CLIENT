// React-related imports
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material-UI (MUI) related imports
import { Box, Button, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";

// Utility functions related imports
import { formatCurrency } from "../../util";

// Emotion-related imports
import { useTheme } from "@emotion/react";

// App-related imports
import { RootState } from "../../app/Store";
import { AppDispatch } from "../../app/Store";

// Redux actions related imports
import {
  deleteFiatAsset,
  updateFiatAsset,
} from "../../features/assets/assetsSlice";

// Component-related imports
import BasicModal from "../modals/BasicModal";
import { AddFiatAsset } from "../modals/AddFiatAsset";

// Constants related imports
import { availableCurrencies } from "../../constants";
import { saveUserData } from "../../features/assets/thunks";
import { DataGridToolBar } from "./components/DataGridToolBar";
import { NoRowsComponent } from "./components/NoRowsComponent";

export const FiatAssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] =
  useState<GridColumnVisibilityModel>();
  const mobileVersion = useMediaQuery(theme.breakpoints.down("md"));

  const rows = assets.fiatAssets;

  const HIDE_COLUMNS_MOBILE = {
    /*None, it fits well*/
  };

  useEffect(() => {
    setColumnVisibilityModel(mobileVersion ? HIDE_COLUMNS_MOBILE : {});
  }, [mobileVersion]);

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
          +
        </Button>

        <Button
          variant="text"
          color="error"
          sx={{ fontSize: 18 }}
          onClick={() => {
            dispatch(deleteFiatAsset(row));
            dispatch(saveUserData());
          }}
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
      case "amount":
        return (
          <Box
            sx={{
              color: theme.palette.fiatColor.main,
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
            {formatCurrency(value, params.row.currency)}
          </Box>
        );
      case "currency":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "500",
            }}
          >
            {value}
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
          <AddFiatAsset
            onClose={() => setAddIsOpen(false)}
            availableCurrencies={availableCurrencies}
          />
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

          if (updatedRow.amount >= 1000000000) return originalRow;

          dispatch(updateFiatAsset(updatedRow));
          dispatch(saveUserData());
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
    flex: 0.35,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    editable: true,
    flex: 0.2,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "currency",
    headerName: "Currency",
    editable: true,
    type: "singleSelect",
    valueOptions: availableCurrencies,
    flex: 0.2,

    align: "center",
    headerAlign: "center",
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.2,

    align: "center",
    headerAlign: "center",
  },
];
