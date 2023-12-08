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
export function MapDirectories(dirs: directoryType, fetcher: (id: string, root: string) => void) {
  const components: DirType<ReactNode> = [];
  Map(dirs) 
  function DirLists({ title, Icon, onClick }: { title: string; Icon: ReactNode, onClick: ()=>void }) {
    return (  
    <ListItemButton onClick={onClick}>
        <ListItemIcon>
         {Icon}
        </ListItemIcon>
        <ListItemText primary={title} />
    </ListItemButton> 
    );
  } 
  function Map(data: directoryType | null) {
    if(!data) return
    const component: ReactNode[] = [];
    data.files.forEach((fl) => {
      component[fl.index] =
        fl.type == "video" ? (
          <DirLists title={fl.name} Icon={<VideoFileIcon color="error" />} onClick={()=> {} } />
        ) : fl.type === "image" ? (
          <DirLists title={fl.name} Icon={<PhotoIcon color='success' />} onClick={()=> {} } />
        ) : fl.type === "audio" ? (
          <DirLists title={fl.name} Icon={<AudioFileIcon sx={{color: 'violet'}}  />} onClick={()=> {} } />
        ) : fl.type === "docs" ? (
          <DirLists title={fl.name} Icon={<ArticleIcon color="info" />} onClick={()=> {} } />
        ) : fl.type === "pdfs" ? (
          <DirLists title={fl.name} Icon={<PictureAsPdfIcon color='secondary'  />} onClick={()=> {} } />
        ) : (
          <DirLists title={fl.name} Icon={<InsertDriveFileIcon />} onClick={()=> {} } />
        );
    });
    data.folders.forEach(fd=>{
        component[fd.index] =  (
          fd.type === "private" ? (
            <DirLists title={fd.name} Icon={<FolderSharedOutlinedIcon color="warning" />} onClick={()=> fetcher(fd.id, data.id) } />
          ) : fd.type === "hidden" ? (
            <DirLists title={fd.name} Icon={<SnippetFolderOutlinedIcon color='warning' />} onClick={()=> fetcher(fd.id, data.id) } />
          ) : fd.type === "locked" ? (
            <DirLists title={fd.name} Icon={<FolderZipOutlinedIcon  color='warning' />} onClick={()=> fetcher(fd.id, data.id) } />
          ) : (
            <DirLists title={fd.name} Icon={<FolderIcon  color='warning' />} onClick={()=> fetcher(fd.id, data.id) } />
          )
        )
    })
    const {name, id} = data
    const length = component.length
    components.push({component, props: {name, id, length} })
    Map(data.opened)
  } 
  return components
}


function DirLists({ title, Icon, onClick }: { title: string; Icon: ReactNode, onClick: ()=>void }) {
  return (  
  <ListItemButton onClick={onClick}>
      <ListItemIcon>
       {Icon}
      </ListItemIcon>
      <ListItemText primary={title} />
  </ListItemButton> 
  );
} 
 


  

export function MapDirectory(dirs: directoryType) {
  const items:  {dirItems:( fileType | folderType)[]; dir: directoryType}[]= [];
  mapper(dirs)
  function mapper(data: directoryType | null) {
    if(!data) return
    const item: (fileType | folderType)[] = [];
    data.files.forEach(file=>item[file.index] = file)
    data.folders.forEach(folder=>item[folder.index] = folder)
    items.push({dirItems: item, dir: data})
    mapper(data.opened)
  }
  return items
}