import React, { Fragment  } from "react";
import { 
  Button,
  Box,
  Menu,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"; 
import DeleteIcon from '@mui/icons-material/Delete'; 

type TableDeleteType = {
    toDelete: number
};

export default function TableDelete({toDelete}: TableDeleteType) { 
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
       <Tooltip title="Delete">
          <IconButton onClick={handleClick}>
            <DeleteIcon />
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
          <Typography>Delete this {toDelete} Fields?</Typography>
            <Button
              variant="text" 
              onClick={() =>{
                alert('alart deleting')
                handleClose()
              }}
            >
              Delete
            </Button>
          </Box>
        </Paper>
      </Menu>
    </Fragment>
  );
}
