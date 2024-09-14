import { StaffDetails } from "@/app/component/interface/staffDetails"
import StaffForm from "@/app/component/staff/StaffEditForm"
import { client } from "@/sanity/lib/client"
import { revalidatePath } from "next/cache"
const getStaff  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/staff`,{next:{tags:["staff"]}})
    const data:{data:StaffDetails[]} = await res.json()
    return data.data
}
const onEdit = async (updateStaff:StaffDetails) => {
    "use server"
    const res  = await client.patch(updateStaff._id ? updateStaff._id : "").set(
        {
          name: updateStaff.name,
          email: updateStaff.email,
          position: updateStaff.position,
          department: updateStaff.department,
          contact: updateStaff.contact,
          dateOfHire: updateStaff.dateOfHire,
          salary: updateStaff.salary
        }
    ).commit()
        revalidatePath("/staff/allstaff")
        revalidatePath("/dashboard")
        revalidatePath("/")
}
const page = async ({params}:{params:{id:string}}) => {
    const staffs = await getStaff()
    const getStaffById = (staffId: string): any => {
        return staffs.find((staff:StaffDetails) => staff._id === staffId);
    }

  return (
    <StaffForm onEdit={onEdit} staff={getStaffById(params.id)}/>
  )
}

export default page