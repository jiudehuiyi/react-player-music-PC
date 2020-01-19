import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Row,Col,Button } from "antd";
import { withRouter } from "react-router-dom";
class AlreadyLogin extends React.Component{
    constructor(props){
        super(props);
    }

    handleAuthority=(id)=>{
        this.props.history.push(`/user/event?id=${id}`);
    }
    handleFollows=(id)=>{
        this.props.history.push(`/user/follows?id=${id}`);
    }
    handleFolloweds=(id)=>{
        this.props.history.push(`/user/fans?id=${id}`);
    }
    render(){
      
        let profile = this.props.loginObj.profile;
        return (
            <div className="alreadyLogin" style={{ marginTop:"30px",marginBottom:"30px" }}>
                <Row>
                    <Col span={12} style={{ textAlign:"center" }}>
                        <div style={{ padding:"2px",border:"1px solid #DADADA",width:"70%",marginLeft:"30px" }}>
                            <img style={{ width:"80px",height:"80px" }} src={profile.avatarUrl} alt={profile.nickname} title={profile.nickname}/>
                        </div>
                    </Col>
                    <Col span={12} style={{ marginTop:"30px" }}>
                        <div style={{ color:"#333333" }}>{ profile.nickname } </div>
                        <div><Button type="primary" >签到</Button></div>
                    </Col>
                </Row>
                <Row style={{ height:"30px",lineHeight:"30px",textAlign:"center",marginLeft:"30px",marginTop:"30px" }}>
                    <Col span={4} onClick={ ()=>this.handleAuthority(profile.userId) } style={{ cursor:"pointer" }}>
                        <div>{profile.authority}</div>
                        <div>动态</div>
                    </Col>
                    <Col span={4} onClick={ ()=>this.handleFollows(profile.userId) } style={{ cursor:"pointer" }}>
                        <div>{profile.follows}</div>
                        <div>关注</div>
                    </Col>
                    <Col span={4} onClick={ ()=>this.handleFolloweds(profile.userId) } style={{ cursor:"pointer" }}>
                         <div>{profile.followeds}</div>
                        <div>粉丝</div>
                    </Col>
                </Row>

              
          
            </div>
        )
    }
}

export default withRouter(AlreadyLogin);