import React, { Component } from 'react'
import {  Link,withRouter } from 'react-router-dom'
import { Row,Col,Icon } from 'antd';
import 'antd/dist/antd.css'
 class Recommend extends Component {

    dumpArtists=(id)=>{
        this.props.history.push(`/artist?id=${id}`)
      }
    dumpUser=(id)=>{
        this.props.history.push(`/user/home?id=${id}`)
      }

  render() {
    const renderTest = this.props.singerTypeData.artists&&this.props.singerTypeData.artists.length>0?this.props.singerTypeData.artists.slice(0,8).map( (item,index)=>{
        return (
      <Col span={6}  key={item.name}>
          <div 
            onClick={ ()=>this.dumpArtists(item.id) }
            style={{ width:"164px",height:"164px",marginTop:"20px",border:"1px solid #F0F0F0",cursor:"pointer" }}>
            <img style={{ width:"164px",height:"164px" }} src={item.picUrl}/>
          </div>
          <div style={{ width:"100%",height:"20px",lineHeight:"20px",marginTop:"5px" }}>
            <div 
             onClick={ ()=>this.dumpArtists(item.id) }
            style={{ float:"left",fontSize:"12px",color:"#000" }}>{item.name}</div>
            <div style={{ float:"right",cursor:"pointer" }}
              onClick={ ()=>this.dumpUser(item.accountId) }
            ><Icon type="weibo-circle" theme="filled" style={{ color:"#E2252B",fontSize:"16px" }} /></div>
            <div className='clear' style={{ clear:"both" }}></div>
          </div>
      </Col>

        )
    } ):null;

    const renderHotSingerAndPic = this.props.hotSingerData.artists&&this.props.hotSingerData.artists.length>0?this.props.hotSingerData.artists.map( (item,index)=>{
        return (
      <Col span={6}  key={item.name} >
          <div 
            onClick={ ()=>this.dumpArtists(item.id) }
            style={{ width:"164px",height:"164px",marginTop:"20px",border:"1px solid #F0F0F0",cursor:"pointer" }}>
            <img style={{ width:"164px",height:"164px",cursor:"pointer" }} src={item.picUrl}/>
          </div>
          <div style={{ width:"100%",height:"20px",lineHeight:"20px",marginTop:"5px" }}>
            <div 
             onClick={ ()=>this.dumpArtists(item.id) }
            style={{ float:"left",fontSize:"12px",color:"#000",cursor:"pointer" }}>{item.name}</div>
            <div style={{ float:"right",cursor:"pointer" }}
              onClick={ ()=>this.dumpUser(item.accountId) }
            ><Icon type="weibo-circle" theme="filled" style={{ color:"#E2252B",fontSize:"16px" }} /></div>
            <div className='clear' style={{ clear:"both" }}></div>
          </div>
      </Col>

        )
    } ):null;
    
    
    return (
      <div>

        <div className='signed' style={{ borderLeft:"1px solid #E9E9E9",paddingBottom:"50px" }}>
            <div className='signed-title' style={{ padding:"50px 0px 10px 0px",margin:"0px 30px 0px 30px",fontSize:"24px",borderBottom:"2px solid #C20C0C" }}>
                    <div style={{ float:"left" }}>入驻歌手</div>
                    <div style={{ float:"right",fontSize:"14px",marginTop:"10px" }}>
                        <Link to='/discover/artist/signed/' style={{ color:"#666666",fontSize:"12px" }}>更多></Link>
                    </div>
                    <div style={{ clear:"both" }}></div>
             </div>

             <div className='signed-content'>
                <Row gutter={20} style={{ marginLeft:"20px",marginRight:"20px" }}>
                {
                    renderTest
                }
                </Row>
             </div>
        </div>


        <div className='signed' style={{ borderLeft:"1px solid #E9E9E9",paddingBottom:"50px" }}>
            <div className='signed-title' style={{ padding:"50px 0px 10px 0px",margin:"0px 30px 0px 30px",fontSize:"24px",borderBottom:"2px solid #C20C0C" }}>
                    <div style={{ float:"left" }}>热门歌手</div>
                    
                    <div style={{ clear:"both" }}></div>
             </div>

             <div className='signed-content'>
                <Row gutter={20} style={{ marginLeft:"20px",marginRight:"20px" }}>
                {
                    renderHotSingerAndPic 
                }
                
                </Row>
             </div>

             
        </div>

      </div>
    )
  }
}
export default withRouter(Recommend)