"use client"
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react"
import { UserInfo } from "../component/interface/userInfo";
import { urlFor } from "@/sanity/lib/image";
import { useSession } from "next-auth/react";
interface Itime_date {
  hour: number,
  min: number,
  sec: number,
  day: string,
  month: string,
  year: string,
}
const UpperNav = () => {
  const {data:session}:any =  useSession()
    const data = session?.user
    const user:UserInfo = data?.data

  const [time_date, setTime_Date] = useState<Itime_date>({
    hour: new Date().getHours(),
    min: new Date().getMinutes(),
    sec: new Date().getSeconds(),
    day: new Date().getDate().toString(),
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const interval = setInterval(() => {
      const current_date = new Date()
      setTime_Date({
        hour: current_date.getHours(),
        min: current_date.getMinutes(),
        sec: current_date.getSeconds(),
        day: current_date.getDate().toString(),
        month: (current_date.getMonth() + 1).toString(),
        year: current_date.getFullYear().toString(),
      });
    }, 500);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full  fixed h-14">
      <div className="h-14 w-full px-5  left-0  bg-[whitesmoke]">
        <nav className="flex flex-row  justify-between items-center">
          <div  className="pl-1 flex md:hidden text-[20px]">
            <i  className="fa-sharp fa-solid fa-bars text-green-400"></i>
          </div>
          <div className="flex gap-2">
            <i className="fa-solid fa-user text-[20px] text-green-400"></i>
            <i className="fa-sharp fa-solid fa-bell text-[20px] text-green-400"></i>
          </div>
          <div className="flex gap-8 pt-2 text-green-400 justify-between items-center cursor-pointer pr-7">
            {isClient && (
              <>
                <span>
                  {time_date.hour > 9 ? time_date.hour : `0${time_date.hour}`} : 
                  {time_date.min > 9 ? time_date.min : `0${time_date.min}`} : 
                  {time_date.sec > 9 ? time_date.sec : `0${time_date.sec}`}
                </span>
                <span>{time_date.day}/{time_date.month}/{time_date.year}</span>
              </>
            )}
            <div className="hidden md:flex items-center gap-2">
              <img
                alt=""
                src={user ? urlFor(user.profilePic).url() : ""}
                className="size-10 rounded-full object-cover"
              />
              <span onClick={()=> signOut({callbackUrl: "/login"})}>Admin</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default UpperNav;
