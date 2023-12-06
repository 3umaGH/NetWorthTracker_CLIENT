import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, useMediaQuery } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  useGridApiRef,
} from "@mui/x-data-grid";
import { formatCurrency } from "../../util";
import { useTheme } from "@emotion/react";
import { RootState } from "../../app/Store";
import { AppDispatch } from "../../app/Store";
import {
  deleteFiatAsset,
  updateFiatAsset,
} from "../../features/assets/assetsSlice";
import BasicModal from "../modals/BasicModal";
import { AddFiatAsset } from "../modals/views/AddFiatAsset";
import {
  saveUserData,
  updateNumbers,
  updateTotals,
} from "../../features/assets/thunks";
import { DataGridToolBar } from "./components/DataGridToolBar";
import { NoRowsComponent } from "./components/NoRowsComponent";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export const FiatAssetsTable = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const prices = useSelector((state: RootState) => state.prices);
  const userParams = useSelector((state: RootState) => state.userParams);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>();
  const mobileVersion = useMediaQuery(theme.breakpoints.down("md"));

  const rows = assets.fiatAssets;
  const currencyTickers = prices.currencyRates.map((curr) => curr.ticker);
  const tableRef = useGridApiRef();

  const HIDE_COLUMNS_MOBILE = {
    /*None, it fits well*/
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
            dispatch(deleteFiatAsset(row));
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
              cursor: params.isEditable ? "pointer" :"default"
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
            {formatCurrency(value, params.row.currency)}
          </Box>
        );
      case "currency":
        return (
          <Box
            sx={{
              color: theme.palette.textColor.main,
              fontWeight: "500",
              cursor: params.isEditable ? "pointer" :"default",
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

  const columns: GridColDef[] = [
    {
      field: "note",
      headerName: "Note",
      editable: true,
      flex: 0.35,
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      editable: true,
      flex: 0.2,
      minWidth: 150,

      align: "center",
      headerAlign: "center",
    },
    {
      field: "currency",
      headerName: "Currency",
      editable: true,
      type: "singleSelect",
      valueOptions: currencyTickers,
      flex: 0.2,
      minWidth: 130,

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

  return (
    <>
      {addIsOpen && (
        <BasicModal
          onClose={() => setAddIsOpen(false)}
          sx={{ minWidth: "260px", maxWidth: "500px" }}
        >
          <AddFiatAsset onClose={() => setAddIsOpen(false)} />
        </BasicModal>
      )}
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
