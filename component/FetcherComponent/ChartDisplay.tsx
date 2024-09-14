"use client"
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import lineChartData from '../../Data/ChartData';
const ChartDisplay = () => {
  
    return <Chart options={lineChartData.options} series={lineChartData.series} type="area" height={250} />;

}

export default ChartDisplay
