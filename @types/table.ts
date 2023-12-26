type tableData = {
    id: number
    calorie:number
    amount: number
    price: number
    place: string
    grocery: string
}

type Order = 'asc' | 'desc';

type SSDTableType = {
  endpoint: string
  queryKey: string
  densable?: boolean
}
 
type TableStateType  = {
  page: number; 
  rowsPerPage: number
  count: number 
  sort: `${string}-${Order}` | null
}  

type TableActionType = {
  type: 'NAVIGATE' | 'RESIZE';
  payload: number;
} | {
  type: 'INIT'
  payload: TableStateType
} | {
  type: 'SORT'
  payload: {
    id: string
    order: Order
  }
} 

type TableDataResponse = {
    data: tableData[]
    state: TableStateType 
    
}