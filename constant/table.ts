 
import { createColumnHelper } from '@tanstack/react-table'
import datajson from '../data/sample.json'
export const data = datajson

const columnHelper = createColumnHelper<tableData>()

export default [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('grocery', {
        header: 'Grocery',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('price', {
        header: 'Price',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('calorie', {
        header: 'Calorie',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('place', {
        header: 'Place',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    })
]