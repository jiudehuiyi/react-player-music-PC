import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Row,Col,Icon } from "antd";
import { withRouter } from "react-router-dom"
import { formatPlayCount } from '../../../api/formatIndexContent'
 class PersonalRecommend extends Component {
  constructor(props){
    super(props);
  }

  dumpPlaylist=(id)=>{
    this.props.history.push(`/playlist?id=${id}`)
  }
  render() {
    // console.log( this.props.recommendPlaylistData.data );
    // console.log( this.props.recommendSongsData )
    const recommendPlaylistData = this.props.recommendPlaylistData.data&&this.props.recommendPlaylistData.data.recommend || [];
    
    const renderRecommendPlayListData =  recommendPlaylistData.length>0?recommendPlaylistData.slice(0,4).map( (item,index)=>{
        return (
                <Col  key={item.name} style={{ position:"relative",marginTop:"30px",paddingRight:"0px",cursor:"pointer",paddingRight:"20px",boxSizing:"border-box"  }} span={6}>
                      <div style={{ width:"100%" }}>
                       <div onClick={ ()=>this.dumpPlaylist(item.id) }>
                          {
                            <img width='100%' height="140px"  alt={item.name} title={item.name}   height='140px' src={item.picUrl} alt=""  />
                          }
                            
                        </div> 
                        <div  onClick={ ()=>this.dumpPlaylist(item.id) } style={{ color:"#000",fontSize:"14px",width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {item.name}
                        </div>
                        <div style={{ fontSize:"12px" }}>{item.copywriter}</div>
                        
                        <div className='clearfix' style={{
                          height:"27px",lineHeight:"27px",backgroundColor:"#000" ,
                          position:"absolute",top:"113px",left:"0px",right:"20px",opacity:"0.4",color:"#fff",
                          }}>
                          <div style={{ float:"left" }}>
                              <Icon type="customer-service"  style={{ marginLeft:"5px",marginRight:"5px" }}/>
                              <span>{formatPlayCount(item.playcount)}</span>
                          </div>
                          <div style={{ float:"right",marginRight:"10px",fontSize:"14px" }}>
                              {/* <Icon type="right-circle" />  */}
                              <Icon type="play-circle" /> 
                          </div>
                        </div>
                      </div>
                  </Col>
        )
    } ):null
    return (
      <div className="PersonalRecommend" style={{ marginTop:"30px" }}>
        <div className='personalRecommend-title' style={{ paddingBottom:"5px",borderBottom:"2px solid #C10D0C" }}>
                <Row gutter={10}> 
                    <Col span={1} className='newdishshelf-title-logo'></Col>
                    <Col span={6} style={{ fontSize:"20px",color:"#000" }}>个性化推荐</Col>
                    <Col span={15}></Col>
                 
                </Row>


            </div>
            <div>
               <Row>
                    {
                      renderRecommendPlayListData
                    }
                </Row>
            </div>
      </div>
    )
  }
}
export default withRouter(PersonalRecommend)