import React from 'react'
import {Line} from 'react-chartjs-2'
const ChartComponent = (props) => {
  const {data} = props
  console.log(data)
    const [iData, setIdata] = React.useState({
        labels: data.map((data)=>data.month_name),
        datasets:[
            {label: "Total Invoices", data: data.map((data)=>data.total)},
            {label: "Invoices Approved", data: data.map((data)=>data.approved)},

        ],
    })
  return (
    <div>
      <Line data={iData} />
    </div>
  )
}

export default ChartComponent
