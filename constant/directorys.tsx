import { 
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {  ReactNode } from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from '@mui/icons-material/Folder';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';

export function DirLists({ title, Icon, onClick }: { title: string; Icon: ReactNode, onClick: ()=>void }) {
    return (  
    <ListItemButton onClick={onClick}>
        <ListItemIcon>
         {Icon}
        </ListItemIcon>
        <ListItemText primary={title} />
    </ListItemButton> 
    );
  } 
export const filesComps: FileComponentType = {
  image: (fl) => <DirLists title={fl.name} Icon={<PhotoIcon color='success' />} onClick={()=> {} } />,
  video: (fl) => <DirLists title={fl.name} Icon={<VideoFileIcon color="error" />} onClick={()=> {} } />,
  pdfs: (fl) => <DirLists title={fl.name} Icon={<PictureAsPdfIcon color='secondary'  />} onClick={()=> {} } />,
  audio: (fl) => <DirLists title={fl.name} Icon={<AudioFileIcon sx={{color: 'violet'}}  />} onClick={()=> {} } />,
  others: (fl) => <DirLists title={fl.name} Icon={<InsertDriveFileIcon />} onClick={()=> {} } />,
  docs: (fl) => <DirLists title={fl.name} Icon={<ArticleIcon color="info" />} onClick={()=> {} } />,
};

export const foldersComps: folderComponentType = {
  hidden: (fd) =><DirLists title={fd.name} Icon={<FolderSharedOutlinedIcon color='warning' />} onClick={()=> {} } />,
  locked: (fd) => <DirLists title={fd.name} Icon={<SnippetFolderOutlinedIcon color='warning' />} onClick={()=>{}} />,
  private: (fd) => <DirLists title={fd.name} Icon={<FolderZipOutlinedIcon  color='warning' />} onClick={()=> {} } />,
  public: (fd) => <DirLists title={fd.name} Icon={<FolderIcon  color='warning' />} onClick={()=> {} } />
}