"use client"
import { useState } from "react"

const UpperNav = () => {
  interface Itime_date {
    hour: number,
    min: number,
    sec: number,
    day: string,
    month: string,
    year: string,
  }
  const time = new Date()
  const [time_date, setTime_Date] = useState<Itime_date>({
    hour: new Date().getHours(),
    min: new Date().getMinutes(),
    sec: new Date().getSeconds(),
    day: new Date().getDate().toString(),
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
  });
  setInterval(() => {
    const current_date = new Date()
    setTime_Date({
      hour: current_date.getHours(),
      min: current_date.getMinutes(),
      sec: current_date.getSeconds(),
      day: current_date.getDate().toString(),
      month: (current_date.getMonth() + 1).toString(),
      year: current_date.getFullYear().toString(),
    })
  }, 500)
  return (
    <div>
      <div className="h-14 w-full  bg-[whitesmoke]">
        <nav className="flex flex-row justify-between items-center">
          <div className="pl-1 text-[20px] ">
            <i className="fa-sharp fa-solid fa-bars text-green-400"></i>
          </div>
          <div className="flex gap-2">
            <i className="fa-solid fa-user text-[20px] text-green-400"></i>
            <i className="fa-sharp  fa-solid fa-bell text-[20px] text-green-400"></i>
          </div>
          <div className="flex gap-8 pt-2 text text-green-400 justify-between items-center cursor-pointer pr-7">
            <span>{time_date.hour > 9 ? time_date.hour : `0${time_date.hour}`} : {time_date.min > 9 ? time_date.min : `0${time_date.min}`} : {time_date.sec > 9 ? time_date.sec : `0${time_date.sec}`}</span>
            <span>{time_date.day}/{time_date.month}/{time_date.year}</span>
            <div className="flex items-center gap-2 ">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="size-10 rounded-full object-cover"
              />
              {/* <span className="p-2 border rounded-full text-[.7rem] px-3 text-white bg-rose-300">A</span> */}
              <span>Admin</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default UpperNav
