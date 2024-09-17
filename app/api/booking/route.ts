import { BookingDetails } from "@/app/component/interface/bookingDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
export async function GET(){
    const res = await client.fetch(`*[_type == "booking"]{
        _id,
        id,
        name,
        email,
        checkInDate,
        checkOutDate,
        roomType,
        roomConfort,
        choosenRoom,
        priceAnight,
        totalAmountPaid,
        guests,
      }`).catch(err => err)
      if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
      }
      return NextResponse.json({data:res},{status:200})
      
}

export async function POST(request:Request){
    const newBooking:BookingDetails = await request.json()
    const res = await client.create({
        _type:"booking",
        id:newBooking.id,
        name:newBooking.name,
        email:newBooking.email,
        checkInDate:newBooking.checkInDate,
        checkOutDate:newBooking.checkOutDate,
        roomType:newBooking.roomType,
        roomConfort:newBooking.roomConfort,
        choosenRoom:newBooking.choosenRoom,
        priceAnight:newBooking.priceAnight,
        totalAmountPaid:newBooking.totalAmountPaid,
        guests:newBooking.guests
    }).then(data => data).catch(err => {return err})
    if(res.isNetworkError){
      return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    return NextResponse.json({data:res},{status:201})
}

export async function DELETE(request:Request){
      const _id = await request.json()

      const res = await client.delete(_id).then(data => data).catch(err => {return err})
      if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
      }
      return NextResponse.json({data:res},{status:200})
}