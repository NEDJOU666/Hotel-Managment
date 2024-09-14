import StaffForm from "@/app/component/staff/StaffForm"
import { revalidatePath, revalidateTag } from "next/cache"
import { StaffDetails } from "@/app/component/interface/staffDetails"


const AddStaff = async (newStaff:StaffDetails) => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/staff`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newStaff),
        next:{tags:["staff"]}
    })
    const data = await res.json()
    if(res.ok){
        revalidateTag("staff")
        revalidatePath("/staff/allstaff")
        revalidatePath("/dashboard")
        revalidatePath("/")
        return data.data
    }
    else {
        revalidatePath("/staff/allstaff")
    }
}
const page = () => {
  return (
    <StaffForm onSave={AddStaff}/>
  )
}

export default page
