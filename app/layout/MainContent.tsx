import React from 'react'
import Dasboard from '../component/Dasboard'

const MainContent = ({contentIndex}:any) => {
    console.log(contentIndex)
  return (
    <div className="h-full bg-gray-200">
        {
            contentIndex.first == 0 && (
                <Dasboard/>
            )
            
        }
    </div>
  )
}

export default MainContent