"use client";
import menu from "@/constant/menu";
import { Tooltip, IconButton, Menu, MenuItem, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function MainMenu() {
  const {push} = useRouter() 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (url:string) => {
    setAnchorEl(null);
    push(url)
  };
  return menu.map(({ title, url, Icon, subMenu }) => {
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
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {subMenu.map(({ url: subUrl, title: subTitle }) => (
              <MenuItem onClick={()=>handleClose(url+subUrl)}>{subTitle}</MenuItem>
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
  });
}
