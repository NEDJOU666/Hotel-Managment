import Feedback from '../Feedback';
import Card from '../Card';
import CardData from '../../Data/CardData';
import { client } from '@/sanity/lib/client';
import objectifData from '../../Data/ObjectifData'
import { Suspense } from 'react';
import ChartDisplay from './ChartDisplay';
import { unstable_cache } from 'next/cache';



const getRoom = async () => {
  "use server"
  console.log("getting bbok")
  const res = await client.fetch(`*[_type == "room"]{
      _id,
      name,
      type,
      description,
      price,
      maxOccupancy,
      image
    }`)
    .catch(err => console.log("error",err))
  
  return res
}
const getBooking = async () => {
  "use server"
  console.log("getting booking")
  const res = 
    await client.fetch(`*[_type == "booking"]{
      _id,
      id,
      name,
      email,
      checkInDate,
      checkOutDate,
      roomType,
      roomComfort,
      chooosenRoom,
      totalAmount,
      guests,
    }`)
    .catch(err => console.log("error",err))
  return res
}

const First_template =  ({Booking,Room}:{Booking:any[],Room:any[]}) => {
  const getAmount = (value:number,name:string)=>{
    switch(name){
      case objectifData.booking.name:
        return (Booking?.length /objectifData.booking.qty)*100
      case objectifData.roomsAday.name:
        return (Room?.length /objectifData.roomsAday.qty)*100
    }
  }
  return (
    <div>
      <h1 className="font-semibold text-[1.5rem] px-4 md:px-4 pt-3">DashBoard</h1>
      <h3 className="px-4 text-[.7rem] text-green-400">Welcome to your Dashboard</h3>
      <div className="flex flex-col md:flex-row pt-3 mx-2 md:pl-5 gap-2">
        {CardData.map((item, index) => {
          const amount = getAmount(item.amount,item.name.toLowerCase())
          if(item.name == "Booking" || index==0){
            if (index < 4) {
              return (
                <Card
                  key={index}  // Add the key prop here
                  icon={item.icon}
                  amount={Booking?.length}
                  percent={ amount ? Math.floor(amount): 0}
                  name={item.name}
                  diff={item.diffrence}
                />
              );
            }
          }
          else if(item.name == "Rooms"){
            if (index < 4) {
              return (
                <Card
                  key={index}  // Add the key prop here
                  icon={item.icon}
                  amount={Room?.length }
                  percent={ amount ? Math.floor(amount): 0}
                  name={item.name}
                  diff={item.diffrence}
                />
              );
            }

          }
          else
          {
            if (index < 4) {
              return (
                <Card
                  key={index}  // Add the key prop here
                  icon={item.icon}
                  amount={item.amount}
                  percent={item.percentage}
                  name={item.name}
                  diff={item.diffrence}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
};


const DasboardFetcher = async  () => {
  const BookingPromise =  getBooking()
  const RoomPromise =  getRoom()
  const [Room,Booking] = await Promise.all([RoomPromise,BookingPromise])
  
  return (
    <>
     
      <div className="flex flex-col h-full bg-gray-200 space-y-2">
        <First_template Booking={Booking} Room={Room} />
        <div className="flex flex-col md:flex-row ml-1 mr-3 w-full gap-2">
          <div className="w-full md:w-[48%] bg-white shadow-md rounded-xl pt-2 shadow-gray-300  md:px-5 md:ml-5">
            <ChartDisplay/>
          </div>
          <Feedback />
        </div>
      </div>
    </>
  );
};

export default DasboardFetcher;
