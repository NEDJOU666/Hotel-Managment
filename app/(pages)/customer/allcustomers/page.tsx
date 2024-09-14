import AllBookings from "@/app/component/Booking/AllBookings"
import AllCustomersForm from "@/app/component/Customers/AllCustomers"
import { CustomerDetails } from "@/app/component/interface/customerDetails"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const getCustomer  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer`,{next:{tags:["customer"]}})
    const data:{data:CustomerDetails[]} = await res.json()
    return data.data
  }
const onDelete =  async (_id:string) => {
    "use server"
    console.log(_id)
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(_id),
      next:{ tags:["customer"] }
    })
    const data:{data:CustomerDetails[]} = await res.json()
    if(res.ok){
      revalidatePath("/customer/allcustomers")
      revalidatePath("/dashboard")
      revalidatePath("/")
      return data.data
    }
    else{
    }
    revalidatePath("/customer/allcustomers")
  }


const page = async () => {
  const customers = await getCustomer()
  return (
    <AllCustomersForm onDeleteClick={onDelete} customers={customers}/>
  )
}

export default page
