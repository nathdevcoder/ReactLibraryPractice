'use client' 
import useReactMyFiles from "@/hooks/useReactMyFiles";
import { Box,  Breadcrumbs, Button, Stack, Typography, } from "@mui/material"; 
import React  from "react"; 
import ListDirectory from "@/components/ListDirectory";
import LocalDrawer, { useDrawer } from "@/components/drawer";

export default function MyFilesHeadless() { 
  const {toggleDrawer} = useDrawer()
  const {status, directories, breadcrumbs, getItemProps, getActionProps} = useReactMyFiles({
    endpoint: '/api/directory',
    rootID: 'akfnr' 
  });  
 
  if (status.loading && !directories) return <p>Loading..</p>;
  if (status.error) return <p>{status.error}</p>;
  if (!directories) return <p>No Data Found</p>;
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb"> 
       {breadcrumbs.map(bread=> <Typography key={bread.replace(" ", "")} >{bread}</Typography>)}
      </Breadcrumbs>
      <Stack direction="row">
        {directories.map(({dir, dirItems, length }) => (
          <ListDirectory 
            key={dir.id}
            getItemProps={(Item:dirTypes) => getItemProps(dir, Item, length)}  
            dirItems={dirItems}
            actionProps={getActionProps(dir, length)}
          />
        ))}
      </Stack> 
        <Button onClick={()=>toggleDrawer(true)}>Check data on server</Button>
      <LocalDrawer />
    </Box>
  )
}
