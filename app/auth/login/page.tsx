'use client'
import login from '@/actions/login'
import { Button, Dialog, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function LoginPage() {
  const [userData, setUserData] = useState<{email:string, role: roleType, password: string}>({
    email: '',
    role: 'USER',
    password: ''
  })
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
 
  return (

    <Dialog
      open
    >
      <Stack width={500} padding={4} spacing={4}>
        <TextField type='text' label="email" value={userData.email} onChange={(e)=>{
          setUserData(state=>({...state, email: e.target.value}))
        }} />
        <TextField type='password' label="password" value={userData.password} onChange={(e)=>{
          setUserData(state=>({...state, password: e.target.value}))
        }}/> 
          <FormControl fullWidth>
          <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
          <Select<roleType>
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={userData.role || 'USER'}
            label="Role"
            fullWidth
            onChange={(e)=>{ 
              setUserData(state=>({...state, role: e.target.value as roleType}))
            }}
          >
            <MenuItem value="USER">
              <em>None</em>
            </MenuItem>
            <MenuItem value='USER'>USER</MenuItem>
            <MenuItem value='MEMBER'>MEMBER</MenuItem>
            <MenuItem value='STAFF'>STAFF</MenuItem>
            <MenuItem value='ADMIN'>ADMIN</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={async () => await login(userData)} variant='contained'>Login</Button>
      </Stack>
      
    </Dialog>
    
  )
}
