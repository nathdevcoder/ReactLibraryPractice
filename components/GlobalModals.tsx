'use client'
import { Box, Dialog, DialogTitle, Modal, Paper, PaperProps, SxProps, Theme } from '@mui/material'
import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import Draggable from 'react-draggable'
import { create } from 'zustand' 

type State = {
    open: boolean
    body: ReactNode
    classes:  SxProps<Theme>
}

type Action = {
    close: ( ) => void
    openModal: (body:ReactElement<any, string | JSXElementConstructor<any>>, classes?:SxProps<Theme>) => void
}

const style = {  
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

export const useGlobalModal = create<State & Action>((set, get)=> ({
    open: false, 
    body: null,
    classes: {},
    close( ) {
       set(() => ({open: false, body: null}))  
    },
    openModal(body, classes={}) {
        set(() => ({open: true, body: React.cloneElement(body, {onClose: get().close}), classes}))  
    }
    
}))

function PaperComponent(props: PaperProps) {
    return (
      <Draggable    
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

export default function GlobalModals() {
    const {open, body, classes, close} = useGlobalModal() 
    return ( 
    <Dialog
        open={open}
        onClose={close}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Dragable
        </DialogTitle>
          <Box sx={{...style, ...classes}}>
              {body}
          </Box> 
    </Dialog>
    )
}
