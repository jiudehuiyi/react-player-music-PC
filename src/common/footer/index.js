 import React, { Component } from 'react';
import {Col,Row} from 'antd';
import 'antd/dist/antd.css';

import './index.scss';
 class Footer extends Component {
  render() {
    return (
      <div className='footer' style={{ minWidth:"1050px" }}>
        
          <Row gutter={10}>
            <Col span={4}></Col>
            <Col span={16}>
                <Row>
                  <Col span={14}>
                      <Row style={{ marginBottom:"10px" }}>
                        <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer" }}>关于网易</Col>
                        <Col span={1} style={{ color:"#999" }}>|</Col>
                        <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer"  }}>客户服务</Col>
                        <Col span={1} style={{ color:"#999" }}>|</Col>
                        <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer"  }}>服务条款</Col>
                        <Col span={1} style={{ color:"#999" }}>|</Col>
                        <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer"  }}>网站导航</Col>
                        <Col span={1} style={{ color:"#999" }}>|</Col>
                        <Col span={3} style={{ color:"#999999",fontSize:"12px",marginRight:"5px",cursor:"pointer"  }}>意见反馈</Col>

                      </Row>
                      <Row style={{ color:"#666666",marginBottom:"10px",fontSize:"12px" }}>
                         网易公司版权所有©1997-2019  杭州乐读科技有限公司运营：<span>浙网文[2018]3506-263号</span>
                      </Row>
                      <Row style={{ color:"#666666",marginBottom:"10px",fontSize:"12px" }}>
                      违法和不良信息举报电话：0571-89853516 举报邮箱：<span>ncm5990@163.com</span>
                      </Row>
                  </Col>
                  <Col span={10}>
                     <Row>
                       <Col  span={6} style={{ textAlign:"center" }}>
                          <div className='user-token'></div>
                          <span>用户认证</span>
                       </Col>
                       <Col  span={6} style={{ textAlign:"center" }}>
                          <div className='dependentMusician'></div>
                          <span>独立音乐人</span>
                       </Col>
                       <Col  span={6} style={{ textAlign:"center" }}>
                          <div className='appreciate'></div>
                          <span>赞赏</span>
                       </Col>
                       <Col  span={6} style={{ textAlign:"center" }}>
                          <div className='videoReward'></div>
                          <span>视频奖励</span>
                       </Col>
                     </Row>
                      
                  
                  </Col>
                </Row>
            </Col>
            <Col span={4}></Col>
          </Row>
      </div>
    )
  }
}


export default Footer


