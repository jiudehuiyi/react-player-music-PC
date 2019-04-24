import React, { Component } from 'react'
import { Row,Col } from 'antd';
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

import { createTopList } from '../../../../api/formatIndexContent';
 import { addOrEven } from '../../../../api'
class Side extends Component{

    //跳转榜单
    dumpDiscoverToplist=(id)=>{
        this.props.history.push(`/discover/toplist?id=${id}`)
    }
    //跳转歌曲
    dumpSong=(id)=>{
        this.props.history.push(`/song?id=${id}`)
    }

    render(){
        const topList = this.props.topList;
        const playlist = topList.playlist || {};
        const formatPlayList = createTopList(playlist) || {};
        // console.log(this.props)
        // console.log(formatPlayList)
        const renderPlayList = formatPlayList.coverImgUrl?
        formatPlayList.tracks.slice(0,10).map( (item,index)=>{
            //前三名的字体渲染成红色
            const renderFontRed = index<=2?{color:"#C93C3B",fontSize:"16px",paddingLeft:"15px",fontWeight:"bold",marginRight:"10px",textAlign:"center",width:"35px",height:"32px"}
            :{marginRight:"10px",fontSize:"16px",fontWeight:"bold",paddingLeft:"15px",textAlign:"center"};
          //渲染间隔颜色
          const renderColor = addOrEven(index)?{backgroundColor:"#E8E8E8",height:"32px",lineHeight:"32px"}:{backgroundColor:"#F4F4F4",height:"32px",lineHeight:"32px"}
            return (
              <div style={renderColor} key={item.name}>
                  <span style={renderFontRed}>{index+1}</span>
                  <span 
                  onClick={ ()=>this.dumpSong(item.id) }
                  style={{ fontSize:"12px",color:"#101010",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer" }}>{item.name}</span>    
              </div>   
          )
        } ):null;
        
        return (
            <div >
                <Row >
                            <Col span={12}>
                                <img 
                                  onClick={ ()=>this.dumpDiscoverToplist(formatPlayList.id) }
                                  style={{ width:"80px",height:"80px",marginBottom:"25px",marginLeft:"20px",cursor:"pointer" }} 
                                  src={formatPlayList.coverImgUrl}  alt="" />
                            </Col>
                            <Col span={12}  >
                                <div 
                                onClick={ ()=>this.dumpDiscoverToplist(formatPlayList.id) }
                                style={{ fontSize:"14px",color:"#000",fontWeight:"bold",marginBottom:"10px",cursor:"pointer" }}>{formatPlayList.name}</div>
                                <span className='player-logo'> </span>
                                <span className='player-restore'></span>
                            </Col>
                        </Row>
                {
                    renderPlayList
                }
                <div style={{ backgroundColor:"#E8E8E8",height:"32px",lineHeight:"32px",width:"100%" }}>
                     <Row>
                        <Col span={16}></Col>
                        <Col span={8} 
                         onClick={ ()=>this.dumpDiscoverToplist(formatPlayList.id) }
                        style={{ fontSize:"12px",cursor:"pointer" }}>查看全部></Col>
                        </Row>
                </div>
            </div>
        )
    }
}
export default withRouter(Side)