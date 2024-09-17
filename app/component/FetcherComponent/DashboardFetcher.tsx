import Feedback from '../Feedback';
import Card from '../Card';
import CardData from '../../Data/CardData';
import { client } from '@/sanity/lib/client';
import objectifData from '../../Data/ObjectifData'
import { Suspense } from 'react';
import ChartDisplay from './ChartDisplay';
import { unstable_cache } from 'next/cache';
import { StaffDetails } from '../interface/staffDetails';
import { CustomerDetails } from '../interface/customerDetails';



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
const getStaff  = async () => {
  "use server"
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/staff`,{
    
    cache:"no-store",
    next:{tags:["staff"]}})
  const data:{data:StaffDetails[]} = await res.json()
  return data.data
}
const getCustomer  = async () => {
  "use server"
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer`,{
    cache:"no-store",
    next:{tags:["customer"]}})
  const data:{data:CustomerDetails[]} = await res.json()
  return data.data
}

const First_template =  ({Booking,Room,Customer,Staff}:{Booking:any[],Room:any[],Customer:any[],Staff:any[]}) => {
  const getAmount = (value:number,name:string)=>{
    switch(name){
      case objectifData.booking.name:
        return (Booking?.length /objectifData.booking.qty)*100
      case objectifData.roomsAday.name:
        return (Room?.length /objectifData.roomsAday.qty)*100
      case objectifData.customer.name:
        return (Customer?.length /objectifData.customer.qty)*100
      case objectifData.Employee.name:
        return (Staff?.length / objectifData.customer.qty) * 100
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
          else if(item.name == "Customer"){
            if (index < 4) {
              return (
                <Card
                  key={index}  // Add the key prop here
                  icon={item.icon}
                  amount={Customer?.length }
                  percent={ amount ? Math.floor(amount): 0}
                  name={item.name}
                  diff={item.diffrence}
                />
              );
            }
          }
          else if(item.name == "Employee"){
            if (index < 4) {
              return (
                <Card
                  key={index}  // Add the key prop here
                  icon={item.icon}
                  amount={Staff?.length }
                  percent={ amount ? Math.floor(amount): 0}
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
  const CustomerPromise = getCustomer()
  const StaffPromise = getStaff()
  const [Room,Booking,Customer,Staff] = await Promise.all([RoomPromise,BookingPromise,CustomerPromise,StaffPromise])
  
  return (
    <>
     
      <div className="flex flex-col h-full bg-gray-200 space-y-2">
        <First_template Booking={Booking} Room={Room} Customer={Customer}  Staff={Staff} />

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
