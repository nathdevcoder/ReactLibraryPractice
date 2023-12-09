'use client' 
import useReactMyFiles from "@/hooks/useReactMyFiles";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
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
import React, { ReactNode } from "react";

export default function MyFilesHeadless() { 
  const {status, directories, openFolder, addFolder, renameFolder} = useReactMyFiles({
    endpoint: '/api/directory',
    rootID: 'akfnr' 
  });

  function DirLists({ title, Icon, onClick, }: { title: string; Icon: ReactNode; onClick: () => void; }) {
    return (
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    );
  } 
  if (status.loading && !directories) return <p>Loading..</p>;
  if (status.error) return <p>{status.error}</p>;
  if (!directories) return <p>No Data Found</p>;
  return (
    <Box>
      <Stack direction="row">
        {directories.map(({dir, dirItems }) => (
          <List
            key={dir.id}
            sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component={Stack} direction='row' justifyContent='flex-end' >
                  <ListItemText>{dir.name}</ListItemText>
                  <Box>
                    <IconButton sx={{width: 'max-content'}} ><PushPinOutlinedIcon/></IconButton>  
                    <IconButton sx={{width: 'max-content'}} onClick={()=>addFolder(dir.id, dirItems.length)} ><CreateNewFolderIcon/></IconButton>  
                  </Box>
              </ListSubheader>
            }
          >
            {dirItems.map((item) => {
                if(item.dir === 'file') {
                    if(item.type === 'video') return  <DirLists key={item.id} title={item.name} Icon={<VideoFileIcon color="error" />} onClick={()=> {} } />
                    if(item.type === 'image') return   <DirLists key={item.id} title={item.name} Icon={<PhotoIcon color='success' />} onClick={()=> {} } />
                    if(item.type === 'audio') return  <DirLists key={item.id} title={item.name} Icon={<AudioFileIcon sx={{color: 'violet'}}  />} onClick={()=> {} } />
                    if(item.type === 'docs') return  <DirLists key={item.id} title={item.name} Icon={<ArticleIcon color="info" />} onClick={()=> {} } />
                    if(item.type === 'pdfs') return  <DirLists key={item.id} title={item.name} Icon={<PictureAsPdfIcon color='secondary'  />} onClick={()=> {} } />
                    return <DirLists key={item.id} title={item.name} Icon={<InsertDriveFileIcon />} onClick={()=> {} } />
                } 
                if(item.dir === 'folder') {
                    if(item.type === 'hidden') return <DirLists key={item.id} title={item.name} Icon={<FolderSharedOutlinedIcon color='warning' />}  onClick={()=> openFolder(item.id, dir.id) } />
                    if(item.type === 'locked') return <DirLists key={item.id} title={item.name} Icon={<SnippetFolderOutlinedIcon color='warning' />}  onClick={()=> openFolder(item.id, dir.id) } />
                    if(item.type === 'private') return <DirLists key={item.id} title={item.name} Icon={<FolderZipOutlinedIcon  color='warning' />}  onClick={()=> openFolder(item.id, dir.id) } />
                    return <DirLists key={item.id} title={item.name} Icon={<FolderIcon  color='warning' />}  onClick={()=> openFolder(item.id, dir.id) } />
                }
            })}
          </List>
        ))}
      </Stack>
    </Box>
  )
}
