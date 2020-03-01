import React from "react";
import ReactEcharts from "echarts-for-react"

class HotTopic extends React.Component{
    getOption = () => {
        return {
          title: {
            text: '话题热度雷达图'
          },
          tooltip: {},
          legend: {
            data: ['热门话题分析']
          },
          radar: {
            shape: 'circle',
            indicator: [
               { name: '歌词表达含义', max: 6500},
               { name: '华语代表性', max: 16000},
               { name: '翻唱反差', max: 30000},
               { name: '疫情分布', max: 38000},
               { name: '最佳男歌手', max: 52000},
               { name: '最佳女歌手', max: 25000}
            ]
          },
          series: [{
            name: '话题热度',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
              {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '话题热度'
              }
            ]
          }]
        };
      };
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
export default HotTopic;