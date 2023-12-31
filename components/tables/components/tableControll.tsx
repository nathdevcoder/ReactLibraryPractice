import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'

type tableControllType = {
    dense: boolean
    setDense: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TableControll({dense, setDense}: tableControllType) { 
    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
      };

  return (<FormControlLabel
    control={<Switch checked={dense} onChange={handleChangeDense} />}
    label="Dense padding"
  />)
}
