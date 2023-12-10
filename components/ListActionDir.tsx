import { ListSubheader, Stack, Box, IconButton } from '@mui/material' 
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import React from 'react'
 

export default function ListActionDir({onAddFolder}: dirActionProps) {
  return (
    <ListSubheader component={Stack} direction='row' justifyContent='flex-end' >
        <Box>
            <IconButton sx={{width: 'max-content'}} onClick={onAddFolder} ><CreateNewFolderIcon/></IconButton>  
        </Box>
    </ListSubheader>
  )
}
