 
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    Input,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem, 
} from "@mui/material";

import React, { MutableRefObject, useEffect, useRef, useState } from "react"; 

type listitemdirType = {
  title: string;
  Icon: React.ReactNode;
  onOpen: () => void; 
  onRename: (name: string) => void
};

export default function ListItemDir({ title, Icon, onOpen, onRename }: listitemdirType) {
  const [renaming, setRenaming] = useState(false)
  const [name, setName] = useState(title)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const inputref = useRef() as MutableRefObject<HTMLInputElement>;
 
  function onRightClickHandler( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }
 
  useEffect(()=>{ 
    if(renaming && inputref.current) { 
        inputref.current.focus()
    }
  },[renaming])

  return (
    <ListItem sx={{ p: 0 }}>
      <ListItemButton onDoubleClick={onOpen} onContextMenu={onRightClickHandler}>
        <ListItemIcon>{Icon}</ListItemIcon> 
        {renaming ? 
        <Input 
        inputRef={inputref} 
        value={name}
        onChange={(e)=> setName(e.target.value)} 
        sx={{bgcolor: 'gray', px: 1}} 
        onBlur={()=>{onRename(name);setRenaming(false)}} 
        onClick={e => e.stopPropagation() } 
        /> : <ListItemText primary={name} /> }
      </ListItemButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={()=>{setRenaming(true);setAnchorEl(null)}}>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem> 
      </Menu>
    </ListItem>
  );
}