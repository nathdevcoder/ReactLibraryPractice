'use client'  
import {
  Box, 
  IconButton,
  List,  
  ListSubheader, 
  Stack, 
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import ArticleIcon from "@mui/icons-material/Article";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from "@mui/icons-material/Folder";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import React  from "react";
import ListItemDir from "@/components/ListItemDir";  
import ListContextActionDir from "@/components/ListContextActionDir";
import ListActionDir from "./ListActionDir";


type ListDirsType = {
    getItemProps: (item: dirTypes) => dirItemProps 
    dirItems: dirTypes[]
    actionProps: dirActionProps
}

export default function ListDirectory({getItemProps, dirItems, actionProps}: ListDirsType) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); 

  return (
    <List 
        sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper", pb: 8, px: 2, borderRight: '1px solid rgba(150, 150, 150, 0.1)' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={ <ListActionDir {...actionProps} /> }
        onContextMenu={(e) =>{ e.preventDefault();e.stopPropagation();setAnchorEl(e.currentTarget);}}
    >
        {dirItems.map((item) => {
            const itemProps = getItemProps(item)
            if(item.dir === 'file') {
                if(item.type === 'video') return  <ListItemDir key={item.id} title={item.name} Icon={<VideoFileIcon color="error" />} {...itemProps} />
                if(item.type === 'image') return   <ListItemDir key={item.id} title={item.name} Icon={<PhotoIcon color='success' />} {...itemProps} />
                if(item.type === 'audio') return  <ListItemDir key={item.id} title={item.name} Icon={<AudioFileIcon sx={{color: 'violet'}}  />} {...itemProps} />
                if(item.type === 'docs') return  <ListItemDir key={item.id} title={item.name} Icon={<ArticleIcon color="info" />} {...itemProps} />
                if(item.type === 'pdfs') return  <ListItemDir key={item.id} title={item.name} Icon={<PictureAsPdfIcon color='secondary'  />} {...itemProps} />
                return <ListItemDir key={item.id} title={item.name} Icon={<InsertDriveFileIcon />} {...itemProps} />
            }
            if(item.dir === 'folder') { 
                if(item.type === 'hidden') return <ListItemDir key={item.id} title={item.name} Icon={<FolderSharedOutlinedIcon color='warning' />}  {...itemProps} />
                if(item.type === 'locked') return <ListItemDir key={item.id} title={item.name} Icon={<SnippetFolderOutlinedIcon color='warning' />}  {...itemProps}/>
                if(item.type === 'private') return <ListItemDir key={item.id} title={item.name} Icon={<FolderZipOutlinedIcon  color='warning' />}  {...itemProps} />
                return <ListItemDir key={item.id} title={item.name} Icon={<FolderIcon  color='warning' />}  {...itemProps}  />
            }
        })}
        <ListContextActionDir anchorEl={anchorEl} onClose={()=>setAnchorEl(null)} {...actionProps} />
    </List>
  )
}
