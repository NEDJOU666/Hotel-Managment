import { RoomDetails } from "@/app/component/interface/roomDetails"
import AddRoomsForm from "@/app/component/Room/AddRoomsForm"
import { revalidateTag,revalidatePath } from "next/cache"

const AddRoom = async (newRoom:RoomDetails) => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/room`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newRoom),
      next:{ tags:["room"] }
    })
    const data:{data:RoomDetails[]} = await res.json()
    if(res.ok){
      revalidateTag('room')
      revalidatePath("/rooms/allrooms")
      revalidatePath("/dashboard")
      revalidatePath("/")
      return data.data
    }
    else{
      return []
    }
}
const getRoom  = async () => {
  "use server"
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/room`,{next:{tags:["room"]}})
  const data:{data:RoomDetails[]} = await res.json()
  return data.data
}

const page = async () => {
  const rooms = await getRoom()
  return (
    <AddRoomsForm onAddRoom={AddRoom} newId={rooms.length} />
  )
}

export default page