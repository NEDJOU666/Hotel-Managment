import { CustomerDetails } from "@/app/component/interface/customerDetails";
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
export async function GET(){
    const res = await client.fetch(`*[_type == "customer"]{
        _id,
        id,
        name,
        email,
        phoneNumber,
        picture,
        birthday,
        favoriteAmenities,
        roomPreferences,
        Nationality
      }`).catch(err => err)
      if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
      }
      return NextResponse.json({data:res},{status:200})
      
}

export async function POST(request:Request){
    const newCustomer:CustomerDetails = await request.json()
    const res = await client.create({
        _type:"customer",
        id:newCustomer.id,
        name:newCustomer.name,
        email:newCustomer.email,
        phoneNumber:newCustomer.phoneNumber,
        picture: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: newCustomer.picture,
          }
        },
        birthday:newCustomer.birthday,
        favoriteAmenities:newCustomer.favoriteAmenities,
        roomPreferences: newCustomer.roomPreferences,
        Nationality: newCustomer.Nationality,
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