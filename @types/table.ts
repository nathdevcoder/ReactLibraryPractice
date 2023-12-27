type tableData = {
    id: number
    calorie:number
    amount: number
    price: number
    place: string
    grocery: string
}

type Order = 'asc' | 'desc';

 
type TableStateType  = {
  page: number; 
  rowsPerPage: number 
  sort: `${string}-${Order}` | null
  filter: `${string}-${string}` | null
}  

type TableOptionType = {
    sortable: string[]
    filterable: string[]
    selectable:  string[]
    densable: boolean
    count: number 
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
    sortId: string
    order: Order
  }
} | {
  type: 'FILTER'
  payload: {
    filterId: string
    param: string
  }
} 

type TableDataResponse<T> = {
    data: (T & {id: number})[]
    state: TableStateType 
    options: TableOptionType
}
 