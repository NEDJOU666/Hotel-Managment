const lineChartData = {
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: ["January", "Febuary", "March", "April", "May", "July","August"],
      },
      colors:["#4ade80"],
    },
    
    series: [
      {
        name: 'First year',
        data: [30, 40, 35, 50, 49, 60, 70]
      }
    ]
  };
export default lineChartData