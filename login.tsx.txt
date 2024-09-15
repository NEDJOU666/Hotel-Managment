"use client"
import './login.css'
import { useEffect, useState } from 'react';
import { FaUser, FaLock} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { signIn } from 'next-auth/react';
import {useRouter} from 'next/navigation'
import Link from 'next/link';

interface User{
  email:string;
  phoneNumber:number;
  password:string;
}
interface notification_popupMsg{
  icon:string,
  message:string,
  openDisplay:boolean,
  status:"success" | "error"
}
const Login = () => {
  const router =  useRouter()
  const [submitting,setsubmitting] = useState(false)
  const [notification_popup,setnotification_popup] = useState<notification_popupMsg>({
    icon:"",
    message:"",
    openDisplay:false,
    status:"success"
  })
  const [user,setUser] = useState<User>({
    email:"",
    phoneNumber:0,
    password:"",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  useEffect(()=>{
    if(notification_popup.openDisplay){
      setTimeout(()=>{
        setnotification_popup({
          icon:"",
          message:"",
          openDisplay:false,
          status:"success"
        })
      },7000)
    }
  },[notification_popup.openDisplay])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const response = await fetch("/api/auth/login",{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // })
    // if(response.ok){
    //   const data = await response.json()
    //   console.log(data)
    // }
    // else{
    //   const data = await response.json()
    //   console.log(data.message)
    // }
    const res = await signIn("credentials",{
      email:user.email,
      phoneNumber:user.phoneNumber,
      password:user.password,
      redirect:false,
    })
    if(res?.ok){  
      router.push("/")
    }
    else{
      setnotification_popup({
        icon:"fa-solid fa-circle-xmark",
        message:res?.error || "Something went wrong",
        openDisplay:true,
        status:"error"
      })
    }
  };
    return (
      <>
      {notification_popup.openDisplay && (
        <div className=" relative w-full h-fit flex bg-slate-50 justify-center">
        <div className=" absolute flex flex-col  items-center w-[300px] bg-white h-[60px] mt-4 rounded-md shadow-md shadow-gray-200">
            <div className="flex gap-1 justify-center items-center w-full h-full">
            <i className={`${notification_popup.icon} text-[1.5rem] ${notification_popup.status === "success" ? "text-green-500" : "text-red-500"}`}></i>
            <p>{notification_popup.message}</p>
            </div>
            <div className="w-full h-[5px] rounded-md bg-gray-300">
                <div className={`w-full h-[5px] rounded-md ${notification_popup.status === "success" ? "bg-green-500" : "bg-red-500"} shrink-animation`}></div>
            </div>
        </div>
      </div>
      )}
      <div className="Page bg-slate-50 w-full h-screen">
        <div className='h-full w-full flex justify-center items-center '>
      <form className='bg-white h-[60%] w-[30%] py-4 flex flex-col rounded-xl shadow-gray-300 shadow-md  gap-3 pl-10' onSubmit={handleSubmit}>
          <div className="w-full flex items-center justify-center">
          <h1 className='h1 text-2xl font-semibold'>Login form </h1>
          </div>
          <div className="flex flex-col gap-3">
          <div className='input-box '>
            <input type ='text' name='email' onChange={handleChange} placeholder ='Email' className='outline-none text-slate-700' required/>
            <FaUser className='icon' color='#4ade80' />
          </div>
          <div className='input-box'>
            <input type='number' name='phoneNumber' onChange={handleChange} placeholder='Tel Number'/>
            <BsFillTelephoneFill color='#4ade80' className='icon'/>
          </div>
          <div className='input-box'>
            <input type='password' name='password' onChange={handleChange} placeholder="Password" required/>
            <FaLock className='icon' color='#4ade80'/>
          </div>
          <div className="remember-forgot flex flex-col">
            <label className='flex gap-2'>
              <input type="checkbox"/>
              Remember me 
              </label>
              <p>I don't have an account : <Link href={"/signin"} className='underline mb-1'>Sign up</Link></p>
            <div className="w-full flex justify-center">
            <button className='submit px-8 mt-1 py-2 bg-green-400 rounded text-white' type='submit' >login</button>
            </div>
          </div>
          </div>
          </form>
      </div>
        <div className="pic">c</div>
      </div>
      </>
    )
  }
  
  export default Login;