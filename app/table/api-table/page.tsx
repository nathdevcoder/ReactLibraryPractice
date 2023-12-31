'use client' 
import SeverSideDataTable from '@/components/tables/SeverSideDataTable' 
import DateCell from '@/components/tables/cells/DateCell'
import React from 'react'

export default function ApiedTable() {
  return  (
    <SeverSideDataTable<tableData> 
      endpoint='/api/table'
      queryKey='serverside'
      heading='Server Side Data'
      columns={[
        { field: 'id', name: 'ID', cellType: 'Int' },
        { field: 'grocery', name: 'Grocery', cellType: 'Text' },
        { field: 'price', name: 'Price', cellType: 'Int' },
        { field: 'amount', name: 'Amount', cellType: 'Int' },
        { field: 'calorie', name: 'Calorie', cellType: 'Int' },
        { field: 'place', name: 'Place', cellType: 'Text' }, 
        { name: 'Date', cellType: 'Custom', cell: (data) =><DateCell date={new Date()} />},
        { name: 'Action', cellType: 'Custom', cell: (data) =><p>{data['place']}</p> },
      ]}
    />
  )
}
