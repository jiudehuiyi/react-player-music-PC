import React from "react";
import ReactEcharts from "echarts-for-react"

class SinceDyn extends React.Component{

    getOption = () => ({
        title : {
          text: '最近动态',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['更新用户歌单','更新用户电台','新增关注的人','回复评论','发布评论']
        },
        series : [
          {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:5, name:'更新用户歌单'},
            {value:3, name:'更新用户电台'},
            {value:4, name:'新增关注的人'},
            {value:5, name:'回复评论'},
            {value:8, name:'发布评论'}
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
export default SinceDyn;