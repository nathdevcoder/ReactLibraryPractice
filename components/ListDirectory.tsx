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
    ItemProps: (dirItems: dirTypes) => ({
        fileProps:dirItemProps
        folderProps:dirItemProps
    }) 
    dirItems: dirTypes[]
    actionProps: dirActionProps
}

export default function ListDirectory({ItemProps, dirItems, actionProps}: ListDirsType) {
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
            const {fileProps, folderProps} = ItemProps(item)
            if(item.dir === 'file') {
                if(item.type === 'video') return  <ListItemDir key={item.id} title={item.name} Icon={<VideoFileIcon color="error" />} {...fileProps} />
                if(item.type === 'image') return   <ListItemDir key={item.id} title={item.name} Icon={<PhotoIcon color='success' />} {...fileProps} />
                if(item.type === 'audio') return  <ListItemDir key={item.id} title={item.name} Icon={<AudioFileIcon sx={{color: 'violet'}}  />} {...fileProps} />
                if(item.type === 'docs') return  <ListItemDir key={item.id} title={item.name} Icon={<ArticleIcon color="info" />} {...fileProps} />
                if(item.type === 'pdfs') return  <ListItemDir key={item.id} title={item.name} Icon={<PictureAsPdfIcon color='secondary'  />} {...fileProps} />
                return <ListItemDir key={item.id} title={item.name} Icon={<InsertDriveFileIcon />} {...fileProps} />
            }
            if(item.dir === 'folder') {
                if(item.type === 'hidden') return <ListItemDir key={item.id} title={item.name} Icon={<FolderSharedOutlinedIcon color='warning' />}  {...folderProps} />
                if(item.type === 'locked') return <ListItemDir key={item.id} title={item.name} Icon={<SnippetFolderOutlinedIcon color='warning' />}  {...folderProps}/>
                if(item.type === 'private') return <ListItemDir key={item.id} title={item.name} Icon={<FolderZipOutlinedIcon  color='warning' />}  {...folderProps} />
                return <ListItemDir key={item.id} title={item.name} Icon={<FolderIcon  color='warning' />}  {...folderProps}  />
            }
        })}
        <ListContextActionDir anchorEl={anchorEl} onClose={()=>setAnchorEl(null)} {...actionProps} />
    </List>
  )
}
