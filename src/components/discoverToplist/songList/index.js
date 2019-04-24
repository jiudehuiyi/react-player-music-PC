import React, { Component } from 'react'
import{ Row,Col,Icon } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { formatSongTime } from '../../../api/formatData';

 class SongList extends Component {

    startSongSub=(id)=>{
        this.props.startPlaySong(id);
    }

  render() {
    //   console.log(this.props.toplistContentData)
      const toplistContentData = this.props.toplistContentData;
      //渲染歌曲列表
      const renderToplistContentData = toplistContentData.tracks&&toplistContentData.tracks.length>0?
                                        toplistContentData.tracks.map( (item,index)=>{
            return(
                <Row key={item.id} style={{ height:index<3?"70px":"30px",lineHeight:index<3?"70px":"30px",backgroundColor:index%2?"#fff":"#F7F7F7" }}>
                    <Col span={3}>
                        <span style={{ width:"25px",display:"inline-block",textAlign:"center",marginLeft:"10px" }}>{index+1}</span>
                        <span style={{ marginLeft:"15px" }}>
                            {item.copyright?<Icon type="smile" theme="twoTone" />:<Icon type="meh" theme="twoTone"  />}
                        </span>
                    </Col>
                    <Col span={12} >
                        <Row gutter={10}>
                            {
                                index<3?
                                <Col span={4}>
                                     <Link style={{ display:"inline-block" }} to={`/song?id=${item.id}`}><img style={{ width:"50px",height:"50px",paddingRight:"10px" }} src={item.al.picUrl} alt=""/></Link>
                                </Col>:null
                            }
                            <Col span={2} onClick={ ()=>this.startSongSub(item.id) }>
                                <span style={{ display:"inline-block",cursor:"pointer" }}><Icon type="play-circle" style={{ color:"#B6B6B6",marginRight:"10px" }} /></span>
                            </Col>
                            <Col span={16} style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"inline-block" }}>
                                 <Link style={{ color:"#8E8E8E",marginRight:"5px" }} to={`/song?id=${item.id}`}>{item.name}</Link>
                                 {
                                   item.mv?<Link style={{ display:"inline-block" }} to={`/mv?id=${item.mv}`}><span><Icon type="robot" style={{ color:"#C54C4D" }} /></span></Link>:null
                                 }
                            </Col>
                            
                        </Row>

                    </Col>
                    <Col span={4}>{formatSongTime(item.dt)}</Col>
                    <Col span={5} style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"inline-block"}}><Link to={`/artist?id=${item.ar[0].id}`}>{item.ar[0].name}</Link></Col>
                </Row>  
            )
      } ):null
    return (
      <div className='songlist' style={{ marginTop:"30px" }}>
        
        <div className='toplist-songlist-header' style={{ borderBottom:"2px solid #C20C0C",paddingBottom:"5px" }}>
            <Row >
                <Col span={4} style={{ fontSize:"20px",color:"#000" }}><span>歌曲列表</span></Col>
                <Col span={3} style={{ marginTop:"7px" }}><span>{toplistContentData.trackCount}首歌</span></Col>
                <Col span={11}></Col>
                <Col span={6} style={{ marginTop:"7px",fontSize:"12px" }}><span>播放:<span style={{ color:"#C20C0C",fontWeight:"bold" }}>{toplistContentData.playCount}</span>次</span></Col>
            </Row>
        </div>
        <div className='toplist-songlist-content' style={{ border:"1px solid #D9D9D9" }}>
            <Row style={{ borderBottom:"1px solid #D3D3D3" ,boxShadow:"0px 0px 4px #D3D3D3",height:"34px",lineHeight:"34px" }}>
                <Col span={3} > </Col>    
                <Col span={12} style={{ borderLeft:"1px solid #D3D3D3",paddingLeft:"5px" }}>标题</Col>    
                <Col span={4} style={{ borderLeft:"1px solid #D3D3D3",paddingLeft:"5px" }}>时长</Col>    
                <Col span={4} style={{ borderLeft:"1px solid #D3D3D3",paddingLeft:"5px" }}>歌手</Col>    
            </Row>    

              {
                  renderToplistContentData
              }
        
        </div>
      </div>
    )
  }
}
export default SongList