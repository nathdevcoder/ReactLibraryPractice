'use client'
import React, { Fragment } from 'react'
import { Button, Chip, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut, useSession } from 'next-auth/react';
import { Logout, PersonAdd, Login } from '@mui/icons-material';
import { useGlobalModal } from './GlobalModals';
import LoginForm from './forms/LoginForm';
export default function Account() {
    const {data:session, update} = useSession()
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
    const updateRoleHandler = async (role: string) => {
        await update({ role })
    }
    const role = session?.user?.role || 'guest' 
    const roleColor = role === "admin" ? "info"
      : role === "member"  ? "success"
      : role === "staff" ? "error"
      : role === "user" ? "warning"
      : "default";
  return (
    <Fragment>
        <Button startIcon={<AccountCircleIcon />} size='large' onClick={handleClick} disabled={anchorEl.loading} sx={{mr: 2}} >
            {session? 'Hi '+ session?.user?.userName : 'Guest'}
        </Button>
        <Chip label={role.toLocaleUpperCase()} variant='outlined' color={roleColor} />
        <Menu
        anchorEl={anchorEl.el}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose} 
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {session && session.user?.roles.map(rol=>(
            <MenuItem onClick={()=>updateRoleHandler(rol)}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={rol} />
            </MenuItem> 
        ))}
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
