'use client' 
 
import {Box,Collapse, Drawer, IconButton, Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React  from 'react'
import { create } from 'zustand'  
import {  useQuery   } from 'react-query'
import axios from 'axios'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type State = {
    openDrawer: boolean
}

type Action = {
    toggleDrawer: (act: boolean) => void
}

export const useDrawer = create<State & Action>((set)=> ({
    openDrawer: false,
    toggleDrawer(act: boolean) {
       set(() => ({openDrawer: act}))
    }
}))


function Rows({dir}: {dir: directoryType}) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dir.id}
        </TableCell>
        <TableCell align="right">{dir.name}</TableCell>
        <TableCell align="right">{dir.root}</TableCell> 
        <TableCell align="right">{dir.index}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Folders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Index</TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dir.folders.map((folder) => (
                    <TableRow key={folder.id}>
                      <TableCell component="th" scope="row">
                        {folder.id}
                      </TableCell>
                      <TableCell>{folder.name}</TableCell>
                      <TableCell align="right">{folder.index}</TableCell> 
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
} 

export default function LocalDrawer() { 
    const {openDrawer, toggleDrawer} = useDrawer() 
    const { data } = useQuery({
      queryKey: ['getFolders'],
      queryFn:  () => axios.get<directoryType[]>('/api/directory/all').then(res=>res.data)
    }) 

  

  return (
    <div>
        <Drawer
            anchor='right'
            open={openDrawer}
            onClose={()=> toggleDrawer(false)}
          >
          <Box width={550} m={'auto'} p={2}>
          <TableContainer component={Paper}>
              <Table aria-label="collapsible table" size='small'>
                <TableHead>
                  <TableRow> 
                    <TableCell />
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Root</TableCell> 
                    <TableCell align="right">Index</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data&&data.map(dir=> (
                    <Rows key={dir.id} dir={dir}/>
                  ))}
                </TableBody>
              </Table>
          </TableContainer> 
          </Box>
          </Drawer>
    </div>
  )
}
