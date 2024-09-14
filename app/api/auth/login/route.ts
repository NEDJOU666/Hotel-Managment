import { NextResponse } from "next/server";
import { client } from '../../../../sanity/lib/client';
import bcrypt from 'bcryptjs';

export async function GET(request:Request) {
    return NextResponse.json({data:"hello"},{status:200})
}

export async function POST(request:Request){
    const user = await request.json()
   const response = await client.fetch(`*[_type=="user"  && phoneNumber=="${user.phoneNumber}" && email=="${user.email}"]{
    profilePic,
    name,
    email,
    phoneNumber,    
    password,
    }`).catch(err => {
        return err
    })

    if(response.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }

    if(response.length == 0){
        return NextResponse.json({message:"Invalid Email or Password"},{status:400})
    }

    const checkPassword = await bcrypt.compare(user.password,response[0].password)
    if(!checkPassword){
        return NextResponse.json({message:"Invalid Email or Password"},{status:400})
    }
    return NextResponse.json({data:response[0]},{status:201})
}