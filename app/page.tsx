"use client"
import { useState } from "react"
import MainContent from "./layout/MainContent"
import SideMenu from "./layout/SideMenu"
import UpperNav from "./layout/UpperNav"

const page = () => {
  interface IcontIndex {
    first:number,
    second:number
  }
  const [contentIndex,setContentIndex] = useState<IcontIndex>({first:0,second:0})
  return (
    <>
    <div className="w-full h-[100vh] flex">
      <SideMenu setContentIndex={setContentIndex}/>
      <div className="w-full h-[100vh] ">
        <UpperNav/>
        <MainContent contentIndex={contentIndex}/>
      </div>
    </div>
    </>
  )
}

export default page
