import React, { Component } from 'react';
import { Row,Col,Icon } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import './index.scss';
import Side from './side'
 class HomeList extends Component {
  render() {
    //   console.log(this.props)
     




      return (
        <div className='homeList' style={{ marginTop:"120px",marginBottom:"60px"}}>
            
             <div className='homeList-title' style={{ paddingBottom:"5px",borderBottom:"2px solid #C10D0C" }}>
                <Row gutter={10}> 
                    <Col span={1} className='homeList-title-logo'></Col>
                    <Col span={6} style={{ fontSize:"20px",color:"#000" }}>榜单</Col>
                    <Col span={15}></Col>
                    <Col style={{ fontSize:"12px",textAlign:"center",marginTop:"10px" }} span={2}>
                            <Link style={{ color:"#000" }} to={`/discover/toplist/`} >更多</Link>
                            <span className='more-icon'></span>
                    </Col>
                </Row>
            </div>

             <div className='homeList-content' style={{ marginTop:"20px" }}>
                <Row >
                     <Col span={8} className='clearfix' style={{ paddingTop:"30px",borderRight:"1px solid #DADADA" }}><Side topList={this.props.topList}/></Col>
                    <Col span={8} className='clearfix' style={{ paddingTop:"30px",borderRight:"1px solid #DADADA" }}><Side topList={this.props.newList}/></Col>
                    <Col span={8} className='clearfix' style={{ paddingTop:"30px",borderRight:"1px solid #DADADA" }}><Side topList={this.props.originalList}/></Col>
                </Row>
             </div>
       </div>
    )
  }
}

export default HomeList
