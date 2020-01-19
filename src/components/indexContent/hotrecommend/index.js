import React, { Component } from 'react';
import { Row,Col,Icon,Skeleton  } from 'antd';
import 'antd/dist/antd.css';
import { Link,withRouter } from 'react-router-dom'
import { formatPlayCount } from '../../../api/formatIndexContent'
import './index.scss';
 class HotRecommend extends Component {

  constructor(props){
    super(props);
   
  }
  

  handleClick=(id)=>{
    this.props.history.push(`/playlist?id=${id}`)
  }


  

  

 
  render() {
    //从三十张专辑中随机取出八张
    const hotCommend = this.props.hotCommend.length>0?this.props.hotCommend.slice(0,8):null;
    
    const hotCommendTags = this.props.hotCommendTags || [];
    // console.log(hotCommend)
    //渲染热门推荐歌单
    const renderHotCommend = hotCommend?hotCommend.map( (item,index)=>{
      
        return (
                <Col onClick={ ()=>this.handleClick(item.id) } key={item.name} style={{ position:"relative",marginTop:"30px",paddingRight:"0px",cursor:"pointer"  }} span={6}>
                      <div style={{ width:"100%" }}>
                        <div>
                          {
                            <img width='100%' ref={this.myRef} alt={item.name} title={item.name}   height='140px' src={item.picUrl} alt=""  />
                          }
                            
                        </div>
                        <div style={{ color:"#000",fontSize:"14px",width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {item.name}
                        </div>
                        <div className='clearfix' style={{
                          height:"27px",lineHeight:"27px",backgroundColor:"#000" ,
                          position:"absolute",top:"113px",left:"30px",right:"0px",opacity:"0.4",color:"#fff",
                          }}>
                          <div style={{ float:"left" }}>
                              <Icon type="customer-service"  style={{ marginLeft:"5px",marginRight:"5px" }}/>
                              <span>{formatPlayCount(item.playCount)}</span>
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
    //渲染热门推荐歌单的标签
     const renderHotCommendTags = hotCommendTags.length>0?
              hotCommendTags.map( (item,index,arr)=>{
                return (
                  <div key={item.id}>
                        <Col span={1} style={{ fontSize:"12px"}}>
                            <Link style={{ color:"#666666" }} to={`/discover/playlist?cat=${item.name}&order=hot`}>
                                 {item.name}
                            </Link> 
                        </Col>
                        <Col span={index===arr.length-1?0:1} style={{ fontSize:"12px",textAlign:"center" }}>|</Col>
                  </div>
                )
              } )
              :null;
    return (
      <div className='hotcommend-wrapper'>
            <div className='hotcommend-title'>
            <Row style={{ height:"35px",lineHeight:"35px" }}>
                <Col  className='hotcommend-title-logo' span={2}></Col>
                <Col span={4}  style={{ color:"#000",fontSize:"20px" }}>热门推荐</Col>
                {
                  renderHotCommendTags
                }
                <Col span={7}> </Col>
                <Col span={1} style={{ fontSize:"12px" }}>
                    <Link to='/discover/playlist' style={{ color:"#666" }}>更多</Link>
                </Col>
                {/* <Col span={1}><Icon  style={{color:"#C10D0C"}} type="caret-right" /></Col> */}
                <Col span={1}> <span className='more-icon'></span></Col>
            </Row>
            </div>
            <div className='hotcommend-content' >
              <Row gutter={60} style={{ paddingRight:"30px" }}>
                 {/* {renderHotCommend} */}
                  {
                    hotCommend?renderHotCommend:<Skeleton/>
                  }
                  
               </Row>  
            </div>
      </div>
    )
  }
}
export default withRouter(HotRecommend)