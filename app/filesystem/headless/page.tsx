'use client' 
import useReactMyFiles from "@/hooks/useReactMyFiles";
import {
  Box,
  IconButton,
  List, 
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
import React  from "react";
import ListItemDir from "@/components/ListItemDir";

export default function MyFilesHeadless() { 
  const {status, directories, getFileProps, addFolder, getFolderProps} = useReactMyFiles({
    endpoint: '/api/directory',
    rootID: 'akfnr' 
  }); 
 
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
                    if(item.type === 'video') return  <ListItemDir key={item.id} title={item.name} Icon={<VideoFileIcon color="error" />} {...getFileProps(dir,item)} />
                    if(item.type === 'image') return   <ListItemDir key={item.id} title={item.name} Icon={<PhotoIcon color='success' />} {...getFileProps(dir,item)} />
                    if(item.type === 'audio') return  <ListItemDir key={item.id} title={item.name} Icon={<AudioFileIcon sx={{color: 'violet'}}  />} {...getFileProps(dir,item)} />
                    if(item.type === 'docs') return  <ListItemDir key={item.id} title={item.name} Icon={<ArticleIcon color="info" />} {...getFileProps(dir,item)} />
                    if(item.type === 'pdfs') return  <ListItemDir key={item.id} title={item.name} Icon={<PictureAsPdfIcon color='secondary'  />} {...getFileProps(dir,item)} />
                    return <ListItemDir key={item.id} title={item.name} Icon={<InsertDriveFileIcon />} {...getFileProps(dir,item)} />
                } 
                if(item.dir === 'folder') {
                    if(item.type === 'hidden') return <ListItemDir key={item.id} title={item.name} Icon={<FolderSharedOutlinedIcon color='warning' />}  {...getFolderProps(dir, item)} />
                    if(item.type === 'locked') return <ListItemDir key={item.id} title={item.name} Icon={<SnippetFolderOutlinedIcon color='warning' />}  {...getFolderProps(dir, item)}/>
                    if(item.type === 'private') return <ListItemDir key={item.id} title={item.name} Icon={<FolderZipOutlinedIcon  color='warning' />}  {...getFolderProps(dir, item)} />
                    return <ListItemDir key={item.id} title={item.name} Icon={<FolderIcon  color='warning' />}  {...getFolderProps(dir, item)}  />
                }
            })}
          </List>
        ))}
      </Stack> 
    </Box>
  )
}
