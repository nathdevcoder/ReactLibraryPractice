'use client'
 
import { MapDirectories } from "@/utils/mapper";
import { Box, IconButton, List, ListItem, ListItemText, ListSubheader, Stack } from "@mui/material";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import React from "react"; 
import useFileSystemState from "@/hooks/useFileSystemState";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export default function FileSystem() {
  const {status, directories, fetchDir, addDir} = useFileSystemState()
  if(status.loading && !directories) return <p>Loading..</p> 
  if(status.error) return <p>{status.error}</p> 
  if(!directories) return <p>No Data Found</p> 
  const directorys = MapDirectories(directories, fetchDir);
  return (
    <Box>
      <Stack direction="row">
        {directorys.map(({component, props:{id, name, length}}) => (
          <List
            key={id}
            sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component={Stack} direction='row' justifyContent='flex-end' >
                  <ListItemText>{name}</ListItemText>
                  <Box>
                    <IconButton sx={{width: 'max-content'}} ><PushPinOutlinedIcon/></IconButton>  
                    <IconButton sx={{width: 'max-content'}} onClick={()=>addDir(id, length)} ><CreateNewFolderIcon/></IconButton>  
                  </Box>
              </ListSubheader>
            }
          >
            {component.map((FileItem) => (
              <ListItem key={Math.random().toString()} disablePadding>{FileItem}</ListItem>
            ))}
          </List>
        ))}
      </Stack>
    </Box>
  );
}
