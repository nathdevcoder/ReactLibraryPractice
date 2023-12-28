'use client'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material'
import React, { ReactNode, useReducer, useRef, useState } from 'react'
import TableControll from '../snippet/tableControll'
import TablePaginationActions from '../snippet/tableActions'
import EnhancedTableToolbar from '../snippet/tableToolbar'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import TableLoading from '../snippet/TableLoading'

type SSDTableType<T> = {
  endpoint: string
  queryKey: string
  densable?: boolean
  heading?: string
  columns: {
    field:  keyof T
    name: string
    cell: (data: (T & { id: number })[keyof T]) => ReactNode
  }[] 
}

function tableReducer(state: TableStateType, action:TableActionType): TableStateType {
  const { type, payload } = action;
  switch (type) {
    case 'NAVIGATE':
      return { ...state, page:  payload }; 
    case 'RESIZE':
      return { ...state, rowsPerPage: payload, page: 0 };
    case 'INIT':
      return payload; 
    case 'SORT':
      let order: Order = 'asc'  
      if(state.sort) {
        const [stateSortId, stateOrder] = state.sort.split('-') as [string, Order]
        stateSortId === payload && stateOrder === 'asc' ? order = 'desc' : order = 'asc'
      }
      return {...state, sort: `${payload}-${order}`}; 
    case 'FILTER':
      const {filterId, param, operator} = payload
      return {...state, filter: `${filterId}-${operator}-${param}`}; 
    default:
      return state;
  }
}
const initialTableState = {
  page: 0, 
  rowsPerPage: 10,
  sort: null,
  filter: null
}
const tableOptions = {
   selectable: [],
   sortable: [],
   filterable: [] ,
   count: 0
}

export default function SeverSideDataTable<T>({endpoint, queryKey, columns, densable=false, heading}: SSDTableType<T>) {
  // const [activeColumn, setActiveColumn] = useState(columns.map(c=> ({name: c.name, active: true})))
  const [dense, setDense] = useState(false);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [tableState, dispatch] = useReducer(tableReducer, initialTableState)
  const optionsReff = useRef<TableOptionType>({...tableOptions, densable})

  const {data: tableData, isLoading, isError, error } = useQuery({
    queryKey: [queryKey, tableState],
    queryFn:  async () => {
        const response = await axios.get<TableDataResponse<T>>(endpoint, {
          params: tableState
        })  
        const {state, data, options} = response.data
        for(const key in initialTableState) {
          if (!state.hasOwnProperty(key)) throw new Error(`Object does not have a '${key}' property`); 
        } 
        dispatch({type: 'INIT', payload: state})
        optionsReff.current = options
        return data
    }
  })

  
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && tableData) {
      const newSelected = tableData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const handleClick = (e:any, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = []; 
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const numSelected = selected.length
  const [orderBy, order] = tableState.sort? tableState.sort.split('-') : []


  if(isLoading) return ( <TableLoading cols={columns.map(c=>c.name)} heading={heading} />)
  if(isError) return <p>{error.message}</p>
  
  return (
    <TableContainer>
      <EnhancedTableToolbar 
        numSelected={numSelected} 
        heading={heading} 
        filterState={tableState.filter} 
        filters={optionsReff.current.filterable} 
        onFilter={(payload)=> dispatch({type: 'FILTER', payload})}
      />
      <Table size={dense ? "small" : "medium"} >
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < tableState.rowsPerPage}
                checked={tableState.rowsPerPage > 0 && numSelected === tableState.rowsPerPage}
                onChange={handleSelectAllClick} 
              />
            </TableCell>
            {columns.map(col=> (
              <TableCell key={Math.random()}>
                {optionsReff.current.sortable.includes(col.field as string) ? (
                  <TableSortLabel
                    active={orderBy === col.field}
                    direction={order as Order}
                    onClick={()=> dispatch({type: 'SORT', payload: col.field as string}) }
                  >
                    {col.name} 
                  </TableSortLabel>
                ) : col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData?.map(tbdata=> {
              const isItemSelected = isSelected(tbdata.id);
              return (
                <TableRow
                  hover
                  key={tbdata.id}
                  onClick={(event) => handleClick(event, tbdata.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1} 
                  selected={isItemSelected}
                  >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected} 
                    />
                  </TableCell>  
                  {columns.map((cl)=> {
                    const data = tbdata[cl.field] 
                    return (
                      <TableCell key={Math.random()}>
                        {cl.cell(data)}
                      </TableCell> 
                    )
                  })}
                </TableRow>
              )
          })} 
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={columns.length + 1}
              count={optionsReff.current.count}
              rowsPerPage={tableState.rowsPerPage}
              page={tableState.page}
              onPageChange={(e,page)=>dispatch({type: 'NAVIGATE', payload: page})}
              onRowsPerPageChange={(e)=>dispatch({type: 'RESIZE', payload: parseInt(e.target.value, 10)})}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      {optionsReff.current.densable && <TableControll dense={dense} setDense={setDense} /> }
    </TableContainer>
  )
}
