"use client";

import FormControl from "@mui/material/FormControl";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dataAtom from "../atom/data.atom";
import FormLabel from "@mui/material/FormLabel";
import { useRecoilState } from "recoil";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
export default function FullWidthTextField() {
  const [data, setData] = useRecoilState(dataAtom);
  const { api, duration, request } = data;
  const handleSelectChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      request: event.target.value,
    }));
  };
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <FormLabel>Request Rate</FormLabel>
      <OutlinedInput
        id="outlined-adornment-weight"
        endAdornment={<InputAdornment position="end">Request</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
        }}
        value={request}
        placeholder="No. of Request"
        onChange={handleSelectChange}
        sx={{ width: "130%", marginLeft: "-7px" }}
      />
      <span>Per</span>
      
      <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
    </FormControl>
  );
}
