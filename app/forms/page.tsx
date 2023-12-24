'use client'
import LoginForm from '@/components/forms/LoginForm' 
import { Box, Button, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
 
 export default function SignInForm() {
  const {data:session} = useSession()
   return <Box width={700} margin={'auto'}>
    <Typography variant='h4' mb={4}>{session ? 'Log out':'Log in'}</Typography>
    {session? <Button onClick={async () => await signOut()}>Log out</Button> : <LoginForm />}
   </Box>
 }
 