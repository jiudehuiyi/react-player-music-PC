import React, { Component } from 'react'
import { Row,Col,Button,Icon } from 'antd'
import 'antd/dist/antd.css'
import { formatSongTime } from '../../../api/formatData';

 class HotWorks extends Component {

    startSongsSub=(id)=>{
        this.props.startPlaySong(id);
    }


  render() {
      const hotSongs = this.props.hotSongs ||{};
      const renderHotSongs = hotSongs.length>0&&hotSongs.map( (item,index)=>{
        return (
            <Row  style={{ backgroundColor:index%2===0?"#F7F7F7":"#fff",height:"30px",lineHeight:"30px" }}>
            <Col style={{ display:"inline-block",marginLeft:"10px",marginRight:"50px",color:"#D2D2D2",width:"10px",textAlign:"left" }}>
                {index+1}
            </Col>
            <Col style={{ display:"inline-block",marginRight:"20px",width:"17px",height:"17px",cursor:"pointer" }} onClick={ ()=>this.startSongsSub(item.id) }>
                <Icon type='play-circle' style={{  fontSize:"17px" }} />
            </Col>
            <Col style={{ display:"inline-block",width:"250px",marginRight:"50px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:"16px" }}>
                {item.name}
                {item.alia&&item.alia.length>0?<span>{item.alia[0]}</span>:null}
            </Col>
            <Col style={{ display:"inline-block",width:"80px" }}>
                {formatSongTime(item.dt)}
            </Col>
            <Col style={{display:"inline-block",width:"120px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:"16px" }}>
                {item.al.name}
            </Col>
           </Row>
        )
      } )
    return (
      <div className='hot-works'  >
        <Row>
            <Col style={{ float:"left",marginRight:"10px",marginBottom:"10px" }}>
                <Button type="primary" onClick={ ()=>this.startSongsSub(hotSongs[0].id) }>
                    <Icon type='play-circle'/>
                    播放
                </Button>
                <Button type='primary' >
                    <Icon type="plus-circle" />
                </Button>
            </Col>
            <Col style={{ float:"left" }}>
               <Button type='primary'>
                <Icon type="folder-add" />
                    收藏热门50
               </Button>
            </Col>
            <Col style={{ float:"right" }}>
                <Button type='primary'>
                    热门单曲
                </Button>
            </Col>
            <Col style={{ clear:"both" }}>
            </Col>
        </Row>
        <div className='hot-works-songsList'>
        {
            renderHotSongs
        }
        </div>
      </div>
    )
  }
}
export default HotWorks