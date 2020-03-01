import React from "react";
import ReactEcharts from 'echarts-for-react';
require('echarts/map/js/china.js');
class China extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
      }
      getInitialState = () => ({option: this.getOption()});
    //   timeTicket = null;
      

    //   componentDidMount() {
    //     if (this.timeTicket) {
    //       clearInterval(this.timeTicket);
    //     }
    //     this.timeTicket = setInterval(() => {
    //       const option = this.state.option;
    //       const r = new Date().getSeconds();
    //       option.title.text = 'iphone销量' + r;
    //       option.series[0].name = 'iphone销量' + r;
    //       option.legend.data[0] = 'iphone销量' + r;
    //       this.setState({ option: option });
    //     }, 1000);
    //   };
    //   componentWillUnmount() {
    //     if (this.timeTicket) {
    //       clearInterval(this.timeTicket);
    //     }
    //   };
      randomData() {
        return Math.round(Math.random()*1000);
      };
    // getOption = ()=>{
    //     let option = {
    //         xAxis: {
    //             type: 'category',
    //             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //         },
    //         yAxis: {
    //             type: 'value'
    //         },
    //         series: [{
    //             data: [120, 200, 150, 80, 70, 110, 130],
    //             type: 'bar'
    //         }]
    //     };
    //     return option;
    // }
    getOption = () => {
        return {
          title: {
            text: '网站使用人数全国分布',
            subtext: `截至到${new Date().getFullYear()}年-${new Date().getMonth()+1}月-${new Date().getDate()}日`,
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data:['网站使用总人数']
            // data:['网站使用总人数','网站活跃总人数','网站不活跃的总人数']
          },
          visualMap: {
            min: 1000000,
            max: 30000000,
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
              name: '网站使用总人数',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data:[
                {name: '北京',value: 14327400 },
                {name: '天津',value: 3456794 },
                {name: '上海',value:9802340  },
                {name: '重庆',value:45002394  },
                {name: '河北',value:9903823  },
                {name: '河南',value:7896343  },
                {name: '云南',value:3465882  },
                {name: '辽宁',value:3456378  },
                {name: '黑龙江',value:2000000  },
                {name: '湖南',value:12899876  },
                {name: '安徽',value:4578997  },
                {name: '山东',value:3456836  },
                {name: '新疆',value: 1000234 },
                {name: '江苏',value:10967800  },
                {name: '浙江',value:12274000  },
                {name: '江西',value:3445689  },
                {name: '湖北',value: 24578993 },
                {name: '广西',value:3456821  },
                {name: '甘肃',value:3002343  },
                {name: '山西',value: 3489504 },
                {name: '内蒙古',value:1236789  },
                {name: '陕西',value:8903213  },
                {name: '吉林',value: 3758694 },
                {name: '福建',value:3848000  },
                {name: '贵州',value: 3467854 },
                {name: '广东',value:23004590  },
                {name: '青海',value: 1002330 },
                {name: '西藏',value: 802980 },
                {name: '四川',value: 10023456 },
                {name: '宁夏',value:  3476899},
                {name: '海南',value:  1234678},
                {name: '台湾',value:3004321  },
                {name: '香港',value:1240000  },
                {name: '澳门',value: 23456781 }
              ]
            },
            // {
            //   name: '网站活跃总人数',
            //   type: 'map',
            //   mapType: 'china',
            //   label: {
            //     normal: {
            //       show: true
            //     },
            //     emphasis: {
            //       show: true
            //     }
            //   },
            //   data:[
            //     {name: '北京',value: this.randomData() },
            //     {name: '天津',value: this.randomData() },
            //     {name: '上海',value: this.randomData() },
            //     {name: '重庆',value: this.randomData() },
            //     {name: '河北',value: this.randomData() },
            //     {name: '安徽',value: this.randomData() },
            //     {name: '新疆',value: this.randomData() },
            //     {name: '浙江',value: this.randomData() },
            //     {name: '江西',value: this.randomData() },
            //     {name: '山西',value: this.randomData() },
            //     {name: '内蒙古',value: this.randomData() },
            //     {name: '吉林',value: this.randomData() },
            //     {name: '福建',value: this.randomData() },
            //     {name: '广东',value: this.randomData() },
            //     {name: '西藏',value: this.randomData() },
            //     {name: '四川',value: this.randomData() },
            //     {name: '宁夏',value: this.randomData() },
            //     {name: '香港',value: this.randomData() },
            //     {name: '澳门',value: this.randomData() }
            //   ]
            // },
            // {
            //   name: '网站不活跃的总人数',
            //   type: 'map',
            //   mapType: 'china',
            //   label: {
            //     normal: {
            //       show: true
            //     },
            //     emphasis: {
            //       show: true
            //     }
            //   },
            //   data:[
            //     {name: '北京',value: this.randomData() },
            //     {name: '天津',value: this.randomData() },
            //     {name: '上海',value: this.randomData() },
            //     {name: '广东',value: this.randomData() },
            //     {name: '台湾',value: this.randomData() },
            //     {name: '香港',value: this.randomData() },
            //     {name: '澳门',value: this.randomData() }
            //   ]
            // }
          ]
        };
      };

    render(){
        return (
            <div>
               

             <div className='parent'>
                <label> 网站使用人数全国分布:<strong>MAP charts</strong>: </label>
                <ReactEcharts 
                    // option={this.getOption()} 
                    option={this.state.option}
                    style={{height: 600,width:900,backgroundColor:"#E1E2E7"}} 
                 />
          
               
             </div>
         </div>
        )
    }
}
export default China;