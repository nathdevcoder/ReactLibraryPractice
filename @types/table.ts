type tableData = {
    id: number
    calorie:number
    amount: number
    price: number
    place: string
    grocery: string
}

type Order = 'asc' | 'desc';
type Operators = 'contains' | 'equals';

 
type TableStateType  = {
  page: number; 
  rowsPerPage: number 
  sort: `${string}-${Order}` | null
  filter: `${string}-${Operators}-${string}` | null
}  

type TableOptionType = {
    sortable: string[]
    filterable: string[]
    selectable:  string[]
    densable: boolean
    count: number 
}

type FilterPayload = {
  filterId: string
  param: string
  operator: Operators
}

type TableActionType = {
  type: 'NAVIGATE' | 'RESIZE';
  payload: number;
} | {
  type: 'INIT'
  payload: TableStateType
} | {
  type: 'SORT'
  payload: string
} | {
  type: 'FILTER'
  payload: FilterPayload
} 

type TableDataResponse<T> = {
    data: (T & {id: number})[]
    state: TableStateType 
    options: TableOptionType
}
 