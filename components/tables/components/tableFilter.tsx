import React, { Fragment, useState } from "react";
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Menu,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

type TableFilterType = {
  filters: string[];
  filterState: `${string}-${Operators}-${string}` | null;
  onFilter: (payload: FilterPayload) => void;
};

export default function TableFilter({  filters, filterState, onFilter, }: TableFilterType) {
  const [filter, setFilter] = useState<FilterPayload | null>(() => {
    if (filterState) {
      const [filterId, operator, param] = filterState.split("-") as [ string, Operators, string ];
      return { filterId, operator, param };
    }
    return null;
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Tooltip title="Filter list" placement="top">
        <IconButton onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button", }}
        elevation={0}
        anchorOrigin={{ vertical: "top", horizontal: "right", }}
        transformOrigin={{ vertical: "top", horizontal: "right", }}
      >
        <Paper>
          <Box px={3} py={1}>
            <Stack direction={"row"} alignItems={"center"}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="field-label">Field</InputLabel>
                <Select
                  labelId="field-label"
                  id="field"
                  value={filter?.filterId || ""}
                  onChange={(e) =>
                    setFilter((state) => {
                      if (state === null) return { filterId: e.target.value, param: "", operator: "contains", };
                      return { ...state, filterId: e.target.value };
                    })
                  }
                  label="Field"
                >
                  {filters.map((ft) => ( <MenuItem key={ft} value={ft}> {ft} </MenuItem> ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="operator-label">Opterator</InputLabel>
                <Select<Operators>
                  labelId="operator-label"
                  id="operator"
                  value={filter?.operator || ""}
                  onChange={(e) =>
                    setFilter((state) => {
                      if (state === null) return { filterId: "", param: "", operator: e.target.value as Operators, };
                      return { ...state, operator: e.target.value as Operators, };
                    })
                  }
                  label="Operator"
                >
                  <MenuItem value={"contains"}>Contains</MenuItem>
                  <MenuItem value={"equals"}>Equals</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="filter"
                variant="standard"
                sx={{ width: 100 }}
                value={filter?.param || ""}
                onChange={(e) =>
                  setFilter((state) => {
                    if (state === null) return { filterId: "", param: e.target.value, operator: "contains", };
                    return { ...state, param: e.target.value };
                  })
                }
              />
            </Stack>
            <Button
              variant="text"
              disabled={!Boolean(filter)}
              onClick={() => {
                if (!filter?.filterId || !filter?.operator || !filter?.param) return handleClose();
                onFilter(filter);
                handleClose();
              }}
            >
              Filter
            </Button>
          </Box>
        </Paper>
      </Menu>
    </Fragment>
  );
}
