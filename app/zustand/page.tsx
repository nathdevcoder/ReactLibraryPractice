'use client'
 
import LocalModal from '@/components/modal'
import { Button } from '@mui/material'
import React from 'react'

export default function StatePage() {  
  return (
    <div>
      <p>State Test</p>
      <Button onClick={()=>{}} disabled>Drawer</Button> 
      <LocalModal title='main modal' classes={{bottom: 0, left: 0}} />
    </div>
  )
}
