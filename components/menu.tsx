"use client";
import { MenuType } from "@/@types/data"; 
import { Tooltip, IconButton, Menu, MenuItem, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

 

export default function MainMenu({ title, url, Icon, subMenu }: MenuType) {
  const router = useRouter() 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (url:string) => {
    setAnchorEl(null);
    router.push(url)
  };
  
    if (subMenu) {
      return (
        <>
          <Tooltip key={title} title={title} placement="top">
            <Button
              color="inherit"
              aria-label={title}
              sx={{ mr: 2, ml: -2,minWidth: 'unset' }}
              onClick={handleClick} 
            >
              <Icon />
            </Button>
          </Tooltip>
          <Menu
            id={title.replace(" ", "")}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {subMenu.map(({ url: subUrl, title: subTitle }) => (
              <MenuItem key={subTitle.replace(" ", "")} onClick={()=>handleClose(url+subUrl)}>{subTitle}</MenuItem>
            ))}
          </Menu>
        </>
      );
    }
    return (
      <Tooltip key={title} title={title} placement="top">
        <IconButton
          edge="start"
          color="inherit"
          aria-label={title}
          sx={{ mr: 2 }}
          LinkComponent={Link}
          href={url}
        >
          <Icon />
        </IconButton>
      </Tooltip>
    );
   
}
