import AddCustomerForm from "@/app/component/Customers/AddCustomersForm"
import { CustomerDetails } from "@/app/component/interface/customerDetails"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { client } from "@/sanity/lib/client"


const getBooking  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer`,{next:{tags:["customer"]}})
    const data:{data:CustomerDetails[]} = await res.json()
    return data.data
  }
  const onAddCustomer =  async (newCustomer:CustomerDetails) => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newCustomer),
      next:{ tags:["booking"] }
    })
    const data:{data:CustomerDetails[]} = await res.json()
    if(res.ok){
      revalidatePath("/customer/allcustomers")
      revalidatePath("/dashboard")
      revalidatePath("/")
      return data.data
    }
    else{
      return []
    }
  }
const page = async () => {
    const customer:CustomerDetails[] = await getBooking()
  return (
    <>
    <AddCustomerForm onAddCustomer={onAddCustomer} newId={customer.length}/>
    </>
  )
}

export default page