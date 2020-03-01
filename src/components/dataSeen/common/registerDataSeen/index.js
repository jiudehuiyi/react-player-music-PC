import React from "react";
import ReactEcharts from 'echarts-for-react';
// import { BarChart,Bar,XAxis,YAxis,Tooltip,Legend, LineChart,Line,CartesianGrid  } from "recharts";
// class RegisterDataSeen extends React.Component{


//     render(){
//         return (
//             <div style={{ position:"relative",minWidth:"1200px"}}>
//                 <div style={{ color:"red" }}>最近一周注册的人数(条形图):</div>
//                 <BarChart width={700} height={250} data={data}>
                    
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                    <Bar dataKey="人数" fill="#188EFB" />
//                 </BarChart>

//                 <div style={{ color:"red" }}>最近一周注册的人数(折线图):</div>
//                 <LineChart width={700} height={250} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="人数" stroke="#188EFB" />
//                 </LineChart>

                
//             </div>
//         )
//     }
// }
class RegisterDataSeen extends React.Component{
  getOption = () => ({
    title: {
      text: '最近一周注册的人数(条形图)'
    },
    tooltip: {},
    legend: {
      data:['注册']
    },
    xAxis: {
      data: [
        `${new Date(Date.now()).getFullYear()}年-${new Date(Date.now()).getMonth()+1}月-${new Date(Date.now()).getUTCDate()}日`,  
        `${new Date(Date.now()-millSecond).getFullYear()}年-${new Date(Date.now()-millSecond).getMonth()+1}月-${new Date(Date.now()-millSecond).getUTCDate()}日`,
        `${new Date(Date.now()-2*millSecond).getFullYear()}年-${new Date(Date.now()-2*millSecond).getMonth()+1}月-${new Date(Date.now()-2*millSecond).getUTCDate()}日`,
        `${new Date(Date.now()-3*millSecond).getFullYear()}年-${new Date(Date.now()-3*millSecond).getMonth()+1}月-${new Date(Date.now()-3*millSecond).getUTCDate()}日`,
        `${new Date(Date.now()-4*millSecond).getFullYear()}年-${new Date(Date.now()-4*millSecond).getMonth()+1}月-${new Date(Date.now()-4*millSecond).getUTCDate()}日`,
        `${new Date(Date.now()-5*millSecond).getFullYear()}年-${new Date(Date.now()-5*millSecond).getMonth()+1}月-${new Date(Date.now()-5*millSecond).getUTCDate()}日`,
        `${new Date(Date.now()-6*millSecond).getFullYear()}年-${new Date(Date.now()-6*millSecond).getMonth()+1}月-${new Date(Date.now()-6*millSecond).getUTCDate()}日`,

      ]
    },
    yAxis: {},
    series: [{
      name: '注册',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20,30]
    }]
  })
  render(){
    return (
      <div>
          <ReactEcharts
                    option={this.getOption()}
                    style={{height: 300, width: 900}}
                    className='react_for_echarts' />
      </div>
    )
  }
}

const millSecond = 86400000;
const data=[
    {
        name:`${new Date(Date.now()).getFullYear()}年-${new Date(Date.now()).getMonth()}月-${new Date(Date.now()).getUTCDate()}日`,
        "人数": 5000,
    },
    {
        name:`${new Date(Date.now()-millSecond).getFullYear()}年-${new Date(Date.now()-millSecond).getMonth()}月-${new Date(Date.now()-millSecond).getUTCDate()}日`,
        "人数": 6454,
    },
    {
        name:`${new Date(Date.now()-2*millSecond).getFullYear()}年-${new Date(Date.now()-2*millSecond).getMonth()}月-${new Date(Date.now()-2*millSecond).getUTCDate()}日`,
        "人数": 7820,
    },
    {
        name:`${new Date(Date.now()-3*millSecond).getFullYear()}年-${new Date(Date.now()-3*millSecond).getMonth()}月-${new Date(Date.now()-3*millSecond).getUTCDate()}日`,
        "人数": 3000,
    },
    {
        name:`${new Date(Date.now()-4*millSecond).getFullYear()}年-${new Date(Date.now()-4*millSecond).getMonth()}月-${new Date(Date.now()-4*millSecond).getUTCDate()}日`,
        "人数": 4500,
    },
    {
        name:`${new Date(Date.now()-5*millSecond).getFullYear()}年-${new Date(Date.now()-5*millSecond).getMonth()}月-${new Date(Date.now()-5*millSecond).getUTCDate()}日`,
        "人数": 6512,
    },
    {
        name:`${new Date(Date.now()-6*millSecond).getFullYear()}年-${new Date(Date.now()-6*millSecond).getMonth()}月-${new Date(Date.now()-6*millSecond).getUTCDate()}日`,
        "人数": 2467,
    },
]

const data1 = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]
export default RegisterDataSeen