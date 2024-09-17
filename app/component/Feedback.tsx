"use client"
import { useEffect, useState } from "react"
import FeedbackData from "../Data/FeedBackData"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
interface FeedbackS {
  name:string,
  description:string,
  profilePic:{
    asset:{
        _ref:string,
        _type:string
    }
}
}
 
const Feedback = () => {
  const [FeedBack,setFeedBack] = useState<FeedbackS[]>([])
  useEffect(()=>{
    client.fetch(`*[_type=="feedback"]{
      name,
      description,
      profilePic,
    }`).then(data => setFeedBack(data)).catch(err => console.log(err))
  },[])

  
  return (
    <div className="col-span-12 w-bxs-battery-full  !h-[290px] md:w-[47%] rounded-xl overflow-y-auto border border-stroke bg-white shadow-gray-300 shadow-md  xl:col-span-6">
      <div className="flex items-start justify-between border-b border-stroke px-6 py-5 dark:border-strokedark">
        <div>
          <h2 className="text-title-md2 font-bold text-black ">Feedback</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-7">
          
            {
              FeedBack.map((item,index) => {
                return(
                  <div key={item.name}  className="relative z-1 flex gap-5.5">
                    <div className="h-16 w-full max-w-16 rounded-full border-[3px] border-stroke  flex justify-center items-center">
                      <img alt="User" className="w-[52px] h-[52px] rounded-full object-cover" src={urlFor(item.profilePic).url()}/>
                      </div><div><p className="text-black dark:text-white"><span className="font-medium">{item.name}
                      <br/></span>{item.description}</p>
                    </div>
                    <span className="absolute left-8 -z-1 block h-[300%] w-[1px] border-l border-dashed border-stroke ">
                    </span>
                  </div>
                )
              })
            } 
        </div>
      </div>
    </div>
  )
}

export default Feedback
