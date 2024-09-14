import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { CustomerDetails } from "@/app/component/interface/customerDetails";
import EditBookingForm from "@/app/component/Booking/EditBookingForm";
import EditCustomerForm from "@/app/component/Customers/EditCustomersForm";

const getCustomer  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer`,{next:{tags:["customer"]}})
    const data:{data:CustomerDetails[]} = await res.json()
    return data.data
  }

const onEdit =  async (updateCustomer:CustomerDetails) => {
    "use server"
    const res = await client.patch(updateCustomer._id? updateCustomer._id : "").set(
      {
        id: updateCustomer.id,
        name: updateCustomer.name,
        email: updateCustomer.email,
        phoneNumber:updateCustomer.phoneNumber,
        picture:updateCustomer.picture,
        birthday:updateCustomer.birthday,
        favoriteAmenities:updateCustomer.favoriteAmenities,
        roomPreferences: updateCustomer.roomPreferences,
        Nationality: updateCustomer.Nationality,
      }
    ).commit()
    revalidatePath("/customer/allcustomers")
    revalidatePath("/dashboard")
    revalidatePath("/")
  }
const page = async ({params}:{params:{id:string}}) => {
  const customers:CustomerDetails[] = await getCustomer()
  const getCustomerById = (customerId: string): any => {
    return customers.find((customer:CustomerDetails) => customer._id === customerId);
  }
  return (
    <EditCustomerForm onUpdate={onEdit} customer={getCustomerById(params.id)}/>
  )
}

export default page