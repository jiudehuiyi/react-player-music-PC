//这个接口暂时没找到,就暂时用this.state模拟数据来代替请求数据

import React, { Component } from 'react';
import Header from '../../common/header'
import { Row,Col } from 'antd';
import 'antd/dist/antd.css';
import TopicI from '../../assets/images/topic.jpg'
import EditorImg from '../../assets/images/editor.jpg'
import TopicImg from "../../assets/images/topicImg.jpg";
class Topic extends Component {
  render() {
    return (
      <div className='topic-header'>
        <div style={{ backgroundColor:"#242424" }}>
            <Header />
        </div>

        <div className='topic-content' style={{ marginTop:"30px" }}>
            <Row>
                <Col span={4}></Col>

                <Col span={16} style={{ border:"2px solid #D3D3D3" }}>
                    <div className='topic-content-img' style={{ width:"100%",height:"100%" }}>
                        <img style={{ width:"100%",height:"100%" }}  src={TopicI} alt="" />
                    </div>
                    <div className='topic-content-editor' style={{ height:"70px",lineHeight:"70px",textAlign:"center",borderBottom:"1px solid #EFEFEF", }}>
                        <div style={{ display:"inline-block",marginRight:"10px" }}>
                            <img src={EditorImg} alt="" style={{ borderRadius:"50%" , verticalAlign: "baseline", }} />
                        </div>
                        <div style={{ display:"inline-block",lineHeight:"20px",textAlign:"left" }}>
                            <div style={{ marginTop:"15px" }}>潇洒小编 </div>
                            <p>网易云音乐是6亿人都在使用的音乐平台，致力于帮助音乐爱好者发现音乐惊喜...</p>
                        </div>
                        <div style={{ 
                            display:'inline-block',cursor:"pointer",width:"76px",height:"28px",lineHeight:"28px",
                            backgroundColor:"#D6433B",color:"#fff",fontSize:"12px",fontWeight:"bold",
                            borderRadius:"10px",marginLeft:"40px" 
                            
                            }}>
                            <span>+</span>
                            <span>关注</span>
                        </div>
                    </div>
                
                    <div className='topic-content-description' style={{ width:"580px",margin:"0 auto" }}>
                            <h1 style={{ marginTop:"40px",marginBottom:"20px" }}>让我用首歌 [夸夸你]</h1>
                            <div style={{ fontSize:"20px",color:"#9B9B9B" }}>
                                <span style={{ marginRight:"5px" }}>2019-03-25</span>
                                <span style={{ marginRight:"10px" }}>00:00</span>
                                <span style={{ marginRight:"10px" }}>阅读:19389</span>
                                <span style={{ color:"#0C73C2", }}>潇洒电台汇</span>
                            </div>
                            <div style={{ width:"580px"}}>
                                <img src={TopicImg} style={{ width:"580px" }} alt="" />
                            </div>
                            <div>因为没有数据请求,所以写到这里就结束了,等以后找到数据接口再补充</div>
                    </div>
                </Col>

                <Col span={4}></Col>
            </Row>
        </div>
      </div>
    )
  }
}

export default  Topic
