import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ElementType, ReactNode } from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from '@mui/icons-material/Folder';
export function MapDirectories(dirs: folderType) {
  const components: ReactNode[][] = [];
  Map(dirs) 
  function DirLists({ title, Icon }: { title: string; Icon: ReactNode }) {
    return (  
    <ListItemButton>
        <ListItemIcon>
         {Icon}
        </ListItemIcon>
        <ListItemText primary={title} />
    </ListItemButton> 
    );
  } 
  function Map(data: folderType | null) {
    if(!data) return
    const component: ReactNode[] = [];
    data.files.forEach((fl) => {
      component[fl.index] =
        fl.type == "video" ? (
          <DirLists title={fl.name} Icon={<VideoFileIcon color="error" />} />
        ) : fl.type === "image" ? (
          <DirLists title={fl.name} Icon={<PhotoIcon color='success' />} />
        ) : fl.type === "audio" ? (
          <DirLists title={fl.name} Icon={<AudioFileIcon sx={{color: 'violet'}} />} />
        ) : fl.type === "docs" ? (
          <DirLists title={fl.name} Icon={<ArticleIcon color="info" />} />
        ) : fl.type === "pdfs" ? (
          <DirLists title={fl.name} Icon={<PictureAsPdfIcon color='secondary'  />} />
        ) : (
          <DirLists title={fl.name} Icon={<InsertDriveFileIcon />} />
        );
    });
    data.folders.forEach(fd=>{
        component[fd.index] =  <DirLists title={fd.name} Icon={<FolderIcon color='primary' />} />
    })
    components.push(component)
    Map(data.opened)
  } 
  return components
}
