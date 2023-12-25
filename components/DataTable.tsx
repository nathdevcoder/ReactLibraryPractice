 
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react'

export default function DataTable<t>({columns, data}: {columns:ColumnDef<t, any>[], data: t[]}) {
    const {
        getHeaderGroups,
        getRowModel,
        getFooterGroups, 
        getPageCount, 
      } = useReactTable({
        columns,
        data, 
        getCoreRowModel: getCoreRowModel(),   
      });
  return (
    <Table
    sx={{ minWidth: 750 }}
    aria-labelledby="tableTitle"
    // size={dense ? "small" : "medium"}
  >
    <TableHead>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )} 
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
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={6}
          count={}
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
        /> */}
      </TableRow>
    </TableFooter>
  </Table>
  )
}
