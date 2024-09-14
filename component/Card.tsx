"use client"
import { Circle } from 'rc-progress';


const Card =  ({icon,amount,percent,name,diff}:{icon:string,amount:number,percent:number,name:string,diff:number}) => {
  return (
    <>
      {
        name.toLowerCase() === "rooms" || name.toLocaleLowerCase() === "booking" ? (
          <div  className=" w-full md:!w-[24%]  hover:scale-[1.05] duration-500 cursor-pointer h-[150px] flex flex-col px-5 justify-center   shadow-md shadow-gray-300 rounded-xl bg-white">
            <div className="flex w-full justify-between items-center">
              <div className="">
                <i className={`${icon} text-[1.5rem] text-gray-300`}></i>
                <h3 className="text-green-400 font-semibold">{amount}</h3>

              </div>
              <div className=" w-[50px] p-1 h-[50px] mb-3">
                <Circle percent={percent} trailWidth={3} trailColor='#d1d5db'  strokeWidth={10}  strokeColor="#4ade80" /></div>
             </div>
            <div className="flex justify-between  items-center">
              <div className="text-[.8rem] text-green-400 ">{name}</div>
              <div className="text-[.6rem] text-green-400 pr-2">+{diff}%</div>
            </div>
          </div>
        ):(
          <div  className="w-full md:!w-[24%] hover:scale-[1.05] duration-500 cursor-pointer h-[150px] flex flex-col px-5 justify-center   shadow-md shadow-gray-300 rounded-xl bg-white">
            <div className="flex w-full justify-between items-center">
              <div className="">
                <i className={`${icon} text-[1.5rem] text-gray-300`}></i>
                <h3 className="text-green-400 font-semibold">${amount}</h3>

              </div>
              <div className=" w-[50px] p-1 h-[50px] mb-3">
                <Circle percent={percent} trailWidth={3} trailColor='#d1d5db'  strokeWidth={10}  strokeColor="#4ade80" /></div>
             </div>
            <div className="flex justify-between  items-center">
              <div className="text-[.8rem] text-green-400 ">{name}</div>
              <div className="text-[.6rem] text-green-400 pr-2">+{diff}%</div>
            </div>
          </div>
        )
      }
      </>
  )
}

export default Card
