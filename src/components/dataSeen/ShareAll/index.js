import React from "react";
import ReactEcharts from "echarts-for-react"

class ShareAll extends React.Component{

    getOption = () => {
        return {
          title: {
            text: '一周分享'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:['分享歌曲和歌单','分享电台','分享mv']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'分享歌曲和歌单',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[12, 13, 11, 14, 9, 30, 21]
            },
            {
              name:'分享电台',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[20, 18, 11, 24, 20, 30, 30]
            },
            {
              name:'分享mv',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[15, 22, 20, 14, 10, 33, 40]
            }
          ]
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
export default ShareAll;