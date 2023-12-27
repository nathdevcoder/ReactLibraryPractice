import datajson from "../data/sample.json";

//   if (sort) {
//     const [key, order] = sort.split("-") as [keyof tableData, Order];
//     if (data.every((obj) => obj.hasOwnProperty(key))) {
//       if (order === "asc")
//         data = data.sort((a, b) => {
//           if (a[key] < b[key]) return -1;
//           if (a[key] > b[key]) return 1;
//           return 0;
//         });
//       else if (order === "desc") {
//         data = data.sort((a, b) => {
//           if (a[key] > b[key]) return -1;
//           if (a[key] < b[key]) return 1;
//           return 0;
//         });
//       }
//     }
//   }
//   if (filter) {
//     const [id, param] = filter.split("-") as [keyof tableData, string];
//     if (data.every((obj) => obj.hasOwnProperty(id))) {
//       data = data.filter((dt) => String(dt[id]).includes(param));
//     }
//   }
export function getTableData(state: TableStateType) {
  const { page, rowsPerPage, sort, filter } = state;
  let start = page * rowsPerPage;
  let end = start + rowsPerPage;
  let data: tableData[] = datajson;

  if (sort) data = sortTableData(data, sort) 

  if (filter) data = filterTableData(data, filter) 

  const paginated =  data.slice(start, end);
  const length = datajson.length

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
  const [id, param] = filter.split("-") as [keyof tableData, string];
  if (data.every((obj) => obj.hasOwnProperty(id))) {
    return data.filter((dt) => String(dt[id]).includes(param));
  }
  return data;
}
