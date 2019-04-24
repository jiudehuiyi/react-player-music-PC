import React, { Component } from 'react'
import {  Row,Col, Avatar,Icon,Button, Tooltip,Empty,Progress,Modal,Input, message  } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { sendPersonMessage,followUser } from '../../../api'
 class Introduction extends Component {
    constructor(props){
        super(props);
        this.state={
          showMessageModal:false,
          showEmoji:false,
          textAreaValue:"",
        }
      }
//发送私信函数
sendMessage=()=>{
    this.setState({
      showMessageModal:true
    })
  }
  //显示emoji面板
  showEmojiFunc=()=>{
    this.setState({
      showEmoji:!this.state.showEmoji
    })
  }
  //获得emoji
  getEmoji=(emoji)=>{
    const renderEmoji = emoji.native
    this.setState({
      textAreaValue:this.state.textAreaValue+renderEmoji
    })

  }
  //改变textarea的值
  handleTextArea=(ev)=>{
    let value = ev.target.value;
    this.setState({
      textAreaValue:value
    })
  }

  handleCancel=()=>{
    this.setState({
      showMessageModal:false
    })
  }

  //发送私信给用户
  sendToUserMessage=()=>{
    if(this.userId.state.value&&this.textAreaRef.props.value){
      sendPersonMessage(this.userId.state.value,this.textAreaRef.props.value);
      message.info("发送成功")
    }else {
      message.info("请填写要发送的人和要发送的消息");
    }
    // sendPersonMessage()
  }
   //关注用户函数
   followUser=(id,t)=>{
    if(id) {
      followUser(id,t);
      message.info("关注成功")
    }else {
      message.info("关注失败,请重新关注")
    }
  }


  render() {
    const userDetailData = this.props.userDetailData;
    // console.log(userDetailData)
    //渲染社交网络图标
    const renderCommunicationLogo = userDetailData.bindings&&userDetailData.bindings.length>0?
    userDetailData.bindings.map( (item,index)=>{
      //根据item.type的类型确定社交网络的类型LOGO,这里就用统一一个LOGO
     return  <span onClick={ ()=>this.handleClick(item.url) } style={{ cursor:"pointer" }} key={item.url}>
              {
                item.url?<Icon type="weibo-circle" theme="filled" style={{  fontSize:"20px",color:"#FCEDA1",verticalAlign:"middle",marginLeft:"10px" }}/>:null
              }
              
             </span>
    } ):null;
    return (
        <div className='user-home-content-description'>
        <Row style={{ marginTop:"50px" }}>
          <Col span={6}>
          {
            userDetailData.profile&&userDetailData.profile.avatarUrl?
            <div className='user-avatar' style={{ width:"188px",height:"188px" }}>
              <img style={{ width:"188px",height:"188px",padding:"4px", border:"1px solid #D5D5D5" }} src={userDetailData.profile?userDetailData.profile.avatarUrl:null} alt=""/>
            </div>
            :<Avatar shape="square" size={164} icon="user"/>
            
          }
            
          </Col>
          <Col span={18}>
            <div style={{ borderBottom:"1px solid #DDDDDD",paddingBottom:"10px" }}>
                <Row gutter={10} style={{ height:"40px",lineHeight:"40px" }} className='clearfix'>
                    <Col style={{ fontSize:"20px",color:"#000",float:"left",}}>
                    <span>{userDetailData.profile?userDetailData.profile.nickname:null}</span>
                    </Col>
                    <Col style={{ float:"left", }}>
                      {
                        userDetailData.profile&&userDetailData.profile.vipType===0?null:<div className='user-home-cvip' ></div>
                      }
                    </Col>
                    <Col style={{ float:"left"}} >
                       <div className='user-home-level'>{userDetailData.level}</div>
                      
                      
                    </Col>
                    <Col  style={{ float:"left" }}>
                    
                      {
                       userDetailData.profile&& userDetailData.profile.gender===1?<div className='user-home-man'></div>:(userDetailData.profile&&userDetailData.profile.gender===2?<div className='user-home-woman'></div>:<div></div>)  
                      }
                    </Col>
                    <Col style={{ float:"left" }} >
                        <Button style={{ marginRight:"10px" }} onClick={ ()=>this.sendMessage() } ><Icon type="mail" />发私信</Button>
                        <Button type='primary' onClick={ ()=>this.followUser(this.props.id,1) } ><Icon type="plus" />关注</Button>
                    </Col>
                </Row>
                {
                 userDetailData.profile&&userDetailData.profile.description?
                 <div >
                 <i className='user-home-authLogo'></i>
                   {
                     userDetailData.profile.description
                   }
                 </div> 
                 :null
                }
            </div>
            <div>
                <ul style={{ listStyle:"none",paddingLeft:"0px" }}>
                  <li style={{ display:"inline-block",height:"53px",paddingRight:"40px",borderRight:"2px solid #DDDDDD",marginTop:"5px" }}> 
                     <Link to={`/user/event?id=${userDetailData.profile&&userDetailData.profile.userId}`}>
                        <strong style={{ fontSize:"26px",color:"#666666" }}>{userDetailData.profile&&userDetailData.profile.eventCount}</strong>
                        <div style={{ fontSize:"12px",color:"#898989" }}>动态</div>
                     </Link>
                  </li>
                  <li style={{ display:"inline-block",height:"53px",paddingRight:"40px",borderRight:"2px solid #DDDDDD",marginTop:"5px",marginLeft:"20px" }}> 
                     <Link to={`/user/follows?id=${userDetailData.profile&&userDetailData.profile.userId}`}>
                        <strong style={{ fontSize:"26px",color:"#666666" }}>{userDetailData.profile&&userDetailData.profile.follows}</strong>
                        <div style={{ fontSize:"12px",color:"#898989" }}>关注</div>
                     </Link>
                  </li>
                  <li style={{ display:"inline-block",height:"53px",paddingRight:"40px",marginTop:"5px",marginLeft:"20px" }}> 
                     <Link to={`/user/fans?id=${userDetailData.profile&&userDetailData.profile.userId}`}>
                        <strong style={{ fontSize:"26px",color:"#666666" }}>{userDetailData.profile&&userDetailData.profile.followeds}</strong>
                        <div style={{ fontSize:"12px",color:"#898989" }}>粉丝</div>
                     </Link>
                  </li>
                </ul>
            </div>
            {
                  userDetailData.profile&&userDetailData.profile.signature?
                  <div style={{ fontSize:"14px" }}> 
                    <span>个人介绍:</span>
                    <span>{userDetailData.profile.signature}</span>
                  </div>              
                  :null             
            }
            {
                   userDetailData.profile&&userDetailData.profile.city?
                   <div style={{ marginTop:"20px" }}>
                     <span>所在省份:</span>
                     <span>{`${userDetailData.profile.province}-${userDetailData.profile.city}(这里的数字代表这省份和城市,这里省份和城市的转化就省略了)`}</span>
                   </div>
                   :null
             
            }
            {
              userDetailData.bindings&&userDetailData.bindings.length>0&&userDetailData.bindings[0].url?
              <div style={{ marginTop:"10px" }}>
                <span>社交网络:</span>
                <span>{renderCommunicationLogo}</span>
              </div>
              :null
            }
          </Col>
        </Row>
 {/* //发送私信的弹出框 */}
 <div className='user-home-sendMessage' >
          <Modal  
          style={{ position:"relative" }}
            visible={this.state.showMessageModal}
            title="发新私信"
            onCancel={this.handleCancel}
            footer={
              [
                <div key='emoji' style={{ float:"left" }} onClick={ ()=>this.showEmojiFunc() }><Icon type="smile" style={{  fontSize:"18px",cursor:"pointer" }}/></div>,
                <div key='send' style={{ float:"right" }}>
                    <span style={{ marginRight:"10px" }}>200</span>
                    <Button type='primary' onClick={ ()=>this.sendToUserMessage() }>发送</Button>
                </div>,
                <div key='clear' style={{ clear:"both" }}></div>
              ]
            }
          >
                         
            <Input placeholder='发送人只支持用户的ID'  ref={ (duration)=>this.userId=duration } style={{  marginBottom:"20px" }}/>
            <Input.TextArea   onChange={ (ev)=>this.handleTextArea(ev) }    value={this.state.textAreaValue}  ref={ duration=>this.textAreaRef=duration } autosize={{minRows: 2, maxRows: 6}}/>
            <Picker set='emojione'   onSelect={ (emoji)=>this.getEmoji(emoji) }  style={{ position:"absolute",top:"260px",left:"0px",display:this.state.showEmoji?"inline-block":"none" }}  />
          </Modal>
      </div>

    </div>

    )
  }
}
export default Introduction