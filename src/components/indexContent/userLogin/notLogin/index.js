import React, { Component } from 'react';
import { Button,message } from 'antd';
import 'antd/dist/antd.css';


 class NotLogin extends Component {

  handleClick=()=>{
    message.info("登录的和头部的原理一样,这里省略!!!!");
  }

  render() {
    return (
      <div className='notlogin' style={{ backgroundColor:"#F7F7F7",width:"100%",height:"126px",border:"1px solid #DBDBDB" }}>
            <p style={{ padding:"20px",fontSize:"12px",paddingBottom:"10px",minWidth:"230px" }}>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <div style={ { width:"100%",textAlign:"center" } }>
                 <Button onClick={ ()=>this.handleClick() } type='primary' style={{ backgroundColor:"#DD161D",border:"#DD161D" }} >立即登录</Button>
            </div>
      </div>
    )
  }
}

export default NotLogin