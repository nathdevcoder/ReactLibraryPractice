'use client'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useReducer, useState } from 'react'
import TableControll from '../snippet/tableControll'
import TablePaginationActions from '../snippet/tableActions'
import EnhancedTableToolbar from '../snippet/tableToolbar'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


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
      const {id, order} = payload
      return {...state, sort: `${id}-${order}`}; 
    default:
      return state;
  }
}
const initialTableState = {
  page: 1, 
  rowsPerPage: 10,
  count: 0,
  sort: null
}

export default function SeverSideDataTable<T>({endpoint, queryKey}: SSDTableType) {
  const [dense, setDense] = useState(false);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [tableState, dispatch] = useReducer(tableReducer, initialTableState)

  const {data: tableData, isLoading, isError } = useQuery({
    queryKey: [queryKey],
    queryFn:  async () => {
        const response = await axios.get<{table: T[], state: TableStateType}>(endpoint) 
        const state = response.data.state
        for(const key in initialTableState) {
          if (!state.hasOwnProperty(key)) {
            throw new Error(`Object does not have a '${key}' property`);
          }
        } 
        dispatch({type: 'INIT', payload: state})
        return response.data.table
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
  return (
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
            {<TableCell ></TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {
           (()=>{
            const isItemSelected = isSelected(-1);
            return <TableRow
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
          </TableRow>
           })()
        }
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={tableState.count}
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
