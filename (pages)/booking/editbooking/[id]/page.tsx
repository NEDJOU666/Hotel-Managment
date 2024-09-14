import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { BookingDetails } from "@/app/component/interface/bookingDetails";
import EditBookingForm from "@/app/component/Booking/EditBookingForm";

const getBooking  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking`,{next:{tags:["booking"]}})
    const data:{data:BookingDetails[]} = await res.json()
    return data.data
  }

const onEdit =  async (updateBooking:BookingDetails) => {
    "use server"
    const res = await client.patch(updateBooking._id).set(
      {
        id: updateBooking.id,
        name: updateBooking.name,
        email: updateBooking.email,
        checkInDate: updateBooking.checkInDate,
        checkOutDate: updateBooking.checkOutDate,
        roomType: updateBooking.roomType,
        roomConfort: updateBooking.roomConfort,
        choosenRoom: updateBooking.choosenRoom,
        priceAnight: updateBooking.priceAnight,
        totalAmountPaid: updateBooking.totalAmountPaid,
        guests: updateBooking.guests
      }
    ).commit()
    revalidatePath("/booking/allbooking")
    revalidatePath("/dashboard")
  }
const page = async ({params}:{params:{id:string}}) => {
  const bookings:BookingDetails[] = await getBooking()
  const getBookingById = (bookingId: string): any => {
    return bookings.find((booking:BookingDetails) => booking._id === bookingId);
  }
  return (
    <EditBookingForm onUpdate={onEdit} booking={getBookingById(params.id)}/>
  )
}

export default page