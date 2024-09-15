import Login from "../component/login"
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
const page = async () => {
  const session = await getServerSession(authOptions)
  if(session){
    redirect("/")
  }
  return (
    <>
    <Login/>
    </>
  )
}

export default page
