import React from 'react'
import {Line} from 'react-chartjs-2'
const ChartComponent = () => {
    const invoiceData = [
        {id: 1, year: 2016, i_recieved: 210, i_approved: 0},
        {id: 2, year: 2017, i_recieved: 245, i_approved: 2310},
        {id: 3, year: 2018, i_recieved: 320, i_approved: 651},
        {id: 4, year: 2019, i_recieved: 2200, i_approved: 712},
        {id: 5, year: 2020, i_recieved: 411, i_approved: 298},
        {id: 6, year: 2021, i_recieved: 524, i_approved: 3200},
        {id: 7, year: 2022, i_recieved: 13, i_approved: 3456},
        {id: 8, year: 2023, i_recieved: 332, i_approved: 3665},
        {id: 9, year: 2024, i_recieved: 1452, i_approved: 3824},
        {id: 10, year: 2025, i_recieved: 935, i_approved: 4012}
    ];
    const [iData, setIdata] = React.useState({
        labels: invoiceData.map((data)=>data.year),
        datasets:[
            {label: "Invoices Recived", data: invoiceData.map((data)=>data.i_recieved)},
            {label: "Invoices Approved", data: invoiceData.map((data)=>data.i_approved)},

        ],
    })
  return (
    <div>
      <Line data={iData} />
    </div>
  )
}

export default ChartComponent
