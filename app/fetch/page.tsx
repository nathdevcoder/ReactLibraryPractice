'use client'
import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

export default function FormsPage() { 
  const {data, isLoading } = useQuery({
    queryKey: ['getData', 10],
    queryFn:  ()=> axios.get<{name:string, id: number}[]>('/api/form?type=user').then(res=>res.data)
  })
  function TestGet() {

  }
  if(isLoading) return <p>loading...</p>
  console.log(data);
  
  return (
    <div> 
      {data?.map(dt=>(
        <p key={dt.id}>{dt.name}</p>
      ))}
      <Button onClick={TestGet} >Test</Button>
      <div>
      <p>State Test</p>
      <Button disabled>Drawer</Button> 
    </div>
    </div>
  )
}
