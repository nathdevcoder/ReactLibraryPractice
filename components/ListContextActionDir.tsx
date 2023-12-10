import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ContentPaste from '@mui/icons-material/ContentPaste';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'; 
import React from 'react'

type ActionType = {  
    anchorEl: HTMLElement | null
    onClose: () => void 
} & dirActionProps

export default function ListContextActionDir({onAddFolder, isHolding, anchorEl, onClose, onPaste}: ActionType) {
    const open = Boolean(anchorEl);
  return (
    <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    MenuListProps={{
      "aria-labelledby": "basic-button",
    }} 
    onContextMenu={e=>e.preventDefault()} 
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
  >
    <MenuItem onClick={onAddFolder}>
      <ListItemIcon>
        <CreateNewFolderIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Add Folder</ListItemText>
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
  )
}
