import React from 'react'
import Dasboard from '../component/Dasboard'
import Staff from '../component/staff/Staff'
import Apps_service from '../component/Apps-service/Apps-service'
import Calendar from '../component/Calendar/Calendar'
import Booking from '../component/Booking/Booking'
import Customer from '../component/Customers/Customer'
import Room from '../component/Room/Room'
import Account from '../component/Accounts/Account'

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
          contentIndex.first == 1 && 
            (
              <Booking index={contentIndex.second}/>
            )
        }
        {
          contentIndex.first == 2 && 
            (
              <Customer index={contentIndex.second}/>
            )
        }
        {
          contentIndex.first == 3 && 
            (
              <Room index={contentIndex.second}/>
            )
        }
        {
          contentIndex.first == 4 && 
            (
              <Staff index={contentIndex.second} />
            )
        }
        {
          contentIndex.first == 6 && 
            (
              <Apps_service index={contentIndex.second} />
            )
        }
        {
          contentIndex.first == 8 && 
            (
              <Account index={contentIndex.second}/>
            )
        }
        {
          contentIndex.first == 9 && 
            (
              <Calendar/>
            )
        }
    </div>
  )
}

export default MainContent