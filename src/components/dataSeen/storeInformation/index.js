import React from "react";
import ReactEcharts from "echarts-for-react"


class StoreInformation extends React.Component{

    getOption = () => ({
        title : {
          text: '用户收藏信息',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['歌单数量','mv收藏','dj收藏','歌手收藏','订阅歌手']
        },
        series : [
          {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:35, name:'歌单数量'},
            {value:30, name:'mv收藏'},
            {value:24, name:'dj收藏'},
            {value:15, name:'歌手收藏'},
            {value:18, name:'订阅歌手'}
          ],
          itemStyle: {
            emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
          }
        ]
      });
    render(){
        return (
            <div>
            <ReactEcharts
            option={this.getOption()}
            style={{height: 600, width: 900}}
            className='react_for_echarts' />
            </div>
        )
    }
}
export default StoreInformation;