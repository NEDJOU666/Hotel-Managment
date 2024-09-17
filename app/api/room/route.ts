import { RoomDetails } from "@/app/component/interface/roomDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
export async function GET(){
    const res = await client.fetch(`*[_type == "room"]{
        _id,
        id,
        type,
        confort,
        mainImage,
        pricePerNight,
        status,
      }`).catch(err => err)
      if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
      }
      return NextResponse.json({data:res},{status:200})
      
}

export async function POST(request:Request){
    const newRoom:RoomDetails = await request.json()
    const res = await client.create({
        _type:"room",
        id:newRoom.id,
        type:newRoom.id,
        confort:newRoom.confort,
        mainImage:newRoom.mainImage,
        pricePerNight:newRoom.pricePerNight,
        status:newRoom.status,
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