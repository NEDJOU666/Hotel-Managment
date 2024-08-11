import Chart from 'react-apexcharts'
import Card from './Card'
import CardData from '../Data/CardData'
import lineChartData  from '../Data/ChartData'
import Feedback from './Feedback'
const First_template = () => {
  return(
    <div>
        <h1 className="font-semibold text-[1.5rem] px-4 pt-3 ">DashBoard</h1>
        <h3 className="px-4 text-[.7rem] text-green-400">Welcome to your Dashboard</h3>
        <div className="flex pt-3 pl-5 gap-2">
          {
            CardData.map((item,index) => { 
                if (index < 4){
                  return(
                      <Card icon={item.icon} amount={item.amount} percent={item.percentage} name={item.name} diff={item.diffrence} />
                  )
                }
              
            })
          }
        
        </div>
    </div>
  )
}

const Second_template = () => {
  
  
  return(
     <Chart options={lineChartData.options}  series={lineChartData.series} type='area' height={250}  />
  )
}




const Dasboard = () => {
  return (
    <>
      <div className="flex flex-col space-y-2">
      <First_template/>
      <div className="flex w-full gap-2">
      <div className="w-[48%]  bg-white shadow-md rounded-xl pt-2 shadow-gray-300 px-5 ml-5">
      <Second_template/>
      </div>
      <Feedback/>
      </div>
      </div>
    </>
  )
}

export default Dasboard
