import React, { Component } from 'react'
import { Row,Col } from 'antd';
import 'antd/dist/antd.css';

class MultipleDownload extends Component {
  render() {
    return (
        <div className='mulportlogin'>
        <div className='mulportlogin-title'>网易云音乐多端下载</div>
        <Row>
                <Col span={24}><div className='mulportlogin-deviceLogo'></div></Col>
                <div className='mulportlogin-devicefont'>同步歌单，随时畅听320k好音乐</div>
        </Row>
  </div>
    )
  }
}
export default MultipleDownload