'use client' 
import useReactMyFiles from "@/hooks/useReactMyFiles";
import {
  Box,
  Breadcrumbs,
  IconButton,
  List, 
  ListItemIcon, 
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {status, directories, breadcrumbs, getFileProps, addFolder, getFolderProps} = useReactMyFiles({
    endpoint: '/api/directory',
    rootID: 'akfnr' 
  }); 
 
  if (status.loading && !directories) return <p>Loading..</p>;
  if (status.error) return <p>{status.error}</p>;
  if (!directories) return <p>No Data Found</p>;
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb"> 
       {breadcrumbs.map(bread=> <Typography key={bread.replace(" ", "")} >{bread}</Typography>)}
      </Breadcrumbs>
      <Stack direction="row">
        {directories.map(({dir, dirItems }) => (
          <List
            key={dir.id}
            sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper", pb: 8, px: 2, borderRight: '1px solid rgba(150, 150, 150, 0.1)' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component={Stack} direction='row' justifyContent='flex-end' >
                  {/* <ListItemText>{dir.name}</ListItemText> */}
                  <Box>
                    {/* <IconButton sx={{width: 'max-content'}} ><PushPinOutlinedIcon/></IconButton>   */}
                    <IconButton sx={{width: 'max-content'}} onClick={()=>addFolder(dir.id, dirItems.length)} ><CreateNewFolderIcon/></IconButton>  
                  </Box>
              </ListSubheader>
            }
            onContextMenu={(e) =>{
              e.preventDefault();
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            } }
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
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={()=>setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }} 
              onContextMenu={e=>e.preventDefault()} 
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={()=>addFolder(dir.id, dirItems.length)}>
                <ListItemIcon>
                  <CreateNewFolderIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Folder</ListItemText>
              </MenuItem> 
            </Menu>
          </List>
        ))}
      </Stack> 
    </Box>
  )
}
