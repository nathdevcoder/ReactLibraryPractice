import * as React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import TableFilter from "./tableFilter";
import TableDelete from "./tableDelete";

interface EnhancedTableToolbarProps {
  numSelected: number;
  heading?: string;
  filters: string[];
  onFilter: (payload: FilterPayload) => void;
  filterState: `${string}-${Operators}-${string}` | null;
}

export default function EnhancedTableToolbar({ numSelected, heading, filters, onFilter, filterState }: EnhancedTableToolbarProps) {
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography  sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div" >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div" >
          {heading}
        </Typography>
      )}
      {numSelected > 0 ? (
        <TableDelete toDelete={numSelected} />
      ) : (
        <React.Fragment>
          <Tooltip title="Columns" placement="top">
            <IconButton>
              <ViewColumnIcon />
            </IconButton>
          </Tooltip>
          <TableFilter filters={filters} onFilter={onFilter} filterState={filterState} />
        </React.Fragment>
      )}
    </Toolbar>
  );
}
