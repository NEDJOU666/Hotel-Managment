import { ObjectiveDetails } from "@/app/component/interface/objectiveDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
export async function GET(){
    const res = await client.fetch(`*[_type == "settings"]{
        _id,
        customerObjective,
        bookingObjective,
        roomObjective,
        employeeObjective,
      }`).catch(err => err)
      if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
      }
      return NextResponse.json({data:res},{status:200})
      
}

export async function POST(request:Request){
    const newObjectif:ObjectiveDetails = await request.json()
    const res = await client.create({
        _type:"settings",
        customerObjective:newObjectif.customerObjective,
        bookingObjective:newObjectif.bookingObjective,
        roomObjective:newObjectif.roomObjective,
        employeeObjective:newObjectif.employeeObjective,
        
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