import React from 'react';
import ReactEcharts from 'echarts-for-react';
class ChineseSingle extends React.Component {
    constructor(props){
        super(props);
    }

  
    getOption = () => ({
        title: {
          text: this.props.chineseSingleData.barTitleText//1
        },
        tooltip: {},
        legend: {
          data:[this.props.chineseSingleData.legendData]//2
        },
        xAxis: {//3
            data:this.props.chineseSingleData.aAxisData
        //   data: ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        },
        yAxis: {},
        series: [{
          name: this.props.chineseSingleData.legendData,//2
          type: this.props.chineseSingleData.type1,//4
          //5
          data:this.props.chineseSingleData.yAxisData,
        //   data: [300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]
        }]
      })
   
      getOption2 = () => ({
        title: {
          text: this.props.chineseSingleData.lineTitleText//6
        },
        tooltip: {},
        legend: {
          data:[this.props.chineseSingleData.legendData]//2
        },
        xAxis: {//3
            data:this.props.chineseSingleData.aAxisData
        //   data: ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        },
        yAxis: {},
        series: [{
          name: this.props.chineseSingleData.legendData,//2
          type: this.props.chineseSingleData.type2,//7
          data:this.props.chineseSingleData.yAxisData
        //   data: [300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]
        }]
      })

    render(){
        
        return (
            <div>
                <label></label>
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: 300, width: 900}}
                    opts={{ renderer: '华语歌手' }}
                    className='react_for_echarts' />

                    <ReactEcharts
                        option={this.getOption2()}
                        style={{height: 300, width: 900}}
                        opts={{ renderer: '华语歌手' }}
                        className='react_for_echarts' />   
            </div>
        )
    }
}
export default ChineseSingle;

