'use client'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { ReactNode, useReducer, useRef, useState } from 'react'
import TableControll from '../snippet/tableControll'
import TablePaginationActions from '../snippet/tableActions'
import EnhancedTableToolbar from '../snippet/tableToolbar'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type SSDTableType<T> = {
  endpoint: string
  queryKey: string
  densable?: boolean
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
      const {sortId, order} = payload
      return {...state, sort: `${sortId}-${order}`}; 
    case 'FILTER':
      const {filterId, param} = payload
      return {...state, filter: `${filterId}-${param}`}; 
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

export default function SeverSideDataTable<T>({endpoint, queryKey, columns, densable=false}: SSDTableType<T>) {
  const [dense, setDense] = useState(false);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [tableState, dispatch] = useReducer(tableReducer, initialTableState)
  const optionsReff = useRef<TableOptionType>({...tableOptions, densable})

  const {data: tableData, isLoading, isError } = useQuery({
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
    if (event.target.checked) {
      const newSelected = [-1]
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
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
  const rowCount = 100

  if(isLoading) return <p>...loading</p>
  if(isError) return <p>error</p>
  console.log(tableData, optionsReff, tableState);
  
  return (
    // <p>loaded</p>
    <TableContainer>
      <EnhancedTableToolbar numSelected={numSelected} />
      <Table
        size={dense ? "small" : "medium"}
      > 
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick} 
              />
            </TableCell>
            {columns.map(col=> <TableCell key={Math.random()}>{col.name}</TableCell> )}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData?.map(tbdata=> {
              const isItemSelected = isSelected(tbdata.id);
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, -1)}
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
              colSpan={6}
              count={optionsReff.current.count}
              rowsPerPage={tableState.rowsPerPage}
              page={tableState.page}
              onPageChange={(e,page)=>dispatch({type: 'NAVIGATE', payload: page})}
              onRowsPerPageChange={(e)=>dispatch({type: 'NAVIGATE', payload: parseInt(e.target.value, 10)})}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>

      </Table>
      <TableControll dense={dense} setDense={setDense} /> 
    </TableContainer>
  )
}
