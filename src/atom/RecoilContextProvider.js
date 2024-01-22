"use client" 
import { RecoilRoot } from "recoil";

export default function RecoilContextProvider(props) {
  return <RecoilRoot>{props.children}</RecoilRoot>;
}