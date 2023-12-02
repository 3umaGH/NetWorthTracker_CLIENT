import { Box, Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/Store";
import { addSnapshot, deleteSnapshot } from "../../features/assets/assetsSlice";

export const NetWorthTableActions = ({
  rowID,
  totalRows,
}: {
  rowID: number;
  totalRows: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box sx={{ "& button": { m: 0, p: 0, minWidth: "30px" } }}>
      {rowID === totalRows && (
        <div>
          {!(totalRows >= 1000) && (
            <Tooltip title="Create new snapshot">
              <Button
                variant="text"
                color="success"
                sx={{ fontSize: 18, p: 0, m: 0 }}
                onClick={() => dispatch(addSnapshot())}
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
              onClick={() => dispatch(deleteSnapshot(rowID))}
            >
              X
            </Button>
          </Tooltip>
        </div>
      )}
    </Box>
  );
};
