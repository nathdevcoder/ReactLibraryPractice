'use client'
 
import { MapDirectories } from "@/utils/mapper";
import { Box, IconButton, List, ListItem, ListSubheader, Stack } from "@mui/material";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import React from "react"; 
import useFileSystemState from "@/hooks/useFileSystemState";

export default function FileSystem() {
  const {status, directories, fetchDir} = useFileSystemState()
  if(status.loading) return <p>Loading..</p> 
  if(status.error) return <p>{status.error}</p> 
  if(!directories) return <p>No Data Found</p> 
  const directorys = MapDirectories(directories, fetchDir);
  return (
    <Box>
      <Stack direction="row">
        {directorys.map((dir) => (
          <List
            sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component={Stack} direction='row' justifyContent='flex-end' >
                  <IconButton  children={<PushPinOutlinedIcon/>} sx={{width: 'max-content'}} />  
              </ListSubheader>
            }
          >
            {dir.map((FileItem) => (
              <ListItem disablePadding>{FileItem}</ListItem>
            ))}
          </List>
        ))}
      </Stack>
    </Box>
  );
}
