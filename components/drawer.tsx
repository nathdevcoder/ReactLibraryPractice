'use client' 
 
import { Box, Button, Drawer } from '@mui/material'
import React  from 'react'
import { create } from 'zustand'  
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

type State = {
    openDrawer: boolean
}

type Action = {
    toggleDrawer: (act: boolean) => void
}

export const useDrawer = create<State & Action>((set)=> ({
    openDrawer: false,
    toggleDrawer(act: boolean) {
       set(() => ({openDrawer: act}))
    }
}))

export default function LocalDrawer() {
  const clientq = useQueryClient()
    const {openDrawer, toggleDrawer} = useDrawer() 
    const {data } = useQuery({
      queryKey: ['getData', 20],
      queryFn:  ()=> axios.get<{name:string, id: number}[]>('/api/form?type=admin').then(res=>res.data)
    })
    const {mutate, data: postdata} = useMutation({
      mutationFn: (vars:{name:string, id: number})=> axios.post('/api/form', {name: vars.name, id: vars.id, type: 'all'}).then(res=>res.data),
      onSuccess(){
         clientq.refetchQueries(['getData'])
      }
    })

    

  return (
    <div>
        <Drawer
            anchor='right'
            open={openDrawer}
            onClose={()=> toggleDrawer(false)}
          >
             <Box width={500}>
                {data?.map(dt=>(
                  <p key={dt.id}>{dt.name}</p>
                ))}
                <p>drawer</p>
                <Button onClick={()=>mutate({name: 'from client post', id: 5})} >Post new</Button>
                <p>added</p>
                { postdata && <p key={postdata.id}>{postdata.name}</p>  }
                 
             </Box>
          </Drawer>
    </div>
  )
}
