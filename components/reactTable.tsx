"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
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
} from "@mui/material";
import EnhancedTableToolbar from "./snippet/tableToolbar";
import TableControll from "./snippet/tableControll";  
import TablePaginationActions from "./snippet/tableActions";

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

export default function ReactTable() { 
  const [dense, setDense] = useState(false);
  const {
    getHeaderGroups,
    getRowModel,
    getFooterGroups,
    getState,
    getPageCount,
    setPageSize,
    setPageIndex,
    setColumnFilters 
  } = useReactTable({
    columns,
    data, 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange'
  });
  const {pagination, columnFilters} = getState() 

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(0);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageIndex(newPage);
  };
  const onFilter = (id: string, value: string) => {
    setColumnFilters(prev=>(prev.filter(pr=> pr.id != id).concat({id, value})))
  }
  console.log(columnFilters);
  
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Stack direction={'row'} spacing={4} p={4} pb={0}>
          <TextField onChange={(e)=> onFilter('grocery', e.target.value)} label='Filter Grocery' /> 
          <TextField onChange={(e)=> onFilter('place', e.target.value)} label='Filter Place'/>
          <TextField onChange={(e)=> onFilter('price', e.target.value)} label='Filter Price'/>
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
                  rowsPerPage={pagination.pageSize}
                  page={pagination.pageIndex}
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
      <TableControll dense={dense} setDense={setDense} />
    </Box>
  );
}
