import { StaffDetails } from "@/app/component/interface/staffDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
export async function GET(){
    const res = await client.fetch(`*[_type == "staff"]{
        _id,
        name,
        email,
    position,
    department,
    contact,
    dateOfHire,
    salary,
      }`).catch(err => err)
      if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
      }
      return NextResponse.json({data:res},{status:200})
      
}

export async function POST(request:Request){
    const newStaff:StaffDetails = await request.json()
    const res = await client.create({
        _type:"staff",
        name:newStaff.name,
        email:newStaff.email,
        position:newStaff.position,
        department:newStaff.department,
        contact:newStaff.contact,
        dateOfHire:newStaff.dateOfHire,
        salary:newStaff.salary,
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