'use client'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { Fragment } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear'; 
import BlockIcon from '@mui/icons-material/Block';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useSnackbar } from 'notistack'

export default function ApplicationTable( ) {
    const { enqueueSnackbar } = useSnackbar();
    const {data:applications, isLoading, refetch, } = useQuery({
        queryKey: ['applications'],
        queryFn:  async () => {
            const {data, status} = await axios.get<defaultResponseType<applicationsType>>('/api/auth/aplication') 
            if(status === 200) {
                return data.data
            } else return []
        }
    })
    const mutation = useMutation({
        mutationFn(data: {status: staffStatusType, id: string}) {
            return axios.patch('/api/auth/aplication', data)
        },
        onSuccess(data) {
            enqueueSnackbar('application updated', {variant: 'success'})  
            refetch()
        },
        onError(error) {
            enqueueSnackbar('oops, something went wrong', {variant: 'error'}) 
        }
    })
    if(isLoading) return <p>Loading...</p>
    if(!applications) return <p>No Data</p>
    function onMutate(status:staffStatusType, id: string) {
        mutation.mutate({status, id})
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
                                <IconButton onClick={()=>onMutate('registered',app.id)} disabled={mutation.isPending}><CheckIcon  /></IconButton>
                                <IconButton onClick={()=>onMutate('declined',app.id)} disabled={mutation.isPending}><ClearIcon /></IconButton>
                            </Fragment>
                        )}
                        {(app.staffStatus === 'declined' || app.staffStatus === 'removed') && ( 
                            <IconButton onClick={()=>onMutate('registered',app.id)} disabled={mutation.isPending}><ControlPointIcon /></IconButton> 
                        )}
                        {app.staffStatus === 'registered' && ( 
                            <IconButton onClick={()=>onMutate('removed',app.id)} disabled={mutation.isPending}><BlockIcon  /></IconButton>  
                        )} 
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    </TableContainer>
  )
}
