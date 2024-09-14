import AllBookings from "@/app/component/Booking/AllBookings"
import { BookingDetails } from "@/app/component/interface/bookingDetails"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const getBooking  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking`,{next:{tags:["booking"]}})
    const data:{data:BookingDetails[]} = await res.json()
    return data.data
  }
const onDelete =  async (_id:string) => {
    "use server"
    console.log(_id)
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(_id),
      next:{ tags:["booking"] }
    })
    const data:{data:BookingDetails[]} = await res.json()
    if(res.ok){
      revalidatePath("/booking/allbooking")
      revalidatePath("/dashboard")
      return data.data
    }
    else{
    }
    revalidatePath("/booking/allbooking")
  }


const page = async () => {
  const bookings = await getBooking()
  return (
    <AllBookings onDeleteClick={onDelete} bookings={bookings}/>
  )
}

export default page
