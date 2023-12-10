 
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import {
  Input,
  Button,
  Dialog,
  DialogActions, 
  DialogTitle,
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
} & dirItemProps

export default function ListItemDir({ title, Icon, onOpen, onRename, onDelete , selected, disable, isHolding, onHold, onPaste}: listitemdirType) {
  const [renaming, setRenaming] = useState(false)
  const [name, setName] = useState(title)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [alert, setAlert] = useState(false)
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
      <ListItemButton onDoubleClick={onOpen} selected={selected} onContextMenu={onRightClickHandler} disabled={disable}>
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
        <MenuItem onClick={()=> {setAlert(true);setAnchorEl(null)}}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem> 
        <MenuItem onClick={()=> {onHold('copy');setAnchorEl(null)}}>
          <ListItemIcon>
            <ContentCopy  fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem> 
        <MenuItem onClick={()=> {onHold('cut');setAnchorEl(null)}}>
          <ListItemIcon>
            <ContentCut  fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem> 
        {isHolding && (
          <MenuItem onClick={onPaste}>
           <ListItemIcon>
             <ContentPaste  fontSize="small" />
           </ListItemIcon>
           <ListItemText>Paste</ListItemText>
         </MenuItem> 
        )}
      </Menu>
      <Dialog 
        open={alert}
        onClose={()=> setAlert(false)}
        aria-labelledby="alert-dialog-title" 
      >
        <DialogTitle id="alert-dialog-title">are you want to delete this</DialogTitle> 
        <DialogActions>
          <Button onClick={()=>setAlert(false)}>cancel</Button>
          <Button onClick={()=>{
            onDelete()
            setAlert(false)
          }} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}
