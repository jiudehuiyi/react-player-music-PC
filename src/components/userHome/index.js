import React, { Component } from 'react'
import {  Row,Col, Avatar,Icon,Button, Tooltip,Empty,Progress,Modal,Input, message  } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import Header from '../../common/header'
import Footer from '../../common/footer'
import { getUserDetailData,getUserPlayerList,getUserSubCount,getUserHomePlaylist,getSongUrlData,getSongData } from '../../api'
import './index.scss'
import UserHomePlayList from './playlist'
import { Emoji } from 'emoji-mart'
import axios from 'axios'
import Introduction from './introduction';
import docCookies from '../../api/docCookies'
 class UserHome extends Component {

  constructor(props){
    super(props);
    this.state={
      songsNumber:10,
    }
  }

  handleClick=(url)=>{
    window.location=url
  }


  componentDidMount(){

    
    this.search = this.props.location.search;
    this.id = this.search.match(/\d+/gi).toString();
    //获取用户信息
    getUserDetailData(this.id).then( (res)=>{

      try{
        if(res.data.code === 200) {
          this.props.userDetailDataFunc(res.data)
        }
      }catch(err){
        console.log("错误为："+err)
      }

    } )
    //获取用户最近一周所听的歌曲
    getUserPlayerList(this.id,1).then( (res)=>{
      if(res.data.code===200) {
        this.props.userSingerPlayListFunc(res.data)
      }
    } )
    //获取用户信息 , 歌单，收藏，mv, dj 数量
    // getUserSubCount().then( (res)=>{
    //   console.log(22)
    //   console.log(res.data)
    // } )
    //请求userhome的歌单数据
    getUserHomePlaylist(this.id).then( (res)=>{
      this.props.userHomePlaylistFunc(res.data)
    } )
  }
  recentWeek=()=>{
    getUserPlayerList(this.id,1).then( (res)=>{
      if(res.data.code===200) {
        this.props.userSingerPlayListFunc(res.data)
      }
    } )  }

  allTime=()=>{
    //获取用户所有时间一周所听的歌曲
    getUserPlayerList(this.id,0).then( (res)=>{
      if(res.data.code===200) {
        this.props.userSingerPlayListFunc(res.data)
      }
    } )
  }

  dumpSong=(id)=>{
    this.props.history.push(`/song?id=${id}`)
  }
  changeRedocd=(num)=>{
    //这里空缺，等找到相应的接口再填上去
    this.setState({
      songsNumber:num
    })
  }
//播放歌曲
  startPlaySong=(id)=>{
    getSongUrlData(id).then( (res)=>{
      if(res.data.code===200) {
          //这个是用reducer实现数据持久化
          // this.props.songUrlDataFunc(res.data);
          //储存一个歌曲播放列表,这里尝试用storage,不过这里也可以用reducer进行储存,这里采用storage试试效果
          let arr = [];
         let storage =  JSON.parse(localStorage.getItem("songUrlData"));
         if(!storage) {
            arr.push(res.data)
            localStorage.setItem('songUrlData',JSON.stringify( arr))
         }else {
          storage.push(res.data)
          localStorage.setItem("songUrlData",JSON.stringify(storage))
         }


          docCookies.setItem("playing","PLAYING");
          this.forceUpdate();
      }else {
          message.info("请求数据失败,请在此点击尝试")
      }
  } )
  //请求歌曲,歌手的播放信息
  getSongData(id).then( (res)=>{
      if(res.data.code===200) {
           //这个是用reducer实现数据持久化
          // this.props.songSingerInfoFunc(res.data)

          //储存一个歌手和歌曲信息这里尝试用storage,不过这里也可以用reducer进行储存,这里采用storage试试效果
          let arr = [];
          let storage =  JSON.parse(localStorage.getItem("songInfoData"));
          if(!storage) {
             arr.push(res.data)
             localStorage.setItem('songInfoData',JSON.stringify( arr))
             this.forceUpdate();

          }else {
           storage.push(res.data)
           localStorage.setItem("songInfoData",JSON.stringify(storage))
          }


      }else {
          message.info("请求歌手歌曲数据失败,请重新尝试")
      }
  } )
  }
 

 

  
  

  render() {
    const userDetailData = this.props.userDetailData;
    
  
    //用户听歌排行数据
    const userSingerPlayList = this.props.userSingerPlayList;
    // console.log(userSingerPlayList)
    return (
      <div className='user-home'>
        
        <div className='user-home-header' style={{ backgroundColor:"#242424" }}><Header /></div>

     
        <div className='user-home-content' style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1200px" }}>
            <Row>
                <Col span={4}></Col>
                <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",paddingLeft:"20px",paddingRight:"20px",paddingBottom:"100px" }}>
                 
                  <Introduction id={this.id}  userDetailData={this.props.userDetailData}/>
               
                  <div className='user-home-content' style={{ marginTop:"50px" }}>
                       {/* //听歌排行榜 */}
                        <div className='singer-play-list'>
                            <div className='singer-play-list-title' style={{ paddingBottom:"10px", borderBottom:"2px solid #C20C0C", }}>
                                <Row>
                                  <Col style={{ float:"left",fontSize:"20px",marginRight:"10px" }}>听歌排行</Col>
                                  <Col style={{ float:"left",marginTop:"10px",fontSize:"12px" }}>累积听歌<span>{userSingerPlayList.hasOwnProperty('allData')?(userSingerPlayList.allData&&userSingerPlayList.allData.length>0?userSingerPlayList.allData.length:0):(userSingerPlayList.weekData&&userSingerPlayList.weekData.length>0?userSingerPlayList.weekData.length:0)}</span>首</Col>
                                  <Col style={{ float:"left" }}>
                                    <Tooltip placement="bottomLeft" overlayStyle={{ fontSize:"12px" }} title="实际播放时间过短的歌曲将不纳入计算。">
                                        <Icon style={{ marginLeft:"15px",paddingTop:"13px" }} type="info-circle" />
                                    </Tooltip>
                                  </Col>
                                  <Col style={{ float:"right" }}>
                                      <div 
                                        style={{ float:"left",fontSize:"12px",cursor:"pointer",color:userSingerPlayList.hasOwnProperty('weekData')?"#333":"#666666",fontWeight:userSingerPlayList.hasOwnProperty('weekData')?"bold":"normal" }}
                                        onClick={ ()=>this.recentWeek() }>最近一周</div>
                                      <div style={{ float:"left",marginRight:"5px",marginLeft:"5px",fontSize:"12px"  }}>|</div>
                                      <div 
                                        style={{ float:"left",fontSize:"12px",cursor:"pointer",color:userSingerPlayList.hasOwnProperty('allData')?"#333":"#666666",fontWeight:userSingerPlayList.hasOwnProperty('allData')?"bold":"normal" }}  
                                        onClick={ ()=>this.allTime() }>所有时间</div>
                                      <div style={{ clear:"both" }}></div>
                                  </Col>
                                  <Col style={{ clear:"both" }}></Col>
                                </Row>
                            </div>
                            <div className='singer-play-list-content'>
                                {
                                  userSingerPlayList.hasOwnProperty('weekData')
                                  ?<div className='play-list-weekdata'>
                                  {
                                      userSingerPlayList.weekData&&userSingerPlayList.weekData.length>0
                                      ?<div style={{ border:"2px solid #E2E2E2",position:"relative" }}>
                                        {
                                          userSingerPlayList.weekData.slice(0,this.state.songsNumber).map( (item,index,arr)=>{
                                            const firstPlayCount = arr[0]&&arr[0].playCount;
                                            const indexPlayCount = arr[index]&&arr[index].playCount;
                                            const playCountProgress = Math.floor(indexPlayCount/firstPlayCount*100);
                                            return <div className='clearfix' key={index+item.score} style={{ height:"38px",backgroundColor:index%2?"#F7F7F7":"#fff" }} >
                                                      <div style={{ display:"inline-block",color:"#666666",fontSize:"16px",width:"50px",textAlign:"right" }}>{index+1}.</div>
                                                      <div style={{ display:"inline-block" }} >
                                                        <Icon  onClick={ ()=>this.startPlaySong(item.song.id) }  type="play-circle" theme="filled" style={{ fontSize:"20px",cursor:"pointer",color:"#B4B4B4",marginLeft:"15px",verticalAlign:"middle",position:"relative",zIndex:"100"}} />
                                                      </div>
                                                      <div style={{ display:"inline-block",width:"480px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",verticalAlign:"bottom" }}>
                                                          <div style={{ display:"inline-block",marginLeft:"15px",color:"#333",fontWeight:"bold",fontSize:"12px",cursor:"pointer", }} onClick={()=>this.dumpSong(item.song.id)}>{item.song.name}</div>
                                                          <div style={{ display:"inline-block",marginLeft:"15px",color:"#aeaeae",fontSize:"12px" }}>
                                                              {
                                                                item.song.ar.map( (subItem,subIndex)=>{
                                                                  return `${subItem.name}/`
                                                                } ).join("").replace(/(.*)\//,"$1")
                                                              }
                                                          </div>
                                                      </div>
                                                      <div style={{ width:"320px",display:"inline-block",height:"38px",float:"right",opacity:"0.6",position:"relative" }}>
                                                          <div style={{ position:"absolute",top:"0px",left:"10px",zIndex:"100" }}>{indexPlayCount}次</div>
                                                          {
                                                            firstPlayCount===0
                                                            ?<Progress percent={100} style={{ height:"38px" }} strokeColor="#EEF8FE" showInfo={false} />
                                                            :<Progress percent={playCountProgress} style={{ height:"38px" }} strokeColor="#EEF8FE" showInfo={false} />
                                                          }
                                                        
                                                      </div>
                                                  </div>
                                                  
                                          } )
                                        }
                                        {
                                          this.state.songsNumber===10
                                          ?<div style={{ position:"absolute",bottom:"-30px",right:"0px",cursor:"pointer",fontSize:"12px" }} onClick={ ()=>this.changeRedocd(100) }>更多记录</div>
                                          :<div style={{ position:"absolute",bottom:"-30px",right:"0px",cursor:"pointer",fontSize:"12px" }} onClick={ ()=>this.changeRedocd(10) }>收起记录</div>
                                        }
                                      </div>
                                      :<div style={{ marginTop:"50px" }}><Empty description="暂无听歌记录"/></div>
                                    }
                                  </div>
                                  :<div className='play-list-allData'>
                                    {
                                      userSingerPlayList.allData&&userSingerPlayList.allData.length>0
                                      ?<div style={{ border:"2px solid #E2E2E2",position:"relative" }}>
                                        {
                                          userSingerPlayList.allData.slice(0,this.state.songsNumber).map( (item,index,arr)=>{
                                            const firstPlayCount = arr[0]&&arr[0].playCount;
                                            const indexPlayCount = arr[index]&&arr[index].playCount;
                                            const playCountProgress = Math.floor(indexPlayCount/firstPlayCount*100);
                                            return <div className='clearfix' key={index+item.score} style={{ height:"38px",backgroundColor:index%2?"#F7F7F7":"#fff" }} >
                                                      <div style={{ display:"inline-block",color:"#666666",fontSize:"16px",width:"50px",textAlign:"right" }}>{index+1}.</div>
                                                      <div style={{ display:"inline-block" }} >
                                                        <Icon  onClick={ ()=>this.startPlaySong(item.song.id) }  type="play-circle" theme="filled" style={{ fontSize:"20px",color:"#B4B4B4",marginLeft:"15px",verticalAlign:"middle" }} />
                                                        </div>
                                                      <div style={{ display:"inline-block",width:"480px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",verticalAlign:"bottom" }}>
                                                          <div style={{ display:"inline-block",marginLeft:"15px",color:"#333",fontWeight:"bold",fontSize:"12px",cursor:"pointer", }} onClick={()=>this.dumpSong(item.song.id)}>{item.song.name}</div>
                                                          <div style={{ display:"inline-block",marginLeft:"15px",color:"#aeaeae",fontSize:"12px" }}>
                                                              {
                                                                item.song.ar.map( (subItem,subIndex)=>{
                                                                  return `${subItem.name}/`
                                                                } ).join("").replace(/(.*)\//,"$1")
                                                              }
                                                          </div>
                                                      </div>
                                                      <div style={{ width:"320px",display:"inline-block",height:"38px",float:"right",opacity:"0.6",position:"relative" }}>
                                                          <div style={{ position:"absolute",top:"0px",left:"10px",zIndex:"100" }}>{indexPlayCount}次</div>
                                                          {
                                                            firstPlayCount===0
                                                            ?<Progress percent={100} style={{ height:"38px" }} strokeColor="#EEF8FE" showInfo={false} />
                                                            :<Progress percent={playCountProgress} style={{ height:"38px" }} strokeColor="#EEF8FE" showInfo={false} />
                                                          }
                                                        
                                                      </div>
                                                  </div>
                                                  
                                          } )
                                        }
                                        {
                                          this.state.songsNumber===10
                                          ?<div style={{ position:"absolute",bottom:"-30px",right:"0px",cursor:"pointer",fontSize:"12px" }} onClick={ ()=>this.changeRedocd(100) }>更多记录</div>
                                          :<div style={{ position:"absolute",bottom:"-30px",right:"0px",cursor:"pointer",fontSize:"12px" }} onClick={ ()=>this.changeRedocd(10) }>收起记录</div>
                                        }
                                      </div>
                                      :<div style={{ marginTop:"50px" }}><Empty description="暂无听歌记录"/></div>
                                    }
                                  </div>
                                }
                            
                            </div>
                        </div>
                        {/* //创建的歌单或者收藏的歌单 */}
                        <div style={{ marginTop:"50px" }}>
                          <UserHomePlayList userId={this.id||0} nickname ={userDetailData.profile&&userDetailData.profile.nickname}  userHomePlaylist={this.props.userHomePlaylist}/>
                        </div>
                  </div>
                
                </Col>
                <Col span={4}></Col>
            </Row>

        </div>




        <div className='user-home-footer'><Footer /></div>


      </div>
    )
  }
}
export default UserHome