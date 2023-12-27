import HomeIcon from '@mui/icons-material/Home';
import ApiIcon from '@mui/icons-material/Api';
import TableChartIcon from '@mui/icons-material/TableChart';
import DynamicFormIcon from '@mui/icons-material/DynamicForm'; 
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { MenuListType } from '@/@types/data';
import { AccountCircleRounded } from '@mui/icons-material';
const Menu:MenuListType = [
    {title: 'Home', url: '/', Icon: HomeIcon},
    {title: 'Account', url: '/account', Icon: AccountCircleRounded},
    {title: 'Forms', url: '/forms', Icon: DynamicFormIcon},
    {title: 'Fetchs', url: '/fetch', Icon: ApiIcon},
    {title: 'Tables', url: '/table', Icon: TableChartIcon, subMenu: [
        {title: "Mui", url: '/'},
        {title: "ClientSide DataTable", url: '/react-table'},
        {title: "ServerSide DataTable", url: '/api-table'},
    ]}, 
    {title: 'File System', url: '/filesystem', Icon: FolderCopyIcon, subMenu: [
        {title: "File System", url: '/'}, 
        {title: "MyFiles Headless", url: '/headless'}, 
    ]},
]
export default Menu