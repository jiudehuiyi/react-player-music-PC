import React, { Component } from 'react';
import { Row,Col,Icon } from 'antd';
import 'antd/dist/antd.css';
import { addOrEven, } from '.././../../api';
import {formatSongTime} from '../../../api/formatData';
import './index.scss'
 class SongList extends Component {



  startPlaySongSub=(id)=>{
    this.props.startPlaySong(id)
  }

  render() {
    // console.log( this.props.songInAlubmData )
    //格式化后的数据
    const songInAlubmData = this.props.songInAlubmData || [];
        //渲染歌单列表
        //addOrEven当是偶数的时候为true，当为奇数的时候为false

   const songList = songInAlubmData.map( (item,index)=>{
     const nth = addOrEven(index)?{backgroundColor:"#F7F7F7",cursor:"pointer"}:{backgroundColor:'#fff',cursor:"pointer"}
     return (
    <Row key={ item+index } style={ nth }>
      <Col span={4}
        style={{ height:"34px",lineHeight:"34px" }}
      >
          <span  style={{ marginLeft:"10px",marginRight:"20px",color:"#9D9D9D" }} >{index+1}</span>
          <Icon onClick={ ()=>this.startPlaySongSub(item.id) } style={{color:"#9D9D9D"  }} type="play-circle" />
      </Col>
      <Col span={10}
        style={{ height:"34px",lineHeight:"34px",fontSize:"12px",paddingLeft:"10px",position:"relative" }}                    
      >
          <span  style={{ marginRight:"5px" }}>{item.name}</span>
          <span  className={ item.mv>0?"bg-mv":"" }></span>
      </Col>
      <Col span={4}
        style={{ height:"34px",lineHeight:"34px",fontSize:"12px",paddingLeft:"10px" }}                                          
      >
          <span>{  formatSongTime(item.dt) }</span>
      </Col>
      <Col span={6}
        style={{ height:"34px",lineHeight:"34px",fontSize:"12px",paddingLeft:"10px" }}                                                                  
      >
          <span>{item.ar.slice(0,item.ar.length-1)}</span>
      </Col>
    </Row>  
     )
    } )
    return (
      <div>
        {
        songInAlubmData.length>0?
        <div className='songlist' style={{ marginBottom:"70px" }}>
          <div className='songlist-title' style={{ marginBottom:"5px" }}>
            <Row gutter={10}>
                <Col span={5} style={{ color:'#000',fontSize:"20px" }}>包含歌曲列表</Col>
                <Col span={3} style={{ marginTop:"5px" }}>{songInAlubmData.length}首歌</Col>
                <Col span={12}></Col>
                <Col span={4} style={{ marginTop:"5px",textDecoration:"underline",color:"#0B74BE",fontSize:"12px" }}>生成外链播放器</Col>
            </Row>

          </div>
         <div className='songlist-content' style={{ border:"1px solid #D9D9D9",borderTop:"2px solid #C20C0C" }}>
            <div className='songlist-content-header'>
                <Row style={{ borderBottom:"2px solid #D8D8D8" }}>
                    <Col  span={4}
                        style={{ backgroundColor:"#F3F3F3",height:"34px",lineHeight:"34px" ,borderRight:"1px solid #d8d8d8"}}
                    >
                        &nbsp;
                    </Col>
                    <Col span={10}
                        style={{ backgroundColor:"#F3F3F3",height:"34px",lineHeight:"34px",borderRight:"1px solid #d8d8d8",paddingLeft:"10px" }}
                    >歌曲标题</Col>
                    <Col span={4}
                        style={{ backgroundColor:"#F3F3F3",height:"34px",lineHeight:"34px",borderRight:"1px solid #d8d8d8",paddingLeft:"10px" }}                    
                    >时长</Col>
                    <Col span={6}
                        style={{ backgroundColor:"#F3F3F3",height:"34px",lineHeight:"34px",borderRight:"1px solid #d8d8d8",paddingLeft:"10px" }}                    
                    >歌手</Col>
                </Row>
                {
                  songList
                }

         


            </div>


         </div> 


        </div>
        :null
      }
      </div>
     
    )
  }
}
export default SongList