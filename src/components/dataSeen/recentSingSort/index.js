import React from "react";
import ReactEcharts from "echarts-for-react"

class recentSingSort extends React.Component{
    getOption = () => ({
        title: {
          text: '最近听歌类型预期与实际对比',
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['华语','欧美','日本','韩国','其它']
        },
        series: [
          {
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
              normal: {
                formatter: '{b}预期'
              },
              emphasis: {
                position:'inside',
                formatter: '{b}预期: {c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            data: [
              {value: 60, name: '日本'},
              {value: 40, name: '韩国'},
              {value: 20, name: '其它'},
              {value: 80, name: '欧美'},
              {value: 100, name: '华语'}
            ]
          },
          {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}%',
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                position:'inside',
                formatter: '{b}实际: {c}%'
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 2
              }
            },
            data: [
              {value: 30, name: '日本'},
              {value: 10, name: '韩国'},
              {value: 5, name: '其它'},
              {value: 50, name: '欧美'},
              {value: 80, name: '华语'}
            ]
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
export default recentSingSort;