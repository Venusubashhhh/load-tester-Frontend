"use client"
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRecoilState } from 'recoil';
import dataAtom from '../atom/data.atom'
export default function ApiSelectComponent() {

    const [data, setData] = useRecoilState(dataAtom);
    const { api, duration, request } = data;
  const handleSelectChange = (event) => {
    setData((prevData) => ({
        ...prevData,
        api: event.target.value,
  }));
  };

  return (
    <FormControl>
      <FormLabel>API</FormLabel>
      <Select
        value={api}
        onChange={handleSelectChange}
        sx={{width:'225%'}}
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
      <FormHelperText>This is a helper text.</FormHelperText>
    </FormControl>
  );
}
