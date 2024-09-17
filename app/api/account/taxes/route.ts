import { Tax } from "@/app/component/interface/taxDetails";
import { client } from "@/sanity/lib/client";
import next from "next";
import { NextResponse } from "next/server";

export async function GET(){
    const res = await client.fetch(`*[_type=="tax"]{
        _id,
        id,
        type,
        amount,
        date,
    }`).catch(err => {return err})
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
      }
      return NextResponse.json({data:res},{status:200})
}

export async function POST(request:Request) {
    const newTax:Tax = await request.json()
    console.log(newTax)
    const res = await client.create({
        _type:"tax",
        id:newTax.id,
        type:newTax.type,
        amount: newTax.amount,
        date: newTax.date
    }).catch(err => {return err})
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    console.log(res)
    return NextResponse.json({data:res},{status:201})
}

export async function DELETE(request:Request) {
    const _id = await request.json()

    const res = await client.delete(_id).catch(err => {return err})
    if(res.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    return NextResponse.json({data:res},{status:200})
}