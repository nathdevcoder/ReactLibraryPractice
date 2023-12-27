'use client'
import SeverSideDataTable from '@/components/tables/SeverSideDataTable'
import React from 'react'

export default function ApiedTable() {
  return  (
    <SeverSideDataTable<tableData> 
      endpoint='/api/table'
      queryKey='serverside'
      heading='Server Side Data'
      columns={[{
          field: 'id', name: 'ID', 
          cell: (data) => <p>{data}</p>
        },{
          field: 'grocery', name: 'Grocery', 
          cell: (data) => <p>{data}</p>
        },{
          field: 'price', name: 'Price', 
          cell: (data) => <p>{data}</p>
        },{
          field: 'amount', name: 'Amount', 
          cell: (data) => <p>{data}</p>
        },{
          field: 'calorie', name: 'Calorie', 
          cell: (data) => <p>{data}</p>
        },{
          field: 'place', name: 'Place', 
          cell: (data) => <p>{data}</p>
        }
      ]}
    />
  )
}
