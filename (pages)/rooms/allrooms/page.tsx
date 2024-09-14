import AllRoomsForm from "@/app/component/Room/AllRooms"
import { RoomDetails } from "@/app/component/interface/roomDetails"
import { revalidatePath } from "next/cache"

const getRoom  = async () => {
  "use server"
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/room`,{next:{tags:["room"]}})
  const data:{data:RoomDetails[]} = await res.json()
  return data.data
}
const onDelete =  async (_id:string) => {
  "use server"
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/room`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(_id),
    next:{ tags:["room"] }
  })
  const data:{data:RoomDetails[]} = await res.json()
  if(res.ok){
    revalidatePath("/rooms/allrooms")
    revalidatePath("/dashboard")
    revalidatePath("/")
    return data.data
  }
  else{
  }
  revalidatePath("/rooms/allrooms")
}

const page = async () => {
  const rooms  = await getRoom()
  
  return (
    <AllRoomsForm onDeleteClick={onDelete} rooms={rooms}/>
  )
}

export default page