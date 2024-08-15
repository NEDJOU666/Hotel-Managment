export async function GET(request: Request) {
    console.log("Hello")
    return Response.json({data:"Hello"},{status:200})
}