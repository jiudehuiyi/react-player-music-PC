import React from "react";
import ReactEcharts from 'echarts-for-react';
// import { BarChart,Bar,XAxis,YAxis,Tooltip,Legend, LineChart,Line,CartesianGrid,PieChart,Pie,Cell  } from "recharts";
// class ComSingle extends React.Component{

//     render() {
//         return (
//             <div style={{ position:"relative",minWidth:"1200px"}}>
//                 <div style={{ color:"red" }}>入驻歌手名字首字母人数(a-z)条形图:</div>
//                 <BarChart width={700} height={250} data={data}>
                    
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                    <Bar dataKey="歌手人数" fill="#188EFB" />
//                 </BarChart>

//                 <div style={{ color:"red" }}>入驻歌手名字首字母人数(a-z)折线图:</div>
//                 <LineChart width={700} height={250} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="歌手人数" stroke="#188EFB" />
//                 </LineChart>

//                 <div style={{ color:"red" }}>入驻歌手名字首字母人数(a-z)饼形图:</div>
              
//             </div>
//         )
//     }
// }


// const data = [
//     {
//         name:"a",
//         歌手人数:"300",
//     },
//     {
//         name:"b",
//         歌手人数:"425",
//     },
//     {
//         name:"c",
//         歌手人数:"500",
//     },
//     {
//         name:"d",
//         歌手人数:"200",
//     },
//     {
//         name:"e",
//         歌手人数:"40",
//     },
//     {
//         name:"f",
//         歌手人数:"125",
//     },
//     {
//         name:"g",
//         歌手人数:"756",
//     },
//     {
//         name:"h",
//         歌手人数:"324",
//     },
//     {
//         name:"i",
//         歌手人数:"10",
//     },
//     {
//         name:"j",
//         歌手人数:"80",
//     },
//     {
//         name:"k",
//         歌手人数:"100",
//     },
//     {
//         name:"l",
//         歌手人数:"300",
//     },
//     {
//         name:"m",
//         歌手人数:"600",
//     },
//     {
//         name:"n",
//         歌手人数:"124",
//     },
//     {
//         name:"o",
//         歌手人数:"30",
//     },
//     {
//         name:"p",
//         歌手人数:"80",
//     },
//     {
//         name:"q",
//         歌手人数:"570",
//     },
//     {
//         name:"u",
//         歌手人数:"28",
//     },
//     {
//         name:"v",
//         歌手人数:"20",
//     },
//     {
//         name:"w",
//         歌手人数:"290",
//     },
//     {
//         name:"x",
//         歌手人数:"456",
//     },
//     {
//         name:"y",
//         歌手人数:"300",
//     },
//     {
//         name:"z",
//         歌手人数:"890",
//     },
// ]
class ComSingle extends React.Component{
    getOption = () => ({
        title: {
          text: "入驻歌手a-z人数条形图"//1
        },
        tooltip: {},
        legend: {
          data:"人数"
        },
        xAxis: {//3
            // data:this.props.chineseSingleData.aAxisData
         data: ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        },
        yAxis: {},
        series: [{
          name: "人数",
          type: "bar",
          //5
        //   data:this.props.chineseSingleData.yAxisData,
          data: [300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]
        }]
      })
   
      getOption2 = () => ({
        title: {
          text: "男歌手a-z人数折线图图"
        },
        tooltip: {},
        legend: {
          data:"人数"
        },
        xAxis: {//3
            // data:this.props.chineseSingleData.aAxisData
          data: ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        },
        yAxis: {},
        series: [{
          name:"人数",
          type: "line",
        //   data:this.props.chineseSingleData.yAxisData
          data: [300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]
        }]
      })
    render() {
        return (
            <div>
                 <ReactEcharts
                    option={this.getOption()}
                    style={{height: 300, width: 900}}
                    opts={{ renderer: '入驻歌手' }}
                    className='react_for_echarts' />

                    <ReactEcharts
                        option={this.getOption2()}
                        style={{height: 300, width: 900}}
                        opts={{ renderer: '入驻歌手' }}
                        className='react_for_echarts' />  
            </div>
        )
    }
}
export default ComSingle;