import { getTableData } from "@/data/tableData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse<TableDataResponse<tableData>>> { 
  const page = request.nextUrl.searchParams.get('page') 
  const rowsPerPage = request.nextUrl.searchParams.get('rowsPerPage') 
  const filter = request.nextUrl.searchParams.get('filter') as `${string}-${string}` | null
  const sort = request.nextUrl.searchParams.get('sort')  as `${string}-desc` | `${string}-asc` | null
  const pageToNumber = Number(page)
  const rowsPerPageToNumber = Number(rowsPerPage)
  if(!isNaN(pageToNumber) && !isNaN(rowsPerPageToNumber)) {
    const {paginated, length} = getTableData({
        page: pageToNumber,
        rowsPerPage: rowsPerPageToNumber,
        filter, sort
    }) 
    
    return NextResponse.json({
        data: paginated,
        options: {
            selectable: [],
            sortable: ['grocery', 'place'],
            filterable: [] ,
            count: length,
            densable: true
        },
        state: {
            page: pageToNumber, 
            rowsPerPage: rowsPerPageToNumber,
            sort: sort||null,
            filter: filter||null
        }
      })
  }

  return NextResponse.json({
    data: [],
    options: {
        selectable: [],
        sortable: [],
        filterable: [] ,
        count: 0,
        densable: true
    },
    state: {
        page: 0, 
        rowsPerPage: 10,
        sort: null,
        filter: null
    }
  }) 
}