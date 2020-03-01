import React from "react";
import ReactEcharts from 'echarts-for-react';
require('echarts/map/js/province/beijing.js');
require('echarts/map/js/province/shanghai.js');
require('echarts/map/js/province/guangdong.js');
require('echarts/map/js/province/anhui.js');
require('echarts/map/js/province/aomen.js');
require('echarts/map/js/province/fujian.js');
require('echarts/map/js/province/gansu.js');
require('echarts/map/js/province/guangxi.js');
require('echarts/map/js/province/guizhou.js');
require('echarts/map/js/province/hainan.js');
require('echarts/map/js/province/hebei.js');
require('echarts/map/js/province/heilongjiang.js');
require('echarts/map/js/province/henan.js');
require('echarts/map/js/province/hunan.js');
require('echarts/map/js/province/hubei.js');
require('echarts/map/js/province/jiangsu.js');
require('echarts/map/js/province/jiangxi.js');
require('echarts/map/js/province/jilin.js');
require('echarts/map/js/province/liaoning.js');
require('echarts/map/js/province/neimenggu.js');
require('echarts/map/js/province/ningxia.js');
require('echarts/map/js/province/qinghai.js');
require('echarts/map/js/province/shandong.js');
require('echarts/map/js/province/shanghai.js');
require('echarts/map/js/province/shanxi.js');
require('echarts/map/js/province/sichuan.js');
require('echarts/map/js/province/taiwan.js');
require('echarts/map/js/province/tianjin.js');
require('echarts/map/js/province/xianggang.js');
require('echarts/map/js/province/xinjiang.js');
require('echarts/map/js/province/xizang.js');
require('echarts/map/js/province/yunnan.js');
require('echarts/map/js/province/zhejiang.js');

class Province extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.aa = React.createRef();
      }
    getInitialState = () => ({option: this.getOption()});
    
    getOption = () => {
        return {
          title: {
            text: this.props.data.titleText,//1
            subtext: `截至到${new Date().getFullYear()}年-${new Date().getMonth()+1}月-${new Date().getDate()}日`,
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data:[this.props.data.legendData]//2
          },
          visualMap: {

            min: this.props.data.minAndMax[0],//3
            max: this.props.data.minAndMax[1],
            left: 'left',
            top: 'bottom',
            text: ['高','低'],       // 文本，默认为数值文本
            calculable: true
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: this.props.data.legendData,//2
              type: 'map',
              mapType: this.props.data.seriesMapType,//4
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              //5
              data:this.props.data.mapData
            },
         
          ]
        };
      };

   
     

    

    render(){
       
        return (
            <div>
                {/* 4 */}
                <label> {`网站使用人数${this.props.data.seriesMapType}分布:`}<strong>MAP charts</strong>: </label>
                <ReactEcharts 
                    // option={this.getOption()} 
                    option={this.state.option}
                    style={{height: 600,width:900,backgroundColor:"#E1E2E7"}} 
                 />
            </div>
        )
    }
}

export default Province;