import StaffList from "@/app/component/staff/StaffList"
import {StaffDetails} from "@/app/component/interface/staffDetails"
const getStaff  = async () => {
    "use server"
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/staff`,{next:{tags:["staff"]}})
    const data:{data:StaffDetails[]} = await res.json()
    return data.data
}
const page = async () => {
    const staffs  = await getStaff()
  return (
    <StaffList staff={staffs}/>
  )
}

export default page