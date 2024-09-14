import { RoomDetails } from "@/app/component/interface/roomDetails"
import EditRoomsForm from "@/app/component/Room/EditRoomsForm";
import { client } from "@/sanity/lib/client"
import { revalidatePath,revalidateTag} from 'next/cache';

const getRoom  = async () => {
  "use server"
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/room`,{next:{tags:["room"]}})
  const data:{data:RoomDetails[]} = await res.json()
  return data.data
}
const onEdit =  async (updateRoom:RoomDetails) => {
  "use server"
  const res = await client.patch(updateRoom._id? updateRoom._id : "").set(
    {
      id: updateRoom.id,
      type:updateRoom.type,
      confort:updateRoom.confort,
      mainImage:updateRoom.mainImage,
      pricePerNight:updateRoom.pricePerNight,
      status:updateRoom.status,
    }
  ).commit()
  revalidatePath("/rooms/allrooms")
  revalidatePath("/dashboard")
  revalidatePath("/")
}
const page = async ({params}:{params:{id:string}}) => {
  const rooms:RoomDetails[] = await getRoom()
  const getRoomById = (roomId: string): any => {
    return rooms.find((room:RoomDetails) => room._id === roomId);
  }
  return (
    <EditRoomsForm room={getRoomById(params.id)} onEditRoom={onEdit}/>
  )
}

export default page