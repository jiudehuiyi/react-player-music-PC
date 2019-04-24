
import React, { Component } from 'react'
import { connect } from 'react-redux'
import  Header from '../../../common/header'
import  Footer from '../../../common/footer'
import { Row,Col } from 'antd';
import 'antd/dist/antd.css'
import { getUserDetailData, getUserEvenData,getUserFollowsData } from '../../../api'
import { getUserDetailDataActionUserEvent, userEventDataAction,userFollowsDataAction } from '../../../actions/userEvent'
import Introduction from '../introduction';

  class UserEvent extends Component {

    //跳转用户主页
    dumpUser=(id)=>{
        this.props.history.push(`/user/home?id=${id}`)
    }

    componentDidMount(){
        this.search = this.props.location.search;
        this.id = this.search.match(/\d+/gi).toString();
        //获取用户信息
     getUserDetailData(this.id).then( (res)=>{

        try{
          if(res.data.code === 200) {
            this.props.userDetailDataFunc(res.data)
          }
        }catch(err){
          console.log("错误为："+err)
        }
  
      } )
      //获取用户动态
      getUserEvenData(this.id).then( (res)=>{
        //   console.log(res.data)
        if(res.data.code===200){
            this.props.userEvenDataFunc(res.data)
        }
    } )
    //获取用户关注的人
    getUserFollowsData(this.id).then( (res)=>{
        if(res.data.code===200){
            this.props.userFollowsDataFunc(res.data)
        }
    } )
    }

  render() {
    //   console.log(this.props)
    //   const userDetailDataUserEvent = this.props.userDetailDataUserEvent;
    const userEvenData = this.props.userEvenData;
    const renderEvenData = userEvenData.events&&userEvenData.events.length>0?userEvenData.events.map( (item,index)=>{
        // console.log(item.json)
     return   <Row gutter={10}  key={item.user.avatarUrl+index} style={{ paddingBottom:"20px",borderBottom:"1px solid #E8E8E9",marginRight:"20px",marginTop:"10px" }}>
                    <Col span={2}>
                        <img src={item.user.avatarUrl} alt="" title="" style={{ width:"45px",height:"45px"  }}/>
                    </Col>
                    <Col span={21}>
                        <div>
                            <span style={{ color:"#0C73C2",marginRight:"5px" }}>{item.user.nickname}</span>
                            {/* //这里用户的动态是根据type去确定那种类型,然后渲染不同的东西,这里就直接统一了,不在另外写了 */}
                            <span>分享电台</span>    
                        </div>
                        <div style={{ color:"#ACACAC",fontSize:"12px" }}>2018年10月15日</div>
                        <div style={{ lineHeight:"26px", }}>我的新栏目《陈立客厅第二季·倾听》，今天正式回归更新了。这一次，你的故事也会成为内容的一部分。在最新一期节目下留言提问，我会逐一筛选回答，并用心理学、信息学、社会学、人类学的方式，分解归纳，伴你成为更好自己。陈立客厅开门纳客，邀请你加入这场自我探索成长之旅。</div>
                        <div style={{ backgroundColor:"#F5F5F5",height:"60px",marginTop:"10px" }}></div>
                        <div style={{ float:"right",marginTop:"10px",color:"#3C8ECE" }}>
                            <span>
                                赞({item.info.likedCount})
                            </span>
                            <span style={{ marginLeft:"5px",marginRight:"5px" }}>|</span>
                            <span>转发({item.info.shareCount})</span>
                            <span style={{ marginLeft:"5px",marginRight:"5px" }}>|</span>
                            <span>评论({item.info.commentCount})</span>
                        </div>
                        <div style={{ clear:"both" }}></div>
                    </Col>
             </Row>

    } ):null;
    const userFollowsData = this.props.userFollowsData;
    const follow = userFollowsData&&userFollowsData.follow||[];
    const renderFollow = follow.length>0?
    follow.slice(0,9).map( (item,index)=>{
        return (
            <Col span={8} style={{ marginTop:"10px",cursor:"pointer" }}>
                <img style={{ width:"100%",height:"64px" }} src={item.avatarUrl} alt="" title="" onClick={ ()=>this.dumpUser(item.userId) }/>
                <div style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} onClick={ ()=>this.dumpUser(item.userId) }>{item.nickname}</div>
            </Col>
        )
    } )
    :null
    return (
      <div className='user-event'>
            <div className='user-event-header' style={{ backgroundColor:"#242424" }}><Header /></div>
            <div className='user-event-content' style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1200px" }}> 
                <Row>
                    <Col span={4}></Col>
                    <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",paddingLeft:"20px",paddingRight:"20px",paddingBottom:"100px" }}>
                    
                    <Introduction  id={this.id} userDetailData={this.props.userDetailDataUserEvent} />
                    
                    <div className='userEvent-content' style={{ marginTop:"50px" }}>
                        <div className='userEvent-content-title' style={{ paddingBottom:"10px",borderBottom:"2px solid #C20C0C",fontSize:"20px",color:"#676767" }}>
                            <span>TA的动态</span>
                            <span>({userEvenData.size})</span>
                        </div>
                        <Row>
                            <Col span={17} style={{ borderRight:"2px solid #DBDBDB",paddingTop:"20px",paddingBottom:"50px" }}>
                            {
                                renderEvenData
                            }
                            </Col>
                            <Col span={7}>
                                <div style={{ marginLeft:"20px" }}>
                                    <div style={{ paddingBottom:"10px",borderBottom:"2px solid #CCCCCC" }}>TA的关注</div>
                                    <div>
                                        <Row gutter={20}>
                                            {
                                                renderFollow
                                            }
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    
                    
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>

            <div className='user-event-footer'><Footer /></div>

      </div>
    )
  }
}


const mapStateToProps=(state,ownProps)=>{
    return {
        userDetailDataUserEvent:state.getUserDetailDataReducer.data||{},
        userEvenData:state.userEvenDataReducer.data||{},
        userFollowsData:state.userFollowsDataReducer.data||{},
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        userDetailDataFunc:(data)=>{
            dispatch(getUserDetailDataActionUserEvent(data))
        },
        userEvenDataFunc:(data)=>{
            dispatch(userEventDataAction(data))
        },
        userFollowsDataFunc:(data)=>{
            dispatch(userFollowsDataAction(data))
        }
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(UserEvent)

