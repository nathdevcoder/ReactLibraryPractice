'use client'
import directories from "@/constant/directories";
import { MapDirectories } from "@/utils/mapper";
import { Box, List, ListItem, ListSubheader, Stack } from "@mui/material";
import React from "react";

export default function FileSystem() {
  const directorys = MapDirectories(directories);
  return (
    <Box>
      <Stack direction="row">
        {directorys.map((dir) => (
          <List
            sx={{ width: "100%", maxWidth: 260, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Folder name
              </ListSubheader>
            }
          >
            {dir.map((FileItem) => (
              <ListItem disablePadding>{FileItem}</ListItem>
            ))}
          </List>
        ))}
      </Stack>
    </Box>
  );
}
