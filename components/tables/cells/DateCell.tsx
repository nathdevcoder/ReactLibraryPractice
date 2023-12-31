'use client'
import React from 'react'
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

export default function DateCell({date}:{date: Date}) {
  return  <DateField readOnly variant='standard' defaultValue={dayjs(date)}/>
}
