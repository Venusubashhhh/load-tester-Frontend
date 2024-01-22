"use client" 
import { atom } from "recoil";

const data = atom({
  key: "data",
  default: {
   request:0,
    duration: "",
    api: "",
  },
});

export default data;