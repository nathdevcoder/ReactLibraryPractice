"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import React, { useState } from "react";
import columns, { data } from "../constant/table";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableContainer,
  Paper,
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent, 
} from "@mui/material";
import EnhancedTableToolbar from "./snippet/tableToolbar";
import TableControll from "./snippet/tableControll";  
import TablePaginationActions from "./snippet/tableActions";
import SortIcon from '@mui/icons-material/Sort';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

const ResizingDivSx = {
  height: '100%',
  width: 4,
  position: 'absolute',
  top:0,
  right:2,
  cursor: 'grab',
  '&:hover': {
    bgcolor: '#C1853B'
  },
  '&:active': {
    cursor: 'grabbing'
  }
}
const ResizingParentDivSx = {position: 'relative', '&:hover > div': {bgcolor: '#C1853B'}}

const sortable = ['place', 'grocery', 'price', 'amount', 'calorie', 'id']

export default function ReactTable() { 
  const [dense, setDense] = useState(false);
  const [filterConditions, setFilterConditions] = useState<
  { id: string; value: string | number }[]
  >([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "grocery", desc: true },
    // { id: "price", desc: true },
    // { id: "amount", desc: true },
    // { id: "calorie", desc: true },
    { id: "place", desc: true },
  ]);
  const [pageSetting, setPageSetting] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const {
    getHeaderGroups,
    getRowModel,
    getFooterGroups, 
    getPageCount, 
  } = useReactTable({
    columns,
    data, 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange',
    state: {
      pagination: pageSetting,
      columnFilters: filterConditions,
      sorting: sorting,
    }
  });
   

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => { 
    setPageSetting({
      pageIndex: 0,
      pageSize: parseInt(event.target.value, 10)
    })
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => { 
    console.log(newPage);
    
    setPageSetting(state=> ({...state, pageIndex: newPage}))
  };
  const onFilter = (id: string, value: string) => {
    setFilterConditions(prev=>(prev.filter(pr=> pr.id != id).concat({id, value})))  
    setPageSetting(state=> ({...state, pageIndex: 0}))
  } 
  const onSort = (id: string) => {
    setSorting(prev=> prev.map(pr=> pr.id == id ? {...pr, desc: !pr.desc}: pr ))
    setPageSetting(state=> ({...state, pageIndex: 0}))
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[]
    setSorting(state=>{
      const newstate = state.filter(fl=> value.includes(fl.id))
      value.forEach(val=> {
        if(!newstate.find(ts=>ts.id == val)) newstate.push({id: val, desc: true})
      }) 
      return newstate
    })
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Stack direction={'row'} spacing={4} p={4} pb={0}>
          <TextField onChange={(e)=> onFilter('grocery', e.target.value)} label='Filter Grocery' /> 
          <TextField onChange={(e)=> onFilter('place', e.target.value)} label='Filter Place'/>
          <TextField onChange={(e)=> onFilter('price', e.target.value)} label='Filter Price'/>
        </Stack>
        <FormControl sx={{ width: 300, m:4 }}>
          <InputLabel id="demo-multiple-name-label">Sort</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={sorting.map(st=>st.id)}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />} 
          >
            {sortable.map((st) => (
              <MenuItem
                key={st}
                value={st} 
              >
                {st}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction={'row'} spacing={4} >
            {sorting.map(st=>(
              <Button
              key={st.id}
              endIcon={st.desc? <SortIcon /> : <SignalCellularAltIcon/> } 
              onClick={()=>onSort(st.id)} >
                {st.id}
              </Button>
            ))}
        </Stack>
        <TableContainer>
          <EnhancedTableToolbar numSelected={0} />
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} width={header.getSize()} sx={ResizingParentDivSx}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      <Box 
                      sx={ResizingDivSx} 
                      component={'div'} 
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      ></Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={getPageCount()}
                  rowsPerPage={pageSetting.pageSize}
                  page={pageSetting.pageIndex}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <p>{getPageCount()}</p>
      <TableControll dense={dense} setDense={setDense} />
    </Box>
  );
}
