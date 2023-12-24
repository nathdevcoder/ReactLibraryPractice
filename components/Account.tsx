'use client'
import React, { Fragment } from 'react'
import { Button, Chip, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut, useSession } from 'next-auth/react';
import { Logout, PersonAdd, Login } from '@mui/icons-material';
import { useGlobalModal } from './GlobalModals';
import LoginForm from './forms/LoginForm';
export default function Account() {
    const {data:session} = useSession()
    const {openModal} = useGlobalModal()
    const [anchorEl, setAnchorEl] = React.useState<{el: null | HTMLElement, loading: boolean}>({el:null,loading:false});
    const open = Boolean(anchorEl.el);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(state=> ({...state, el: event.currentTarget}));
    };
    const handleClose = () => {
        setAnchorEl(state=> ({...state, el: null}));
    };
    const SignOutHandler = async () => {
        setAnchorEl({loading: true, el: null});
        await signOut({
            redirect: false
        })
        setAnchorEl({loading: false, el: null}); 
    }
    const openSignInModal = () => {
        openModal(<LoginForm />)
    }
  return (
    <Fragment>
        <Button startIcon={<AccountCircleIcon />} size='large' onClick={handleClick} disabled={anchorEl.loading} sx={{mr: 2}} >
            {session? 'Hi Nathaniel': 'Guest'}
        </Button>
        <Chip label="Admin" variant='outlined' color='info'  />
        <Menu
        anchorEl={anchorEl.el}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose} 
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
        </MenuItem> 
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> 
        <MenuItem onClick={session?SignOutHandler:openSignInModal}>
          <ListItemIcon>
            {session ? <Logout fontSize="small" /> : <Login fontSize="small" />}
          </ListItemIcon>
          {session?'Log out':'Log in'}
        </MenuItem>
      </Menu>

    </Fragment>
  )
}
