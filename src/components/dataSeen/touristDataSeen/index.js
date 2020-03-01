import React from "react"
import { Alert,Menu, Icon, Switch  } from 'antd';
import RegisterDataSeen from "../common/registerDataSeen"
import ComSingle from "../comSingle"
import China from "../china"
import Province from "../china/province"
import { Row,Col } from "antd";
import "antd/dist/antd.css"
import ChineseSingle from "../chineseSingle"
import LoveSinger from "../loveSinger";
import StoreInformation from "../storeInformation"
import SinceDyn from "../sinceDyn";
import ShareAll from "../ShareAll"
import PlayerRecord from "../playerRecord"
import HotTopic from "../hotTopic";
import HotComment from '../hotComment'
import RecentSingSort from "../recentSingSort";
import AirPort from "../airPort";
import Airport from "../airPort";
class TouristDataSeen extends React.Component{
    state = {
        theme: 'dark',
        current: '1',
      };
      changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
      };
    
      handleClick = e => {
        this.setState({
          current: e.key,
        });
      };

      handleSelect=({ item, key, keyPath, selectedKeys, domEvent })=>{
          console.log(item);
          console.log(key)
      }

    render(){
        const { SubMenu } = Menu;
        const provinceCitys = Object.keys(cityMapData);
        //渲染省份列表
        const renderProvinceMaps = provinceCitys.map( (item,index)=>{
            let sty = this.state.current==index+2?"block":"none" ;
            return (
                <Col span={18}  key={cityMapData[item]} style={{ display:sty }}>
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            this.state.current==index+2?<Province  data={cityMapData[item]} />:""
                            }
                        </div>
                    </Col>
            )
        } )
        //渲染相应的省份的地图
        const renderItem = provinceCitys.map( (item,index)=>{
            return (
                <Menu.Item key={index+2} >
                        <Icon type="user" />
                        { `${cityMapData[item].seriesMapType}分布图` }
                </Menu.Item>
            )
        } )

        return (
            <div className='touristDataSeen' style={{ overflow:"hidden" }}>
                <div>
                 <Alert message="数据可视化" style={{ textAlign:"center",fontWeight:"bold",fontSize:"30px" }} type="warning" />
                </div>
               
             <Row style={{ minWidth:"1200px" }}>
                <Col span={6}>
                    <div style={{ display:"inline-block" }}>
                     <Switch
                    style={{ marginTop:"20px" }}
                    checked={this.state.theme === 'dark'}
                    onChange={this.changeTheme}
                    checkedChildren="黑夜模式"
                    unCheckedChildren="白天模式"
                    />
                    <br />
                    <br />

                    <Menu
                        onSelect={ this.handleSelect }
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        style={{ width: 256,height:"100vh" }}
                        // defaultOpenKeys={['sub1']}
                        selectedKeys={[this.state.current]}
                        mode="inline"
                        >
                        <SubMenu
                            key="sub1"
                            title={
                            <span>
                                <Icon type="team" />
                                <span>分布图</span>
                            </span>
                            }
                        >
                            <Menu.Item key="1">
                                <Icon type="user" />
                                全国分布图
                            </Menu.Item>
                            
                           {
                               renderItem
                           }
                        </SubMenu>
                        <Menu.Item key="33">
                           <Icon type="thunderbolt" />
                             注册
                        </Menu.Item>

                        <SubMenu
                            key="sub2"
                            title={
                            <span>
                                <Icon type="audio" />
                                <span>歌手分类</span>
                            </span>
                            }
                        >
                            <Menu.Item key="34">
                                <Icon type="audio" />
                                入驻歌手
                            </Menu.Item>

                            <Menu.Item key="35">
                                <Icon type="audio" />
                                华语男歌手
                            </Menu.Item>
                            <Menu.Item key="36">
                                <Icon type="audio" />
                                华语组合/乐队
                            </Menu.Item>
                            <Menu.Item key="37">
                                <Icon type="audio" />
                                欧美男歌手
                            </Menu.Item>
                            <Menu.Item key="38">
                                <Icon type="audio" />
                                欧美女歌手
                            </Menu.Item>
                            <Menu.Item key="39">
                                <Icon type="audio" />
                                欧美组合/乐队
                            </Menu.Item>
                            <Menu.Item key="40">
                                <Icon type="audio" />
                                日本男歌手
                            </Menu.Item>
                            <Menu.Item key="41">
                                <Icon type="audio" />
                                日本女歌手
                            </Menu.Item>
                            <Menu.Item key="42">
                                <Icon type="audio" />
                                日本组合/乐队
                            </Menu.Item>
                            <Menu.Item key="43">
                                <Icon type="audio" />
                                韩国男歌手
                            </Menu.Item>
                            <Menu.Item key="44">
                                <Icon type="audio" />
                                韩国女歌手
                            </Menu.Item>
                            <Menu.Item key="45">
                                <Icon type="audio" />
                                韩国组合/乐队
                            </Menu.Item>
                            <Menu.Item key="46">
                                <Icon type="audio" />
                                其他男歌手
                            </Menu.Item>
                            <Menu.Item key="47">
                                <Icon type="audio" />
                                其他女歌手
                            </Menu.Item>
                            <Menu.Item key="48">
                                <Icon type="audio" />
                                其他组合/乐队
                            </Menu.Item>

                        </SubMenu>
                        <Menu.Item key="49">
                                <Icon type="audio" />
                                最爱歌手分析图
                        </Menu.Item>
                        <Menu.Item key="50">
                                <Icon type="appstore" />
                                收藏信息
                        </Menu.Item>
                        <Menu.Item key="51">
                                <Icon type="cloud-sync" />
                                最近动态
                        </Menu.Item>
                        <Menu.Item key="52">
                                <Icon type="share-alt" />
                                分享类别
                        </Menu.Item>
                        <Menu.Item key="53">
                                <Icon type="play-circle" />
                                播放记录
                        </Menu.Item>
                        <Menu.Item key="54">
                                <Icon type="vertical-align-top" />
                                热门话题
                        </Menu.Item>
                        <Menu.Item key="55">
                                <Icon type="vertical-align-top" />
                                热门评论
                        </Menu.Item>
                        <Menu.Item key="56">
                                <Icon type="bg-colors" />
                                最近收听类别
                        </Menu.Item>
                        <Menu.Item key="57">
                                <Icon type="bg-colors" />
                                数据迁徙
                        </Menu.Item>



                      
       
         </Menu>
                </div>

                    </Col>

                    <Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px",marginTop:"55px" }}>
                            {
                            this.state.current==="1"?<China />:""
                            }
                        </div>
                    </Col>
                    

                    {
                       renderProvinceMaps
                     }
                     {
                         this.state.current==="33"?<Col span={18} >
                         <div style={{ display:"inline-block",marginLeft:"20px" }}>
                             
                             <RegisterDataSeen   />
                             
                         </div>
                     </Col>:""
                     }
                    
                    {
                        this.state.current==="34"?<Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            <ComSingle   />
                            }
                        </div>
                    </Col>:""
                    }
                    
                    {
                         this.state.current==="35"? <Col span={18} >
                         <div style={{ display:"inline-block",marginLeft:"20px" }}>
                             {
                            <ChineseSingle  chineseSingleData={chineseSingleData}  />
                             }
                         </div>
                     </Col>:""
                    }
                    {
                        this.state.current==="36"?<Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            <ChineseSingle  chineseSingleData={chineseComData}  />
                            }
                        </div>
                    </Col>:""
                    }
                   
                   {
                       this.state.current==="37"?<Col span={18} >
                       <div style={{ display:"inline-block",marginLeft:"20px" }}>
                           {
                           <ChineseSingle  chineseSingleData={aESingleData}  />
                           }
                       </div>
                   </Col>:""
                   }
                    
                    {
                        this.state.current==="38"?<Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            <ChineseSingle  chineseSingleData={aESingleSexData}  />
                            }
                        </div>
                    </Col>:""
                    }
                    
                    {
                        this.state.current==="39"?<Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                           <ChineseSingle  chineseSingleData={aESingleComposeData}  />
                            }
                        </div>
                    </Col>:""
                    }
                    
                    {
                        this.state.current==="40"?<Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            <ChineseSingle  chineseSingleData={japSingleData}  />
                            }
                        </div>
                    </Col>:""
                    }
                    {
                        this.state.current==="41"? <Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            <ChineseSingle  chineseSingleData={japSingleSexData}  />
                            }
                        </div>
                    </Col>:""
                    }
                    {
                        this.state.current==="42"? <Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            <ChineseSingle  chineseSingleData={japSingleComData}  />
                            }
                        </div>
                    </Col>:""
                    }
                   
                   {
                       this.state.current==="43"?  <Col span={18} >
                       <div style={{ display:"inline-block",marginLeft:"20px" }}>
                           {
                           <ChineseSingle  chineseSingleData={koaSingleData}  />
                           }
                       </div>
                   </Col>:""
                   }

                  {
                      this.state.current==="44"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <ChineseSingle  chineseSingleData={koaSingleSexData}  />
                          }
                      </div>
                  </Col>:""
                  }
                  {
                      this.state.current==="45"? <Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <ChineseSingle  chineseSingleData={koaSingleComData}  />
                          }
                      </div>
                  </Col>:""
                  }
                    
                    {
                        this.state.current==="46"?  <Col span={18} >
                        <div style={{ display:"inline-block",marginLeft:"20px" }}>
                            {
                            <ChineseSingle  chineseSingleData={elseSingleData}  />
                            }
                        </div>
                    </Col>:""
                    }
                   

                  {
                      this.state.current==="47"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <ChineseSingle  chineseSingleData={elseSingleSexData}  />
                          }
                      </div>
                  </Col>:""
                  }
                  {this.state.current==="48"?
                       <Col span={18} >
                       <div style={{ display:"inline-block",marginLeft:"20px" }}>
                           {
                           <ChineseSingle  chineseSingleData={elseSingleComData}  />
                           }
                       </div>
                   </Col>:""
                  }
                    
                  {
                      this.state.current==="49"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <LoveSinger   />
                          }
                      </div>
                  </Col>:""
                  }
                    {
                      this.state.current==="50"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <StoreInformation   />
                          }
                      </div>
                  </Col>:""
                  }
                   {
                      this.state.current==="51"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <SinceDyn   />
                          }
                      </div>
                  </Col>:""
                  }
                   {
                      this.state.current==="52"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <ShareAll   />
                          }
                      </div>
                  </Col>:""
                  }
                   {
                      this.state.current==="53"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <PlayerRecord   />
                          }
                      </div>
                  </Col>:""
                  }
                      {
                      this.state.current==="54"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <HotTopic   />
                          }
                      </div>
                  </Col>:""
                  } 
                      {
                      this.state.current==="55"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <HotComment   />
                          }
                      </div>
                  </Col>:""
                  } 
                   {
                      this.state.current==="56"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <RecentSingSort   />
                          }
                      </div>
                  </Col>:""
                  } 
                   {
                      this.state.current==="57"?<Col span={18} >
                      <div style={{ display:"inline-block",marginLeft:"20px" }}>
                          {
                          <Airport   />
                          }
                      </div>
                  </Col>:""
                  } 

                </Row>
                
               
            </div>
        )
    }
}

const cityMapData = {
    "beijing":{
        titleText:"网站使用人数北京分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,9000000],
        seriesMapType:"北京",
        mapData:[
            {name: '密云区',value: 14327400 },
            {name: '延庆区',value: 3456794 },
            {name: '朝阳区',value:9802340  },
            {name: '丰台区',value:45002394  },
            {name: '石景山区',value:9903823  },
            {name: '海淀区',value:7896343  },
            {name: '门头沟区',value:3465882  },
            {name: '房山区',value:3456378  },
            {name: '通州区',value:2000000  },
            {name: '顺义区',value:12899876  },
            {name: '昌平区',value:4578997  },
            {name: '大兴区',value:3456836  },
            {name: '怀柔区',value: 1000234 },
            {name: '平谷区',value:10967800  },
            {name: '东城区',value:12274000  },
            {name: '西城区',value:3445689  },
           
          ]
     },
    
     "shanghai":{
        titleText:"网站使用人数上海分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"上海",
        mapData:[
            {name: '黄浦区',value: 14327400 },
            {name: '静安区',value: 3456794 },
            {name: '徐汇区',value:9802340  },
            {name: '长宁区',value:45002394  },
            {name: '杨浦区',value:9903823  },
            {name: '虹口区',value:7896343  },
            {name: '普陀区',value:3465882  },
            {name: '浦东新区',value:3456378  },
            {name: '宝山区',value:2000000  },
            {name: '嘉定区',value:12899876  },
            {name: '闵行区',value:4578997  },
            {name: '松江区',value:3456836  },
            {name: '青浦区',value: 1000234 },
            {name: '奉贤区',value:10967800  },
            {name: '金山区',value:12274000  },
            {name: '崇明区',value:3445689  },
           
          ]
     },

     "guangdong":{
        titleText:"网站使用人数广东分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"广东",
        mapData:[
            {name: '广州市',value: 9327400 },
            {name: '深圳市',value: 3456794 },
            {name: '佛山市',value:9802340  },
            {name: '东莞市',value:45002394  },
            {name: '肇庆市',value:9903823  },
            {name: '惠州市',value:7896343  },
            {name: '中山市',value:3465882  },
            {name: '江门市',value:3456378  },
            {name: '珠海市',value:2000000  },
            {name: '汕头市',value:12899876  },
            {name: '潮州市',value:4578997  },
            {name: '揭阳市',value:3456836  },
            {name: '汕尾市',value: 1000234 },
            {name: '梅州市',value:10967800  },
            {name: '河源市',value:12274000  },
            {name: '湛江市',value:3445689  },
            {name: '茂名市',value:3456836  },
            {name: '阳江市',value: 1000234 },
            {name: '云浮市',value:10967800  },
            {name: '韶关市',value:12274000  },
            {name:'清远市',value:3445689  },
           
          ]
     },
     "zhejiang":{
        titleText:"网站使用人数浙江分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"浙江",
        mapData:[
            {name: '杭州市',value: 9327400 },
            {name: '宁波市',value: 3456794 },
            {name: '温州市',value:9802340  },
            {name: '绍兴市',value:45002394  },
            {name: '台州市',value:9903823  },
            {name: '金华市',value:7896343  },
            {name: '衢州市',value:3465882  },
            {name: '湖州市',value:3456378  },
            {name: '嘉兴市',value:2000000  },
            {name: '舟山市',value: 9327400 },
            {name: '丽水市',value: 3456794 },

          ]
     },

     "anhui":{
        titleText:"网站使用人数安徽分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"安徽",
        mapData:[
            {name: '合肥市',value: 9327400 },
            {name: '淮南市',value: 3456794 },
            {name: '芜湖市',value:9802340  },
            {name: '蚌埠市',value:45002394  },
            {name: '安庆市',value:9903823  },
            {name: '阜阳市',value:7896343  },
            {name: '六安市',value:3465882  },
            {name: '黄山市',value:3456378  },
            {name: '马鞍山市',value:2000000  },
            {name: '淮北市',value:12899876  },
            {name: '铜陵市',value:4578997  },
            {name: '滁州市',value:3456836  },
            {name: '宣城市',value: 1000234 },
            {name: '宿州市',value:10967800  },
            {name: '亳州市',value:12274000  },
            {name: '池州市',value:3445689  },
           
          ]
     },

     "aomen":{
        titleText:"网站使用人数澳门分布",
        legendData:"网站使用总人数",
        minAndMax:[10000,2000000],
        seriesMapType:"澳门",
        mapData:[
            {name: '花地玛堂区',value: 932700 },
            {name: '圣安多尼堂区',value: 356794 },
            {name: '大堂区',value:980234  },
            {name: '望德堂区',value:4502394  },
            {name: '风顺堂区',value:993823  },
            {name: '嘉模堂区',value:796343  },
            {name: '圣方济各堂区',value:465882  },
            {name: '路氹填海区',value:356378  },
            {name: '花王堂区',value:346378  },
            {name:"路凼填海区",value:1345}
          ]
     },

     "fujian":{
        titleText:"网站使用人数福建分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"福建",
        mapData:[
            {name: '福州市',value: 9327400 },
            {name: '厦门市',value: 3456794 },
            {name: '泉州市',value:9802340  },
            {name: '莆田市',value:45002394  },
            {name: '三明市',value:9903823  },
            {name: '漳州市',value:7896343  },
            {name: '南平市',value:3465882  },
            {name: '龙岩市',value:3456378  },
            {name: '宁德市',value:2000000  },
          
          ]
     },

     "gansu":{
        titleText:"网站使用人数甘肃分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"甘肃",
        mapData:[
            {name: '兰州市',value: 9327400 },
            {name: '嘉峪关市',value: 3456794 },
            {name: '酒泉市',value:9802340  },
            {name: '张掖市',value:45002394  },
            {name: '金昌市',value:9903823  },
            {name: '武威市',value:7896343  },
            {name: '白银市',value:3465882  },
            {name: '定西市',value:3456378  },
            {name: '天水市',value:2000000  },
            {name: '平凉市',value: 9327400 },
            {name: '庆阳市',value: 3456794 },
            {name: '陇南市',value:9802340  },
            {name: '临夏回族自治州',value:45002394  },
            {name: '甘南藏族自治州',value:9903823  },

          
          ]
     },

     "guangxi":{
        titleText:"网站使用人数广西分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"广西",
        mapData:[
            {name: '南宁市',value: 9327400 },
            {name: '柳州市',value: 3456794 },
            {name: '桂林市',value:9802340  },
            {name: '梧州市',value:45002394  },
            {name: '北海市',value:9903823  },
            {name: '防城港市',value:7896343  },
            {name: '钦州市',value:3465882  },
            {name: '贵港市',value:3456378  },
            {name: '玉林市',value:2000000  },
            {name: '百色市',value: 9327400 },
            {name: '贺州市',value: 3456794 },
            {name: '河池市',value:9802340  },
            {name: '来宾市',value:45002394  },
            {name: '崇左市',value:9903823  },        
          ]
     },

     "guizhou":{
        titleText:"网站使用人数贵州分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"贵州",
        mapData:[
            {name: '贵阳市',value: 9327400 },
            {name: '遵义市',value: 3456794 },
            {name: '铜仁市',value:9802340  },
            {name: '安顺市',value:45002394  },
            {name: '毕节市',value:9903823  },
            {name: '六盘水市',value:7896343  },
            {name: '黔南布依族苗族自治州',value:3465882  },
            {name: '黔西南布依族苗族自治州',value:3456378  },
            {name: '黔东南苗族侗族自治州',value:2000000  },
         
          ]
     },

     "hainan":{
        titleText:"网站使用人数海南分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"海南",
        mapData:[
            {name: '海口市',value: 9327400 },
            {name: '三亚市',value: 3456794 },
            {name: '三沙市',value:9802340  },
            {name: '儋州市',value:45002394  },
            
          ]
     },

     "hebei":{
        titleText:"网站使用人数河北分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"河北",
        mapData:[
            {name: '石家庄市',value: 9327400 },
            {name: '唐山市',value: 3456794 },
            {name: '邯郸市',value:9802340  },
            {name: '张家口市',value:45002394  },
            {name: '保定市',value:9903823  },
            {name: '秦皇岛市',value:7896343  },
            {name: '承德市',value:3465882  },
            {name: '邢台市',value:3456378  },
            {name: '沧州市',value:2000000  },
            {name: '衡水市',value: 9327400 },
            {name: '廊坊市',value: 3456794 },
           

          
          ]
     },

     "heilongjiang":{
        titleText:"网站使用人数黑龙江分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"黑龙江",
        mapData:[
            {name: '哈尔滨市',value: 9327400 },
            {name: '齐齐哈尔市',value: 3456794 },
            {name: '鹤岗市',value:9802340  },
            {name: '鸡西市',value:45002394  },
            {name: '大庆市',value:9903823  },
            {name: '伊春市',value:7896343  },
            {name: '双鸭山市',value:3465882  },
            {name: '佳木斯市',value:3456378  },
            {name: '牡丹江市',value:2000000  },
            {name: '七台河市',value: 9327400 },
            {name: '绥化市',value: 3456794 },
            {name: '黑河市',value: 9327400 },
            {name: '大兴安岭地区',value: 3456794 },          
          ]
     },

     "henan":{
        titleText:"网站使用人数河南分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"河南",
        mapData:[
            {name: '郑州市',value: 9327400 },
            {name: '开封市',value: 3456794 },
            {name: '洛阳市',value:9802340  },
            {name: '平顶山市',value:45002394  },
            {name: '安阳市',value:9903823  },
            {name: '鹤壁市',value:7896343  },
            {name: '新乡市',value:3465882  },
            {name: '焦作市',value:3456378  },
            {name: '濮阳市',value:2000000  },
            {name: '许昌市',value: 9327400 },
            {name: '漯河市',value: 3456794 },
            {name: '三门峡市',value: 9327400 },
            {name: '商丘市',value: 3456794 },     
            {name: '焦作市',value:3456378  },
            {name: '济源市',value:2000000  },
            {name: '信阳市',value: 9327400 },
            {name: '南阳市',value: 3456794 },
            {name: '驻马店市',value: 9327400 },
            {name: '周口市',value: 3456794 },      
          ]
     },

     "hunan":{
        titleText:"网站使用人数湖南分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"湖南",
        mapData:[
            {name: '长沙市',value: 9327400 },
            {name: '衡阳市',value: 3456794 },
            {name: '株洲市',value:9802340  },
            {name: '邵阳市',value:45002394  },
            {name: '岳阳市',value:9903823  },
            {name: '郴州市',value:7896343  },
            {name: '永州市',value:3465882  },
            {name: '常德市',value:3456378  },
            {name: '益阳市',value:2000000  },
            {name: '张家界市',value: 9327400 },
            {name: '湘潭市',value: 3456794 },
            {name: '怀化市',value: 9327400 },
            {name: '娄底市',value: 3456794 },        
          ]
     },
     "hubei":{
        titleText:"网站使用人数湖北分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"湖北",
        mapData:[
            {name: '武汉市',value: 9327400 },
            {name: '宜昌市',value: 3456794 },
            {name: '黄石市',value:9802340  },
            {name: '十堰市',value:45002394  },
            {name: '襄阳市',value:9903823  },
            {name: '鄂州市',value:7896343  },
            {name: '荆州市',value:3465882  },
            {name: '荆门市',value:3456378  },
            {name: '黄冈市',value:2000000  },
            {name: '咸宁市',value: 9327400 },
            {name: '孝感市',value: 3456794 },
            {name: '随州市',value: 9327400 },
            {name: '恩施土家族苗族自治州',value: 3456794 },  
            {name: '天门市',value: 9327400 },
            {name: '潜江市',value: 3456794 },
            {name: '仙桃市',value: 9327400 },
            {name: '神农架林区',value: 3456794 },      
          ]
     },
     "jiangxi":{
        titleText:"网站使用人数江西分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"江西",
        mapData:[
            {name: '南昌市',value: 9327400 },
            {name: '赣州市',value: 3456794 },
            {name: '上饶市',value:9802340  },
            {name: '九江市',value:45002394  },
            {name: '吉安市',value:9903823  },
            {name: '抚州市',value:7896343  },
            {name: '萍乡市',value:3465882  },
            {name: '景德镇市',value:3456378  },
            {name: '鹰潭市',value:2000000  },
            {name: '宜春市',value: 9327400 },
            {name: '新余市',value: 3456794 },   
          ]
     },
     "jilin":{
        titleText:"网站使用人数吉林分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"吉林",
        mapData:[
            {name: '长春市',value: 9327400 },
            {name: '吉林市',value: 3456794 },
            {name: '通化市',value:9802340  },
            {name: '四平市',value:45002394  },
            {name: '白山市',value:9903823  },
            {name: '辽源市',value:7896343  },
            {name: '白城市',value:3465882  },
            {name: '松原市',value:3456378  },
            {name: '延边朝鲜族自治州',value:2000000  },   
          ]
     },
     "liaoning":{
        titleText:"网站使用人数辽宁分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"辽宁",
        mapData:[
            {name: '沈阳市',value: 9327400 },
            {name: '大连市',value: 3456794 },
            {name: '营口市',value:9802340  },
            {name: '抚顺市',value:45002394  },
            {name: '鞍山市',value:9903823  },
            {name: '本溪市',value:7896343  },
            {name: '锦州市',value:3465882  },
            {name: '丹东市',value:3456378  },
            {name: '阜新市',value:2000000  },
            {name: '辽阳市',value: 9327400 },
            {name: '葫芦岛市',value: 3456794 },
            {name: '盘锦市',value: 9327400 },
            {name: '朝阳市',value: 3456794 },     
            {name: '铁岭市',value:3456378  },    
          ]
     },
     "neimenggu":{
        titleText:"网站使用人数内蒙古分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"内蒙古",
        mapData:[
            {name: '呼和浩特市',value: 9327400 },
            {name: '包头市',value: 3456794 },
            {name: '乌海市',value:9802340  },
            {name: '赤峰市',value:45002394  },
            {name: '通辽市',value:9903823  },
            {name: '鄂尔多斯市',value:7896343  },
            {name: '呼伦贝尔市',value:3465882  },
            {name: '巴彦淖尔市',value:3456378  },
            {name: '乌兰察布市',value:2000000  },
            {name: '锡林郭勒盟',value: 9327400 },
            {name: '兴安盟',value: 3456794 },
            {name: '阿拉善盟',value: 9327400 },
          ]
     },

     "ningxia":{
        titleText:"网站使用人数宁夏分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"宁夏",
        mapData:[
            {name: '银川市',value: 9327400 },
            {name: '石嘴山市',value: 3456794 },
            {name: '吴忠市',value:9802340  },
            {name: '固原市',value:45002394  },
            {name: '中卫市',value:9903823  },
        
          ]
     },

     "qinghai":{
        titleText:"网站使用人数青海分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"青海",
        mapData:[
            {name: '西宁市',value: 9327400 },
            {name: '海东市',value: 3456794 },
            {name: '海北藏族自治州',value:9802340  },
            {name: '黄南藏族自治州',value:45002394  },
            {name: '海南藏族自治州',value:9903823  },
            {name: '果洛藏族自治州',value:7896343  },
            {name: '玉树藏族自治州',value:3465882  },
            {name: '海西蒙古族藏族自治州',value:3456378  },
  
          ]
     },

     "shandong":{
        titleText:"网站使用人数山东分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"山东",
        mapData:[
            {name: '济南市',value: 9327400 },
            {name: '青岛市',value: 3456794 },
            {name: '淄博市',value:9802340  },
            {name: '枣庄市',value:45002394  },
            {name: '潍坊市',value:9903823  },
            {name: '烟台市',value:7896343  },
            {name: '临沂市',value:3465882  },
            {name: '东营市',value:3456378  },
            {name: '济宁市',value:2000000  },
            {name: '德州市',value: 9327400 },
            {name: '菏泽市',value: 3456794 },
            {name: '聊城市',value: 9327400 },
            {name: '滨州市',value: 3456794 },     
            {name: '泰安市',value:3456378  },
            {name: '威海市',value:2000000  },
            {name: '日照市',value: 9327400 },
          ]
     },

     "shanxi":{
        titleText:"网站使用人数山西分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"山西",
        mapData:[
            {name: '太原市',value: 9327400 },
            {name: '长治市',value: 3456794 },
            {name: '大同市',value:9802340  },
            {name: '阳泉市',value:45002394  },
            {name: '晋中市',value:9903823  },
            {name: '朔州市',value:7896343  },
            {name: '临汾市',value:3465882  },
            {name: '忻州市',value:3456378  },
            {name: '吕梁市',value:2000000  },
            {name: '运城市',value: 9327400 },
            {name: '晋城市',value: 3456794 },

          ]
     },

     "sichuan":{
        titleText:"网站使用人数四川分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"四川",
        mapData:[
            {name: '成都市',value: 9327400 },
            {name: '自贡市',value: 3456794 },
            {name: '攀枝花市',value:9802340  },
            {name: '泸州市',value:45002394  },
            {name: '德阳市',value:9903823  },
            {name: '绵阳市',value:7896343  },
            {name: '广元市',value:3465882  },
            {name: '遂宁市',value:3456378  },
            {name: '内江市',value:2000000  },
            {name: '乐山市',value: 9327400 },
            {name: '南充市',value: 3456794 },
            {name: '眉山市',value: 9327400 },
            {name: '宜宾市',value: 3456794 },     
            {name: '广安市',value:3456378  },
            {name: '达州市',value:2000000  },
            {name: '雅安市',value: 9327400 },
            {name: '巴中市',value: 3456794 },
            {name: '资阳市',value: 9327400 },
            {name: '阿坝藏族羌族自治州',value: 3456794 },      
            {name: '甘孜藏族自治州',value: 9327400 },
            {name: '凉山彝族自治州',value: 3456794 }, 
          ]
     },

     "taiwan":{
        titleText:"网站使用人数台湾分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"台湾",
        mapData:[
            {name: '台北市',value: 9327400 },
            {name: '新北市',value: 3456794 },
            {name: '桃园市',value:9802340  },
            {name: '台南市',value:45002394  },
            {name: '高雄市',value:9903823  },
            {name: '台中市',value:9903823  },

          ]
     },
     "tianjin":{
        titleText:"网站使用人数天津分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"天津",
        mapData:[
            {name: '和平区',value: 9327400 },
            {name: '河东区',value: 3456794 },
            {name: '河西区',value:9802340  },
            {name: '南开区',value:45002394  },
            {name: '河北区',value:9903823  },
            {name: '红桥区',value:7896343  },
            {name: '滨海新区',value:3465882  },
            {name: '东丽区',value:3456378  },
            {name: '西青区',value:2000000  },
            {name: '津南区',value: 9327400 },
            {name: '北辰区',value: 3456794 },
            {name: '红桥区',value:7896343  },
            {name: '武清区',value:3465882  },
            {name: '宝坻区',value:3456378  },
            {name: '宁河区',value:2000000  },
            {name: '静海区',value: 9327400 },
            {name: '蓟州区',value: 3456794 },

          ]
     },
     "xianggang":{
        titleText:"网站使用人数香港分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"香港",
        mapData:[
            {name: '太原市',value: 9327400 },
            {name: '长治市',value: 3456794 },
            {name: '大同市',value:9802340  },
            {name: '阳泉市',value:45002394  },
            {name: '晋中市',value:9903823  },
            {name: '朔州市',value:7896343  },
            {name: '临汾市',value:3465882  },
            {name: '忻州市',value:3456378  },
            {name: '吕梁市',value:2000000  },
            {name: '运城市',value: 9327400 },
            {name: '晋城市',value: 3456794 },

          ]
     },
     "xinjiang":{
        titleText:"网站使用人数新疆分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"新疆",
        mapData:[
            {name: '乌鲁木齐市',value: 9327400 },
            {name: '克拉玛依市',value: 3456794 },
            {name: '吐鲁番市',value:9802340  },
            {name: '哈密市',value:45002394  },
            {name: '昌吉回族自治州',value:9903823  },
            {name: '博尔塔拉蒙古自治州',value:7896343  },
            {name: '巴音郭楞蒙古自治州',value:3465882  },
            {name: '阿克苏地区',value:3456378  },
            {name: '克孜勒苏柯尔克孜自治州',value:2000000  },
            {name: '喀什地区',value: 9327400 },
            {name: '和田地区',value: 3456794 },
            {name: '伊犁哈萨克自治州',value:2000000  },
            {name: '塔城地区',value: 9327400 },
            {name: '阿勒泰地区',value: 3456794 },
          ]
     },
     "xizang":{
        titleText:"网站使用人数西藏分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"西藏",
        mapData:[
            {name: '拉萨市',value: 9327400 },
            {name: '日喀则市',value: 3456794 },
            {name: '山南市',value:9802340  },
            {name: '昌都市',value:45002394  },
            {name: '那曲市',value:9903823  },
            {name: '林芝市',value:7896343  },
            {name: '阿里地区',value:3465882  },

          ]
     },
     "yunnan":{
        titleText:"网站使用人数云南分布",
        legendData:"网站使用总人数",
        minAndMax:[100000,20000000],
        seriesMapType:"云南",
        mapData:[
            {name: '昆明市',value: 9327400 },
            {name: '曲靖市',value: 3456794 },
            {name: '玉溪市',value:9802340  },
            {name: '昭通市',value:45002394  },
            {name: '临沧市',value:9903823  },
            {name: '保山市',value:7896343  },
            {name: '丽江市',value:3465882  },
            {name: '普洱市',value:3456378  },
            {name: '红河哈尼族彝族自治州',value:2000000  },
            {name: '德宏傣族景颇族自治州',value: 9327400 },
            {name: '楚雄彝族自治州',value: 3456794 },
            {name: '大理白族自治州',value:9903823  },
            {name: '文山壮族苗族自治州',value:7896343  },
            {name: '西双版纳傣族自治州',value:3465882  },
            {name: '怒江傈僳族自治州',value:3456378  },
            {name: '迪庆藏族自治州',value:2000000  },
          ]
     },
   


}
const chineseSingleData = {
    barTitleText:"男歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"男歌手a-z人数折线图图",
    type2:"line"
}
const chineseComData = {
    barTitleText:"华语组合/乐队a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"华语组合/乐队a-z人数折线图图",
    type2:"line"
}
const aESingleData = {
    barTitleText:"欧美男歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"欧美男歌手a-z人数折线图图",
    type2:"line"
}
const aESingleSexData={
    barTitleText:"欧美女歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"欧美女歌手a-z人数折线图图",
    type2:"line"
}
const aESingleComposeData={
    barTitleText:"欧美组合/乐队a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"欧美组合/乐队a-z人数折线图图",
    type2:"line"
}
const japSingleData={
    barTitleText:"日本男歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"日本男歌手a-z人数折线图图",
    type2:"line"
}
const japSingleSexData={
    barTitleText:"日本女歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"日本女歌手a-z人数折线图图",
    type2:"line"
}
const japSingleComData={
    barTitleText:"日本组合/乐队a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"日本组合/乐队a-z人数折线图图",
    type2:"line"
}
const koaSingleData={
    barTitleText:"韩国男歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"韩国男歌手a-z人数折线图图",
    type2:"line"
}
const koaSingleSexData={
    barTitleText:"韩国女歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"韩国女歌手a-z人数折线图图",
    type2:"line"
}
const koaSingleComData={
    barTitleText:"韩国组合/乐队a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"韩国组合/乐队a-z人数折线图图",
    type2:"line"
}
const elseSingleData={
    barTitleText:"其它男歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"其它男歌手a-z人数折线图图",
    type2:"line"
}
const elseSingleSexData={
    barTitleText:"其它女歌手a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"其它女歌手a-z人数折线图图",
    type2:"line"
}
const elseSingleComData={
    barTitleText:"其它组合/乐队a-z人数条形图",
    legendData:"人数",
    aAxisData:['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    type1:"bar",
    yAxisData:shuffle([300, 425, 500, 200, 40, 125,123,344,45,656,34,45,662,124,345,678,876,124,356,467,467,10,123,466,879,998]),
    lineTitleText:"其它组合/乐队a-z人数折线图图",
    type2:"line"
}



//数组乱序
function shuffle(arr) {
    let length = arr.length,
        r      = length,
        rand   = 0;

    while (r) {
        rand = Math.floor(Math.random() * r--);
        [arr[r], arr[rand]] = [arr[rand], arr[r]];
    }
    return arr;
}


export default TouristDataSeen;