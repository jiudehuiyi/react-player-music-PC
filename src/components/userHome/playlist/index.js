import React, { Component } from 'react'
import { Row,Col, Spin,Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
class UserHomePlayList extends Component {

    dumpPlaylist=(id)=>{
        this.props.history.push(`/playlist?id=${id}`)
    }

  render() {
    //   console.log( this.props )
    const userHomePlaylist = this.props.userHomePlaylist.code && this.props.userHomePlaylist.playlist||[];
    //创建歌单数组
    let createPlaylist=[];
    //收藏歌单数组
    let storePlaylist=[];
        //对创建和收藏的歌单进行分类
    userHomePlaylist.length>0&&userHomePlaylist.forEach( (item,index)=>{
        if(this.props.userId==item.creator.userId) {
            createPlaylist.push(item)

        }else {
            storePlaylist.push(item)

        }
    } )
    // console.log(createPlaylist)
    // console.log(storePlaylist)
    //渲染创建歌单的内容
    const renderCreatePlaylist = createPlaylist.length>0
    ?createPlaylist.map( (item,index)=>{
        return (
            <Col span={6} style={{ marginTop:"20px", }} key={item.coverImgUrl}>
                <div style={{ position:"relative" }}>
                    {
                        item.coverImgUrl
                        ?<img  onClick={()=>this.dumpPlaylist(item.id)} style={{ width:"100%",cursor:"pointer",height:"200px" }} src={item.coverImgUrl}  alt="" title=""/>
                        :<div style={{ width:"100%",height:"200px" }}><Spin/></div>
                    }
                    
                    <div style={{ width:"100%",height:"27px",lineHeight:"27px",backgroundColor:"#0A0B0B",color:"#fff",position:"absolute",bottom:"0px" }}>
                        <div style={{ float:"left",marginLeft:"10px" }}>
                             <Icon type="customer-service" />
                             <span>{item.playCount}</span>
                        </div>
                        <div style={{ float:"right",marginRight:"10px" }}>
                              <Icon style={{ fontSize:"16px" }} type="right-circle" /> 
                        </div>
                        <div style={{ clear:"both" }}></div>
                    </div>
                </div>
                <div onClick={()=>this.dumpPlaylist(item.id)} style={{ width:"80%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",marginTop:"10px",cursor:"pointer" }}>{item.name}</div>
            </Col>
        )
    } )
    :<Spin/>
    //渲染收藏歌单内容
    const renderStorePlaylist = storePlaylist.length>0
    ?storePlaylist.map( (item,index)=>{
        return (
            <Col span={6} style={{ marginTop:"20px", }} key={item.coverImgUrl}>
                <div style={{ position:"relative" }}>
                    {
                        item.coverImgUrl
                        ?<img  onClick={()=>this.dumpPlaylist(item.id)} style={{ width:"100%",cursor:"pointer",height:"200px" }} src={item.coverImgUrl}  alt="" title=""/>
                        :<div style={{ width:"100%",height:"200px" }}><Spin/></div>
                    }
                    
                    <div style={{ width:"100%",height:"27px",lineHeight:"27px",backgroundColor:"#0A0B0B",color:"#fff",position:"absolute",bottom:"0px" }}>
                        <div style={{ float:"left",marginLeft:"10px" }}>
                             <Icon type="customer-service" />
                             <span>{item.playCount}</span>
                        </div>
                        <div style={{ float:"right",marginRight:"10px" }}>
                              <Icon style={{ fontSize:"16px" }} type="right-circle" /> 
                        </div>
                        <div style={{ clear:"both" }}></div>
                    </div>
                </div>
                <div onClick={()=>this.dumpPlaylist(item.id)} style={{ width:"80%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",marginTop:"10px",cursor:"pointer" }}>{item.name}</div>
            </Col>
        )
    } )
    :<Spin/>
    return (
      <div className='user-home-playlist'>
        {
            createPlaylist.length>0
            ?<div className='user-home-createPlaylist'>
                <div className='user-home-createPlaylist-title' style={{ fontSize:"20px",color:"#000",paddingBottom:"10px",borderBottom:"2px solid #C20C0C" }}>
                    <span>{this.props.nickname}</span>
                    <span>创建的歌单</span>
                    <span>({createPlaylist.length})</span>
                </div>
                <div className='user-home-createPlaylist-content'>
                <Row gutter={30}>
                    {
                        renderCreatePlaylist
                    }
                </Row>
                    
                </div>
            </div>
            :null
        }
        {
           storePlaylist.length>0
           ?<div className='user-home-storePlaylist'>
                <div className='user-home-storePlaylist-title' style={{ fontSize:"20px",color:"#000",paddingBottom:"10px",borderBottom:"2px solid #C20C0C",marginTop:"50px" }}>
                    <span>{this.props.nickname}</span>
                    <span>我收藏的歌单</span>
                    <span>({storePlaylist.length})</span>
                </div>
                <div className='user-home-storePlaylist-content'>
                <Row gutter={30}>
                    {
                        renderStorePlaylist
                    }
                </Row>
                    
                </div>
           </div>
           :null
        }
      </div>
    )
  }
}
export default  withRouter(UserHomePlayList)