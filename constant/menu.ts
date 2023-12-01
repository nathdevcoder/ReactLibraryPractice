import HomeIcon from '@mui/icons-material/Home';
import ApiIcon from '@mui/icons-material/Api';
import TableChartIcon from '@mui/icons-material/TableChart';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import AccountTreeIcon from '@mui/icons-material/AccountTree'; 
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { MenuType } from '@/@types/data';
const Menu:MenuType = [
    {title: 'home', url: '/', Icon: HomeIcon},
    {title: 'Forms', url: '/forms', Icon: DynamicFormIcon},
    {title: 'Fetchs', url: '/fetch', Icon: ApiIcon},
    {title: 'Tables', url: '/table', Icon: TableChartIcon, subMenu: [
        {title: "Mui", url: '/'},
        {title: "React Table", url: '/react-table'},
    ]},
    {title: 'States', url: '/zustand', Icon: AccountTreeIcon},
    {title: 'File System', url: '/filesystem', Icon: FolderCopyIcon},
]
export default Menu