'use client'
import LocalDrawer, { useDrawer } from '@/components/drawer'
import LocalModal from '@/components/modal'
import { Button } from '@mui/material'
import React from 'react'

export default function StatePage() {
  const {toggleDrawer} = useDrawer()
  return (
    <div>
      <p>State Test</p>
      <Button onClick={()=>toggleDrawer(true)}>Drawer</Button>
      <LocalDrawer />
      <LocalModal title='main modal' classes={{bottom: 0, left: 0}} />
    </div>
  )
}
