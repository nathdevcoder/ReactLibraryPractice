import {
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Stack,
  Skeleton,
} from "@mui/material";
import React from "react";

type tableLoadingType = {
    cols: string[];
    heading?: string;
  }

export default function TableLoading({ cols,  heading }:tableLoadingType ) {
  return (
    <TableContainer>
      <Typography variant="h6" mb={4}>
        {heading}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell key={Math.random()}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <Stack spacing={2}>
        <Skeleton height={40} width="100%" variant="rectangular" animation="pulse" />
        <Skeleton height={40} width="100%" variant="rectangular" animation="pulse" />
        <Skeleton height={40} width="100%" variant="rectangular" animation="pulse" /> 
      </Stack>
    </TableContainer>
  );
}
