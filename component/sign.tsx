"use client"
import '../component/login.css'
import { useEffect, useState } from 'react';
import { FaUser, FaLock} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';
interface User{
  name:string;
  phoneNumber:number;
  email:string;
  password:string;
  confirmPassword:string;
}

const Login = () => {
  const router = useRouter()
  const [submiting,setSubmiting] = useState(false)
  const [user,setUser] = useState<User>({
    name:"",
    phoneNumber:0,
    email:"",
    password:"",
    confirmPassword:"",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmiting(true)
    const response = await fetch("/api/auth/sign-in",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    if(response.ok){
      router.push("/login")
      setSubmiting(false)
    }
    else{
      setSubmiting(false)
    }
    setSubmiting(false)
  };
    return (
      
      <div className="Page bg-slate-50 w-full h-screen">
        <div className='h-full w-full flex justify-center items-center '>
      <form className='bg-white h-fit w-[30%] py-4 flex flex-col rounded-xl shadow-gray-300 shadow-md  gap-3 pl-10' onSubmit={handleSubmit}>
          <div className="w-full flex items-center justify-center">
          <h1 className='h1 text-2xl font-semibold'>Sign In </h1>
          </div>
          <div className="flex flex-col gap-3">
          <div className='input-box '>
            <input type ='text' name='name' onChange={handleChange} placeholder ='Admin Name' className='outline-none text-slate-700' required/>
            <FaUser className='icon' color='#4ade80' />
          </div>
          <div className='input-box'>
            <input type='number' name='phoneNumber' onChange={handleChange} placeholder='Tel Number'/>
            <BsFillTelephoneFill color='#4ade80' className='icon'/>
          </div>
          <div className='input-box'>
            <input type='email' name='email' onChange={handleChange} placeholder="Email" required/>
            <FaLock className='icon' color='#4ade80'/>
          </div>
          <div className='input-box'>
            <input type='password' name='password' onChange={handleChange} placeholder="Password" required/>
            <FaLock className='icon' color='#4ade80'/>
          </div>
          <div className='input-box'>
            <input type='password' name='confirmPassword' onChange={handleChange} placeholder="Confirm Password" required/>
            <FaLock className='icon' color='#4ade80'/>
          </div>
          <div className="remember-forgot flex flex-col">
            <label><input type="checkbox"/>Remember me </label>
            <div className="w-full flex justify-center">
            <button  className={`submit px-8 mt-1 py-2 ${submiting ? "cursor-not-allowed bg-slate-300" : "cursor-pointer bg-green-400"} rounded text-white`} type='submit' >{!submiting? "Sign In" : "Signing In ..."}</button>
            </div>
          </div>
          </div>
          </form>
      </div>
        <div className="pic">c</div>
      </div>
    )
  }
  
  export default Login;