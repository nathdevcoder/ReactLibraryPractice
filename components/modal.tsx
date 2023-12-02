import { Box, Modal, SxProps, Theme } from '@mui/material'
import React, { useEffect } from 'react'
import { create } from 'zustand' 

type State = {
    open: boolean
    text: string
}

type Action = {
    toggle: (act: boolean) => void
}

const style = {
    position: 'absolute' as 'absolute',  
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const useModal = create<State & Action>((set, get)=> ({
    open: false,
    text: "hello",
    toggle(act: boolean) {
       set(() => ({open: act, text: 'Modal'}))  
    }
}))

type LocalModalType = {
    title: string
    classes?: SxProps<Theme> | undefined
}

export default function LocalModal({title, classes}: LocalModalType) {
    const {open, text, toggle} = useModal() 
  return (
    <Modal open={open} onClose={()=>toggle(false)}>
        <Box sx={{...style, ...classes}}>
            <h1>{text}</h1> 
        </Box>
    </Modal>
  )
}
