import React from 'react'
import TextCell from '../cells/TextCell';
import DateCell from '../cells/DateCell';

type cellType = {
    type: CellType
    data: unknown
}  

export default function TableCells({type, data}:cellType ) {
  if(!data) return <p>error</p> 
    switch (type) { 
        case 'Text':
            if(typeof data === 'string') return <TextCell text={data} /> 
            return <p>error</p>
            
        case 'Int':
            if(typeof data === 'number') return <TextCell text={data.toFixed()} /> 
            return <p>error</p>

        case 'Date':
            if(data instanceof Date) return <DateCell date={data} />
            return <p>error</p>
            
        default:
            return <p>error</p>
    }
  
}
