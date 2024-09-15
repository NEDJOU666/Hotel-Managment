import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import RegisterForm from './form';
const page = async () => {
  const session = await getServerSession(authOptions)
  if(session){
    redirect("/")
  }
  return (
    <RegisterForm/>
  )
}

export default page