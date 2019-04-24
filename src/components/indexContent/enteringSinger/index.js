import React, { Component } from 'react'
import { Row,Col,Button } from 'antd';
import 'antd/dist/antd.css';
import { withRouter,Link } from 'react-router-dom'
import { formatEnteringSinger,formatAlias } from '../../../api/formatIndexContent'
 class EnteringSinger extends Component {

handleClick=(id)=>{
    this.props.history.push(`/user/home?id=${id}`)
}
handleDump=()=>{
    window.location='https://music.163.com/nmusician/web/index#/'
}
checkAll=()=>{
    this.props.history.push('/discover/artist/signed/')
}
    
  render() {
      const enteringSinger = this.props.enteringSinger.artists&&this.props.enteringSinger.artists.length>0?this.props.enteringSinger.artists:null;
      const formatEnteringSingers = enteringSinger?formatEnteringSinger(this.props.enteringSinger.artists):null;
      const renderEnteringSingers = formatEnteringSingers && formatEnteringSingers.slice(0,5).map( (item,index)=>{
        return <Row key={item.picUrl}
                onClick={ ()=>this.handleClick(item.accountId) }
                style={{ marginTop:"20px",cursor:"pointer",marginBottom:"10px",backgroundColor:"#FAFAFA",border:"1px solid #E9E9E9" }}>
                    <Col span={8}>
                        <img style={{ width:"100%",height:"100%" }}  src={item.picUrl} alt="" />
                    </Col>
                    <Col span={16}>
                        <div style={{ fontSize:"14px",color:"#000",fontWeight:"bold",marginLeft:"10px",marginBottom:"10px",marginTop:"10px" }}>{formatAlias(item.alias) || item.name}</div>
                        {/* //这个还没找到对应的接口 */}
                        <div style={{ fontSize:"12px",marginLeft:"10px" }}>{item.name}</div>
                    </Col>
                </Row>
      } )
    return (
      <div className='entering-singer' style={{  border:"1px solid #DBDBDB",borderTop:"none",padding:"20px" }}>
            <div className='entering-singer-title' style={{ paddingBottom:"10px",borderBottom:"1px solid #dbdbdb" }}>
                <Row>
                    <Col span={8} style={{ color:"#000",fontWeight:"bold" }}>入驻歌手</Col>
                    <Col span={8}></Col>
                    <Col span={8}  onClick={ ()=>this.checkAll() } style={{ fontSize:"12px",cursor:"pointer" }}>查看全部></Col>
                </Row>
                
            </div>
            <div className='entering-singer-content' >
                {
                    renderEnteringSingers
                }
            </div>
            <div style={{ width:"100%",textAlign:"center" }} >
                <Button type="primary" onClick={ ()=>this.handleDump() } >申请成为音乐人</Button>
            </div>
      </div>
    )
  }
}
export default withRouter(EnteringSinger)