import React from 'react'
import Dasboard from '../component/Dasboard'
import Staff from '../component/staff/Staff'

const MainContent = ({contentIndex}:any) => {
    console.log(contentIndex)
  return (
    <div className="h-full bg-gray-200">
        {
            contentIndex.first == 0 && (
                <Dasboard/>
            )    
        }
        {
          contentIndex.first == 4 && 
            (
              <Staff index={contentIndex.second} />
            )
        }
    </div>
  )
}

export default MainContent