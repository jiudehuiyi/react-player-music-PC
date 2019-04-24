import React, { Component } from 'react';
import { Spin,Row,Col,Input,Icon,Button } from 'antd';
import 'antd/dist/antd.css';


import {createAlbumComment} from '../../../api/formatData';
import './index.scss';
import defaultAvatar from '../../../assets/images/default_avatar.jpg';
 class AlbumComment extends Component {
  render() {
    // console.log(this.props.data)
    //格式化后的数据
    const albumCommentData = this.props.data
    // console.log(albumCommentData)
    const { TextArea } = Input;
    return (
      <div className='albumComment'>
          <div className='ownComment'>
              <div className='ownComment-header'>
                  <span 
                    style={{ color:"#4C4C4C",fontSize:"20px",marginRight:"20px" }}
                  >评论</span>
                  <span
                    style={{ color:"#6F6F6F",fontSize:"14px" }}
                  >共{albumCommentData.total?albumCommentData.total:<Spin />}条评论</span>
              </div>
              <div className='ownComment-content'>
                  <Row style={{ marginBottom:"10px" }}>
                    <Col span={2}>
                        <img src={defaultAvatar} width="50px" height="50px" alt="" />
                    </Col>
                    <Col span={22} style={{ position:"relative" }}>
                        <TextArea rows={4}   placeholder="评论" style={{ resize:"none" }}/>
                        <span className='circle'>&nbsp;</span>
                        <span className='circle-mask'>&nbsp;</span>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom:"30px" }} gutter={10}>
                    <Col span={2}></Col>
                    <Col span={1}>
                       <Icon type="smile" style={{ color:"#9D9D9D",fontSize:"20px",cursor:"pointer" }} />
                    </Col>
                    <Col span={1}>
                        <span className='aite'></span>
                    </Col>
                    <Col span={17}></Col>
                    <Col span={1}>140</Col>
                    <Col span={2}><Button type='primary'>评论</Button></Col>
                  </Row>
              
              </div>
          </div>
      </div>
    )
  }
}

export default AlbumComment;

