import AddBookingForm from "@/app/component/Booking/AddBookingForm";
import AllBookings from "@/app/component/Booking/AllBookings";
import { BookingDetails } from "@/app/component/interface/bookingDetails"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { client } from "@/sanity/lib/client"

const getRoom = async () => {
    "use server"
    console.log("getting bbok")
    const res = await client.fetch(`*[_type == "room"]{
        _id,
        id,
        name,
        type,
        confort,
        pricePerNight,
  
      }`)
      .catch(err => console.log("error",err))
    
    return res
  }
const getBooking  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking`,{next:{tags:["booking"]}})
    const data:{data:BookingDetails[]} = await res.json()
    return data.data
  }
  const onAddBooking =  async (newBooking:BookingDetails) => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newBooking),
      next:{ tags:["booking"] }
    })
    const data:{data:BookingDetails[]} = await res.json()
    if(res.ok){
      revalidatePath("/booking/allbooking")
      revalidatePath("/dashboard")
      // revalidatePath("/")
      return data.data
    }
    else{
      return []
    }
  }
const page = async () => {
    const bookingPromise = getBooking()
    const roomPromise =  getRoom()
    const [room,bookings] = await Promise.all([roomPromise,bookingPromise])
  return (
    <AddBookingForm newId={bookings.length} onAddBooking={onAddBooking} booking={bookings} rooms={room}/>
  )
}

export default page