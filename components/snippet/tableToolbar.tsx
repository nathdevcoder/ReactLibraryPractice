import * as React from 'react';
import { alpha } from '@mui/material/styles'; 
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; 
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'; 
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList'; 
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import {  Menu, MenuItem, } from '@mui/material';
import TableFilter from './tableFilter';

interface EnhancedTableToolbarProps {
    numSelected: number;
    heading?: string
    filters: string[]
    onFilter: (payload: FilterPayload) => void;
    filterState: `${string}-${Operators}-${string}` | null;
    
  }

export default function EnhancedTableToolbar({ numSelected, heading, filters, onFilter,filterState }: EnhancedTableToolbarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div" 
          >
            {heading}
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <React.Fragment>
            <Tooltip title="Columns" placement='top' >
              <IconButton>
                <ViewColumnIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter list"  placement='top'>
              <IconButton onClick={handleClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }} 
          elevation={0}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem sx={{bgcolor: 'dimgray'}}><TableFilter filters={filters} onFilter={onFilter} filterState={filterState} onClose={handleClose} /></MenuItem>
        </Menu>
      </Toolbar>
    );
  }