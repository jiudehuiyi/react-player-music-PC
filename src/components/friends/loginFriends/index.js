import React from "react";
import "antd/dist/antd.css";
import Header from "../../../common/header"
import { Row, Col, Button,Icon,Avatar } from "antd";
import "./index.css";
import { Link } from "react-router-dom";
import { formatYearMonthDate } from "../../../api/formatData"
import AlreadyLogin from "../../indexContent/userLogin/alreayLogin"
import Footer from "../../../common/footer"
class LoginFriends extends React.Component{


    render(){
        const firendsData = this.props.firendsData || {};
      
        const firendsDataEvent = firendsData.event || [];
        const renderFriendsDataEvent = firendsDataEvent.map( (item,index)=>{
            let msg = JSON.parse( item.json ).msg;
            
            let lastIndex = msg && msg.lastIndexOf("#");
            // console.log( lastIndex )
            let renderMsg = lastIndex&&lastIndex>0?msg.slice(lastIndex+1):msg;
          
            return (
                <div className="clearfix" style={{ paddingBottom:"20px",marginTop:"10px",borderBottom:"1px solid #E8E8E9" }} key={item.id}>
                    <div style={{ display:"inline-block" }}>
                        {
                            item.user.avatarUrl?
                            <img style={{ verticalAlign:"sub" }} src={item.user.avatarUrl} width="45px" height="45px" title={item.user.nickname} alt={item.user.nickname} />
                            : <Avatar shape="square" icon="user" style={{ width:"45px",height:"45px" }} />
                        }
 
                    </div>
                    <div style={{ display:"inline-block" }}>
                         <Link style={{ marginLeft:"10px",fontSize:"14px" }} to={`/user/home?id=${item.user.userId}`}>{item.user.nickname}</Link>
                        <span>-分享</span>
                        <div style={{ marginLeft:"10px" }}>{formatYearMonthDate(item.showTime || Date.now()) }</div>
                    </div>
                    <div style={{ marginTop:"10px",marginLeft:"55px" }}>
                          {item.actName?<Link to={`/activity?id=${item.actId}`}>{`#${item.actName}#`}</Link>:""}
                          {
                              renderMsg
                          }
                    </div>
                    {/* <div>这里省略一个音乐和视频,自己可以找相应得接口</div> */}
                    <div style={{ marginTop:"20px",marginLeft:"55px" }}>
                        {/* //这里有一个放大得功能,这里省略,提供一种思路,也就是点击图片展示相应得尺寸,尺寸在接口中已经提供 */}
                        {
                            item.pics && item.pics.length>0?<img src={item.pics[0].originUrl} style={{ width:item.pics[0].width/2,height:item.pics[0].height/2 }}  />:""
                        }
                    </div>
                    <div style={{ float:"right",color:"#539CD4",fontSize:"12px",fontWeight:"bold",marginTop:"20px" }}>
                        <span>{`赞 (${item.info && item.info.likedCount}) `}</span>
                        <span style={{ marginLeft:"5px",marginRight:"5px" }}>|</span>
                        <span>{`转发 (${item.info && item.info.shareCount})`}</span>
                        <span style={{ marginLeft:"5px",marginRight:"5px" }}>|</span>
                        <span>{`评论 (${item.info && item.info.commentCount})`}</span>
                    </div>
                </div>
            )
        } )
        return (
            <div className="loginFriends" style={{ backgroundColor:"#F5F5F5",minWidth:"1190px" }}>
                <div className='loginFriends-header' style={{ backgroundColor:"#000000",marginBottom:"30px" }}><Header /></div>
                <div className="loginFriends-content">
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",paddingBottom:"10px" }}>
                           <Row>
                               <Col span={16}>
                               <Row>
                                    <Col span={24} style={{ padding:"30px",borderRight:"1px solid #D3D3D3" }}>
                                    <div className="clearfix" style={{ borderBottom:"2px solid #C20C0C" }}>
                                        <h3 style={{ float:"left",fontSize:"24px",fontWeight:"bold" }}>动态</h3>
                                        <div style={{ float:"right" }}>
                                            <Button style={{ marginRight:"10px" }}><Icon type="select" />发动态</Button>
                                            <Button><Icon type="video-camera" /> 发布视频</Button>
                                        </div>
                                    </div>
                                </Col>
                                
                            </Row>
                               <Row>
                                <Col span={24}>
                                   <div style={{padding:"30px",paddingTop:"0px",borderRight:"1px solid #D3D3D3"}}>
                                        {
                                            renderFriendsDataEvent
                                        }
                                   </div>
                                </Col>
                                
                            </Row>
                       
                               </Col>
                               <Col span={8} style={{ backgroundColor:"#F6F6F6",borderBottom:"2px solid #D1D1D1" }}>
                                   <div >
                                      <AlreadyLogin loginObj={this.props.loginObj} />
                                   </div>
                               </Col>
                           </Row>
                            </Col>
                        <Col span={4}></Col>
                    </Row>
                </div>
                <div className='loginFriends-footer'><Footer /></div>
            </div>
        )
    }
}
export default LoginFriends