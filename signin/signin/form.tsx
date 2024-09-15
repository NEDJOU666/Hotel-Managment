"use client"
import '../component/login.css'
import { FaUser, FaLock} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useRef } from 'react';
import {RxAvatar} from 'react-icons/rx'
import { FaCamera } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';

interface UserDetails{
  image: any;
  name:string;
  phoneNumber:number;
  email:string;
  password:string;
  confirmPassword:string;
}
interface notification_popupMsg{
  icon:string,
  message:string,
  openDisplay:boolean,
  status:"success" | "error"
}
const RegisterForm =  () => {
  const router = useRouter()
  const [isVerify,setVerify] = useState(true)
  const [image,setImage] = useState<File | null>(null)
  const [submitting,setsubmitting] = useState(false)
  const [key,setKey] = useState("")
  const inputRef =useRef<HTMLInputElement | null>(null)
  const handleImageClick = () => {
   if ( inputRef.current) {
     inputRef.current?.click();
   }
 };

  const [notification_popup,setnotification_popup] = useState<notification_popupMsg>({
    icon:"",
    message:"",
    openDisplay:false,
    status:"success"
  })
  const [newUser,setNewUser] = useState<UserDetails>({
    image:null,
    name:"",
    phoneNumber:0,
    email:"",
    password:"",
    confirmPassword:"",
  })
  const uploadImage = async (file: any) => {
    try {
    const formData = new FormData();
    formData.append('file', file);

    const uploadedImage = await client.assets.upload('image', file);
      // Return the image asset ID
      return uploadedImage._id;
    } catch (error) {
      console.error('Error uploading image:', error);
      return "bad request"; // Rethrow the error for handling elsewhere
    }
  };
  const handleSubmitKey = async (e: React.FormEvent) => {

    e.preventDefault()
    const response  = await fetch("/api/auth/keyVerifyer",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(key),
    })
    if(response.ok){
      setVerify(true)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name,value} = e.target
    setNewUser({...newUser, [name]:value})
  }
  const HandleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
       // Store the file in state
      setNewUser({...newUser, ["image"]:file})
      setImage(file)
    }
  };
  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()
    setsubmitting(true)
    if(newUser.password === newUser.confirmPassword){
      setnotification_popup({
        icon:"fa-solid fa-circle-check",
        message:"Confirm Password not correct",
        openDisplay:false,
        status:"success"
      })
      const imageAssetId = await uploadImage(newUser.image);
      if(imageAssetId == "bad request"){
        setsubmitting(false)
        return
      }
      const newUserUpdate = {
        image:imageAssetId,
        name:newUser.name,
        phoneNumber:newUser.phoneNumber,
        email:newUser.email,
        password:newUser.password
      }
      console.log("new user before post",newUser)
      const response  = await fetch("/api/auth/sign-in",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserUpdate),
      })
      if(response.ok){
       setNewUser({
          image:null,
          name:"",
          phoneNumber:0,
          email:"",
          password:"",
          confirmPassword:"",
        })
       const res =  await signIn("credentials",{
          email:newUser.email,
          phoneNumber:newUser.phoneNumber,
          password:newUser.password,
          redirect:false
        })
        if(res?.ok){
          router.push("/")
        }
        else{
          router.push("/login")
        }
      }
      else{
          const data = await response.json()
          setnotification_popup({
            icon:"fa-solid fa-circle-xmark",
            message:data.message,
            openDisplay:true,
            status:"error"
          })
          setsubmitting(false)
      }
    }
    else{
        setnotification_popup({
          icon:"fa-solid fa-circle-xmark",
          message:"Confirm Password not correct",
          openDisplay:true,
          status:"error"
        })
        setsubmitting(false)
    }
  }
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
   {isVerify ? (
    <div className=" bg-slate-50 w-full h-screen">
    <div className=' w-full h-full flex justify-center items-center'>
    
    <form onSubmit={handleSubmit} className='bg-white h-fit w-[30%] py-4 items-center flex flex-col rounded-xl gap-3 shadow-green-300 shadow-md '>
      <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMjEuNzU0NjkiIHkxPSI4LjY2ODI1IiB4Mj0iMTAuMDE0MDYiIHkyPSI0My4zNTI2MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzI3OGIxMSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJkZDE4MCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNS40MjE4OCIgeTE9IjI0LjgzMDc1IiB4Mj0iMjIuNzA2MjUiIHkyPSIyNS43NDk1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTJfVkxLYWZPa2szc0JYX2dyMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMyI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMC4wNzEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4yIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIwLjMyMSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjAuNjIzIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMDUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNC4wMTI1IiB5MT0iNy42MjQ1IiB4Mj0iMzYuOSIgeTI9IjQxLjk2MDQ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTNfVkxLYWZPa2szc0JYX2dyMyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjhmOWZhIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjZmODY0Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgdHJhbnNmb3JtPSJzY2FsZSg1LjMzMzMzLDUuMzMzMzMpIj48cGF0aCBkPSJNMTcuNjM0LDZoMTEuMzA1bC0xMS43MzYsMzQuNzczYy0wLjI0NywwLjczMyAtMC45MzQsMS4yMjYgLTEuNzA4LDEuMjI2aC04Ljc5OGMtMC45OTQsMCAtMS44LC0wLjgwNiAtMS44LC0xLjhjMCwtMC4xOTYgMC4wMzIsLTAuMzkgMC4wOTQsLTAuNTc2bDEwLjkzNSwtMzIuMzk2YzAuMjQ3LC0wLjczMyAwLjkzNCwtMS4yMjcgMS43MDgsLTEuMjI3eiIgZmlsbD0idXJsKCNjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEpIj48L3BhdGg+PHBhdGggZD0iTTM0LjA2MiwyOS4zMjRoLTE3LjkyN2MtMC40NTgsLTAuMDAxIC0wLjgzLDAuMzcxIC0wLjgzMSwwLjgyOWMwLDAuMjMxIDAuMDk1LDAuNDUxIDAuMjY0LDAuNjA4bDExLjUyLDEwLjc1MmMwLjMzNSwwLjMxMyAwLjc3NywwLjQ4NyAxLjIzNiwwLjQ4N2gxMC4xNTF6IiBmaWxsPSIjMDBmNjdkIj48L3BhdGg+PHBhdGggZD0iTTE3LjYzNCw2Yy0wLjc4MywtMC4wMDMgLTEuNDc2LDAuNTA0IC0xLjcxMiwxLjI1bC0xMC45MTcsMzIuMzQ1Yy0wLjMzNSwwLjkzNCAwLjE1MSwxLjk2NCAxLjA4NSwyLjI5OWMwLjE5NiwwLjA3IDAuNDAzLDAuMTA2IDAuNjEyLDAuMTA2aDkuMDI2YzAuNjg0LC0wLjEyMiAxLjI1LC0wLjYwMyAxLjQ4MSwtMS4yNTlsMi4xNzcsLTYuNDE2bDcuNzc2LDcuMjUzYzAuMzI2LDAuMjcgMC43MzUsMC40MTkgMS4xNTgsMC40MjJoMTAuMTE0bC00LjQzNiwtMTIuNjc2bC0xMi45MzEsMC4wMDNsNy45MTMsLTIzLjMyN3oiIGZpbGw9InVybCgjY29sb3ItMl9WTEthZk9razNzQlhfZ3IyKSI+PC9wYXRoPjxwYXRoIGQ9Ik0zMi4wNzQsNy4yMjVjLTAuMjQ3LC0wLjczMiAtMC45MzMsLTEuMjI1IC0xLjcwNiwtMS4yMjVoLTEyLjZjMC43NzIsMCAxLjQ1OSwwLjQ5MyAxLjcwNSwxLjIyNGwxMC45MzUsMzIuMzk5YzAuMzE4LDAuOTQyIC0wLjE4OCwxLjk2MyAtMS4xMywyLjI4MWMtMC4xODUsMC4wNjQgLTAuMzc5LDAuMDk2IC0wLjU3NSwwLjA5NmgxMi42YzAuOTk0LDAgMS44LC0wLjgwNiAxLjgsLTEuODAxYzAsLTAuMTk2IC0wLjAzMiwtMC4zOSAtMC4wOTUsLTAuNTc1eiIgZmlsbD0idXJsKCNjb2xvci0zX1ZMS2FmT2trM3NCWF9ncjMpIj48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"/>
      <h1 className='h1 text-2xl font-semibold'>Sign In </h1>
      <div className="w-full relative flex justify-center">
      <div className="image-con flex  h-fit w-fit  border-green-500 border-[4px] rounded-full relative items-center gap-8" >
          {
            newUser.image ? (
               <img src={URL.createObjectURL(newUser.image)} className="h-[5rem] w-[5rem] object-cover m-1 rounded-[50%]" alt="" /> 
            ) : (
               
              <RxAvatar className="h-[5rem] w-[5rem] text-gray-300" onClick={handleImageClick}/> 
            )
          }
          
          
          <button type="button" className="shadow-md bg-white right-0 p-2  bottom-1 absolute rounded-xl" onClick={handleImageClick}>
            <FaCamera className="h-[.9rem] w-[.9rem] text-[#4ade80]" />
      </button>
          <input
            type="file"
            ref={inputRef}
            style={{display:'none'}}
            onChange={HandleImageChange}
          />

        </div>
      </div>
      <div className='input-box'>
          <input type ='text' name='name' onChange={handleChange}  placeholder ='Admin Name'  required/>
          <FaUser className='icon' color='#4ade80' /> 
      </div>
      <div className='input-box'>
          <input type='number' name='phoneNumber' onChange={handleChange}  placeholder='Tel Number'/>
          <BsFillTelephoneFill color='#4ade80' className='icon'/>
        </div>
        <div className='input-box'>
          <input type='email' name='email' onChange={handleChange}  placeholder="Email" required/>
          <FaLock className='icon' color='#4ade80'/>
        </div>
        <div className='input-box'>
          <input type='password' name='password' onChange={handleChange}  placeholder="Password" required/>
          <FaLock className='icon' color='#4ade80'/>
        </div>
        <div className='input-box '>
          <input type='password' className='' name='confirmPassword' onChange={handleChange}  placeholder="Confirm Password" required/>
          <FaLock className='icon' color='#4ade80'/>
        </div>
        <div className="flex pl-10 w-full flex-col">
          <label className=' flex justify-start'>
            <input type="checkbox"/>
            Remember me 
          </label>
          <div className="w-full flex justify-center">
          <button className={`submit px-8 mt-1 py-2 ${submitting ? "cursor-not-allowed bg-slate-300" : "cursor-pointer bg-green-400"} rounded text-white`} disabled={submitting} type='submit' >{!submitting? "Sign In" : "Signing In ..."}</button>
          </div>
        </div>
    </form>
    </div>
    </div>
  ):(
    <div className=" bg-slate-50 w-full h-screen">
    <div className=' w-full h-full flex justify-center items-center'>
    
    <form onSubmit={handleSubmitKey} className='bg-white h-fit w-[30%] py-4 items-center flex flex-col rounded-xl gap-3 shadow-green-300 shadow-md '>
      <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCB4MT0iMjEuNzU0NjkiIHkxPSI4LjY2ODI1IiB4Mj0iMTAuMDE0MDYiIHkyPSI0My4zNTI2MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzI3OGIxMSI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJkZDE4MCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNS40MjE4OCIgeTE9IjI0LjgzMDc1IiB4Mj0iMjIuNzA2MjUiIHkyPSIyNS43NDk1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTJfVkxLYWZPa2szc0JYX2dyMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMyI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMC4wNzEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4yIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIwLjMyMSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjEiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjAuNjIzIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMDUiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyNC4wMTI1IiB5MT0iNy42MjQ1IiB4Mj0iMzYuOSIgeTI9IjQxLjk2MDQ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTNfVkxLYWZPa2szc0JYX2dyMyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjhmOWZhIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjZmODY0Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgdHJhbnNmb3JtPSJzY2FsZSg1LjMzMzMzLDUuMzMzMzMpIj48cGF0aCBkPSJNMTcuNjM0LDZoMTEuMzA1bC0xMS43MzYsMzQuNzczYy0wLjI0NywwLjczMyAtMC45MzQsMS4yMjYgLTEuNzA4LDEuMjI2aC04Ljc5OGMtMC45OTQsMCAtMS44LC0wLjgwNiAtMS44LC0xLjhjMCwtMC4xOTYgMC4wMzIsLTAuMzkgMC4wOTQsLTAuNTc2bDEwLjkzNSwtMzIuMzk2YzAuMjQ3LC0wLjczMyAwLjkzNCwtMS4yMjcgMS43MDgsLTEuMjI3eiIgZmlsbD0idXJsKCNjb2xvci0xX1ZMS2FmT2trM3NCWF9ncjEpIj48L3BhdGg+PHBhdGggZD0iTTM0LjA2MiwyOS4zMjRoLTE3LjkyN2MtMC40NTgsLTAuMDAxIC0wLjgzLDAuMzcxIC0wLjgzMSwwLjgyOWMwLDAuMjMxIDAuMDk1LDAuNDUxIDAuMjY0LDAuNjA4bDExLjUyLDEwLjc1MmMwLjMzNSwwLjMxMyAwLjc3NywwLjQ4NyAxLjIzNiwwLjQ4N2gxMC4xNTF6IiBmaWxsPSIjMDBmNjdkIj48L3BhdGg+PHBhdGggZD0iTTE3LjYzNCw2Yy0wLjc4MywtMC4wMDMgLTEuNDc2LDAuNTA0IC0xLjcxMiwxLjI1bC0xMC45MTcsMzIuMzQ1Yy0wLjMzNSwwLjkzNCAwLjE1MSwxLjk2NCAxLjA4NSwyLjI5OWMwLjE5NiwwLjA3IDAuNDAzLDAuMTA2IDAuNjEyLDAuMTA2aDkuMDI2YzAuNjg0LC0wLjEyMiAxLjI1LC0wLjYwMyAxLjQ4MSwtMS4yNTlsMi4xNzcsLTYuNDE2bDcuNzc2LDcuMjUzYzAuMzI2LDAuMjcgMC43MzUsMC40MTkgMS4xNTgsMC40MjJoMTAuMTE0bC00LjQzNiwtMTIuNjc2bC0xMi45MzEsMC4wMDNsNy45MTMsLTIzLjMyN3oiIGZpbGw9InVybCgjY29sb3ItMl9WTEthZk9razNzQlhfZ3IyKSI+PC9wYXRoPjxwYXRoIGQ9Ik0zMi4wNzQsNy4yMjVjLTAuMjQ3LC0wLjczMiAtMC45MzMsLTEuMjI1IC0xLjcwNiwtMS4yMjVoLTEyLjZjMC43NzIsMCAxLjQ1OSwwLjQ5MyAxLjcwNSwxLjIyNGwxMC45MzUsMzIuMzk5YzAuMzE4LDAuOTQyIC0wLjE4OCwxLjk2MyAtMS4xMywyLjI4MWMtMC4xODUsMC4wNjQgLTAuMzc5LDAuMDk2IC0wLjU3NSwwLjA5NmgxMi42YzAuOTk0LDAgMS44LC0wLjgwNiAxLjgsLTEuODAxYzAsLTAuMTk2IC0wLjAzMiwtMC4zOSAtMC4wOTUsLTAuNTc1eiIgZmlsbD0idXJsKCNjb2xvci0zX1ZMS2FmT2trM3NCWF9ncjMpIj48L3BhdGg+PC9nPjwvZz4KPC9zdmc+"/>
      <h1 className='h1 text-xl px-2 flex justify-center w-full text-center font-semibold'>Enter the account creation key given by the Admin </h1>
      <div className='input-box'>
          <input type ='text' name='key'  placeholder ='Verification Key' onChange={(e)=>setKey(e.target.value)} required/>
          <FaUser className='icon' color='#4ade80' /> 
      </div>
      <button className= {`submit px-8 mt-1 py-2  rounded text-white ${submitting ? 'cursor-not-allowed bg-slate-300':'bg-green-400 cursor-pointer'}`}  disabled={submitting} type='submit' >{submitting ? 'Verifying...':'Submit'}</button>
      </form>
      </div>
      </div>
  )

} 
    </>
  )
}

export default RegisterForm
