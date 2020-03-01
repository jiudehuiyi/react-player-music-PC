import React from "react";
import ReactEcharts from "echarts-for-react"

class LoveSinger extends React.Component{

    getOption = () => {
        const colors = ['#FFAE57', '#FF7853', '#EA5151', '#CC3F57', '#9A2555'];
        const bgColor = '#2E2733';
    
        const itemStyle = {
          star5: {
            color: colors[0]
          },
          star4: {
            color: colors[1]
          },
          star3: {
            color: colors[2]
          },
          star2: {
            color: colors[3]
          }
        };
    
        const data = [{
          name: '男歌手',
          itemStyle: {
            normal: {
              color: colors[1]
            }
          },
          children: [{
            name: '陈奕迅',
            children: [{
              name: '5☆',
              children: [{
                name: '好久不见'
              }, {
                name: '十年'
              }, {
                name: '明年今日'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '无条件'
              }, {
                name: '打回原型'
              }, {
                name: '最冷的一天'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '于心有愧'
              }]
            }]
          }, {
            name: '其他',
            children: [{
              name: '5☆',
              children: [{
                name: '云雨成烟'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '时间美好与你环环相扣'
              }, {
                name: '江湖笑'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '相见恨晚'
              }]
            }]
          }]
        }, {
          name: '女歌手',
          itemStyle: {
            color: colors[2]
          },
          children: [{
            name: '刘若英',
            children: [{
              name: '5☆',
              children: [{
                name: '后来'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '当爱在靠近'
              }, {
                name: '很爱很爱你'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '一辈子的孤单'
              }]
            }]
          }, {
            name: '杨千嬅',
            children: [{
              name: '5☆',
              children: [{
                name: '处处吻'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '少女的祈祷'
              }, {
                name: '可惜我是水瓶座'
              }, {
                name: '野孩子',
              }]
            }, {
              name: '3☆',
              children: [{
                name: '勇'
              }]
            }]
          }, {
            name: '卫兰',
            children: [{
              name: '5☆',
              children: [{
                name: '大哥'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '验伤'
              }, {
                name: '就算世界无童话'
              }]
            }, {
              name: '3☆',
            }, {
              name: '2☆',
              children: [{
                name: '心有不甘'
              }]
            }]
          }, {
            name: '王菲',
            children: [{
              name: '4☆',
              children: [{
                name: '红豆'
              }, {
                name: '容易受伤的女人'
              }, {
                name: '约定'
              }]
            }]
          }, {
            name: '范玮琪',
            children: [{
              name: '5☆',
              children: [{
                name: '最初的梦想'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '最重要的决定'
              }, {
                name: '可不可以最勇敢'
              }]
            }, {
              name: '3☆',
              children: [{
                name: '短发'
              }]
            }]
          }, {
            name: '阿桑',
            children: [{
              name: '4☆',
              children: [{
                name: '一直很安静'
              }]
            }]
          }, {
            name: '邓丽欣',
            children: [{
              name: '5☆',
              children: [{
                name: '黑白照'
              }]
            }, {
              name: '4☆',
              children: [{
                name: '电灯胆'
              }]
            }]
          }]
        }];
    
        for (let j = 0; j < data.length; ++ j) {
          const level1 = data[j].children;
          for (let i = 0; i < level1.length; ++ i) {
            const block = level1[i].children;
            const bookScore = [];
            let bookScoreId;
            for (let star = 0; star < block.length; ++ star) {
              let style = (function (name) {
                switch (name) {
                  case '5☆':
                    bookScoreId = 0;
                    return itemStyle.star5;
                  case '4☆':
                    bookScoreId = 1;
                    return itemStyle.star4;
                  case '3☆':
                    bookScoreId = 2;
                    return itemStyle.star3;
                  case '2☆':
                    bookScoreId = 3;
                    return itemStyle.star2;
                }
              })(block[star].name);
    
              block[star].label = {
                color: style.color,
                downplay: {
                  opacity: 0.5
                }
              };
    
              if (block[star].children) {
                style = {
                  opacity: 1,
                  color: style.color
                };
                block[star].children.forEach(function (book) {
                  book.value = 1;
                  book.itemStyle = style;
    
                  book.label = {
                    color: style.color
                  };
    
                  let value = 1;
                  if (bookScoreId === 0 || bookScoreId === 3) {
                    value = 5;
                  }
    
                  if (bookScore[bookScoreId]) {
                    bookScore[bookScoreId].value += value;
                  }
                  else {
                    bookScore[bookScoreId] = {
                      color: colors[bookScoreId],
                      value: value
                    };
                  }
                });
              }
            }
    
            level1[i].itemStyle = {
              color: data[j].itemStyle.color
            };
          }
        }
    
        return {
          backgroundColor: bgColor,
          color: colors,
          series: [{
            type: 'sunburst',
            center: ['50%', '48%'],
            data: data,
            sort: function (a, b) {
              if (a.depth === 1) {
                return b.getValue() - a.getValue();
              }
              else {
                return a.dataIndex - b.dataIndex;
              }
            },
            label: {
              rotate: 'radial',
              color: bgColor
            },
            itemStyle: {
              borderColor: bgColor,
              borderWidth: 2
            },
            levels: [{}, {
              r0: 0,
              r: 40,
              label: {
                rotate: 0
              }
            }, {
              r0: 40,
              r: 105
            }, {
              r0: 115,
              r: 140,
              itemStyle: {
                shadowBlur: 2,
                shadowColor: colors[2],
                color: 'transparent'
              },
              label: {
                rotate: 'tangential',
                fontSize: 10,
                color: colors[0]
              }
            }, {
              r0: 140,
              r: 145,
              itemStyle: {
                shadowBlur: 80,
                shadowColor: colors[0]
              },
              label: {
                position: 'outside',
                textShadowBlur: 5,
                textShadowColor: '#333',
              },
              downplay: {
                label: {
                  opacity: 0.5
                }
              }
            }]
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
 export default LoveSinger;