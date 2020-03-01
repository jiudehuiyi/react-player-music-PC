import React from "react";
import ReactEcharts from "echarts-for-react"

class HotComment extends React.Component{
    getOption = () => {
        return {
          title: {
            text: '热门评论雷达图'
          },
          tooltip: {},
          legend: {
            data: ['热门评论分析']
          },
          radar: {
            // shape: 'circle',
            indicator: [
               { name: '你要相信这不是最后一天, 我们以后还可以一起度过每一个春暖花开的日子！相约武汉一起赏樱花🌸记得哟！到时候啊, 我想看到你们脱下口罩灿烂的笑容！Because you have to believe, 不要再怀疑, 那一天肯定会来到！我爱你们❤️❤️❤️"', max: 6500},
               { name: '当我像灯火通明的都市里明明存在却没人看到不被需要的北极星 谢谢你告诉我是你前进方向的光亮“我们一起亲吻流星坠落', max: 16000},
               { name: '把所有的夜归还给星河, 把所有的春光归还给疏疏篱落, 把所有的慵慵沉迷与不前, 归还给过去的我。明日之我, 胸中有丘壑, 立马振山河', max: 30000},
               { name: '我觊觎着宇宙, 但仍放不下这平庸的人间烟火。后来才明白, 山河辽阔, 潮涨夕落, 你也正在世间某个角落。这些的的确确足以牵绊着我', max: 38000},
               { name: '以后每一年的秋天, 都比之前要冷一些。你的生活越来越忙, 来不及观察树叶从哪天开始凋落。你自顾不暇, 原本相互依偎的人啊, 得等到远走以后才会被你发现。', max: 52000},
               { name: '脱胎于爱尔兰民间传说的动画, 画面音乐意境都美到飙泪。当城市入侵自然, 当现代文明取代古老传说, 我们的灵魂麻木石化, 我们的心迷失已久。然而当歌声响起, 你就知道, 那些来自记忆深处的召唤, 你从不曾忘记', max: 25000}
            ]
          },
          series: [{
            name: '热门评论热度',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
              {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '热门评论热度'
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
export default HotComment;