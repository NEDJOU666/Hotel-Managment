import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { client } from "@/sanity/lib/client";
interface User{
    image: any;
    name:string;
    phoneNumber:number;
    email:string;
    password:string;
    confirmPassword:string;

 }
export async function GET(request: Request) {
    console.log("Hello")
    return Response.json({data:"Hello"},{status:200})
}

export async function POST(request:Request){
    const user:User  = await request.json()
    console.log(user)
    const  existingUser = await client.fetch(`*[_type=="user" && email=="${user.email}"]{
        name,
        email,
    }`).catch(err => {
        return err
    })
    if(existingUser.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    if(existingUser.length > 0 ){
        return NextResponse.json({message:"User with this email already exist"},{status:400})
    }
    const hashpassword =   await bcrypt.hash(user.password,10)
    const newUser = {
        name:user.name,
        phoneNumber:user.phoneNumber,
        email:user.email,
        password:hashpassword
    }
  const createdUser =   await client.create({
        _type:"user",
        profilePic: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: user.image
            }
          },
        name:user.name,
        email:user.email,
        phoneNumber:user.phoneNumber,
        password:hashpassword
    }).catch(err => {return err})
    if(createdUser.isNetworkError){
        return NextResponse.json({message:"Connection problem try later"},{status:400})
    }
    if(createdUser){
        return NextResponse.json({data:newUser},{status:201})
    }
    return NextResponse.json({data:newUser},{status:201})
}