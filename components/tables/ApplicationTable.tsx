'use client'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear'; 
import BlockIcon from '@mui/icons-material/Block';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

export default function ApplicationTable( ) {
    const {data:applications, isLoading } = useQuery({
        queryKey: ['applications'],
        queryFn:  async () => {
            const {data, status} = await axios.get<defaultResponseType<applicationsType>>('/api/auth/aplication') 
            if(status === 200) {
                return data.data
            } else return []
        }
      })
    if(isLoading) return <p>Loading...</p>
    if(!applications) return <p>No Data</p>
    function UpdateApplication(status:staffStatusType) {
        
    }
  
  return (
    <TableContainer>
    <Typography variant='h6' my={2}>Applications for staff account</Typography>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">User Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {applications?.map(app=>(
                <TableRow key={app.id}>
                    <TableCell >{app.id}</TableCell>
                    <TableCell align="right">{app.userName}</TableCell>
                    <TableCell align="right">{app.staffStatus}</TableCell>
                    <TableCell align="right">
                        {app.staffStatus === 'aplied' && (
                            <Fragment>
                                <IconButton onClick={()=>UpdateApplication('registered')}><CheckIcon  /></IconButton>
                                <IconButton onClick={()=>UpdateApplication('declined')}><ClearIcon /></IconButton>
                            </Fragment>
                        )}
                        {(app.staffStatus === 'declined' || app.staffStatus === 'removed') && ( 
                            <IconButton onClick={()=>UpdateApplication('registered')}><ControlPointIcon /></IconButton> 
                        )}
                        {app.staffStatus === 'registered' && ( <IconButton onClick={()=>UpdateApplication('removed')}><BlockIcon  /></IconButton>  )} 
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </TableContainer>
  )
}
