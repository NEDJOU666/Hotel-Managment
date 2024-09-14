import { NextResponse } from 'next/server'
export async function POST(request:Request) {
    const key  = await request.json()
    console.log(key)
    return NextResponse.json({data:key})
}