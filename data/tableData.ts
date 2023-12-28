import datajson from "../data/sample.json";

export function getTableData(state: TableStateType) {
  const { page, rowsPerPage, sort, filter } = state;
  let start = page * rowsPerPage;
  let end = start + rowsPerPage;
  let data: tableData[] = datajson;
  let length = datajson.length

  if (filter) {
    data = filterTableData(data, filter) 
    length = data.length
  }
  
  if (sort) data = sortTableData(data, sort) 

  const paginated =  data.slice(start, end);
   

  return {paginated, length}

}

function sortTableData(data: tableData[], sort: string): tableData[] {
  const [key, order] = sort.split("-") as [keyof tableData, Order];
  if (data.every((obj) => obj.hasOwnProperty(key))) {
    return order === "asc"
      ? data.sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0))
      : data.sort((a, b) => (a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0));
  }
  return data;
}

function filterTableData(data: tableData[], filter: string): tableData[] {
  const [id, operator, param] = filter.split("-") as [keyof tableData, Operators,string];
  if (data.every((obj) => obj.hasOwnProperty(id))) {
    if(operator === 'contains') return data.filter((dt) => String(dt[id]).includes(param));
    if(operator === 'equals') return data.filter((dt) => String(dt[id]) == param);
  }
  return data;
}
