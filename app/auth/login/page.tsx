'use client'
import login from '@/actions/login'
import { Button } from '@mui/material'
import React from 'react'

export default function LoginPage() {
  return (
    <Button onClick={async () => await login({email: 'test', password: 'rest', role: 'resa'})}>Login</Button>
  )
}
