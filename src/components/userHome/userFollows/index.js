import React, { Component } from 'react'
import { connect } from 'react-redux'
import  Header from '../../../common/header'
import  Footer from '../../../common/footer'
import { Row,Col, Button } from 'antd';
import 'antd/dist/antd.css'
import Introduction from '../introduction';
import { getUserDetailDataActionUserFollows ,userFollowsDataActionUserFollows} from '../../../actions/userFollows'
import { getUserDetailData,getUserFollowsData } from '../../../api'
 class UserFollows extends React.Component {

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
       //获取用户关注的人
    getUserFollowsData(this.id).then( (res)=>{
        if(res.data.code===200){
            this.props.userFollowsDataFuncUserFollows(res.data)
        }
    } )
    }
    dumpUser=(id)=>{
        this.props.history.push(`/user/home?id=${id}`)
    }
    dumpUserEven=(id)=>{
        this.props.history.push(`/user/event?id=${id}`)
    }
    dumpUserFollows=(id)=>{
        this.props.history.push(`/user/follows?id=${id}`)
    }
    dumpUserFans=(id)=>{
        this.props.history.push(`/user/fans?id=${id}`)
    }

    render() {
        // console.log(this.props)
        const userFollowsDataUserFollows = this.props.userFollowsDataUserFollows;
        const renderUserFollowsDataUserFollows = userFollowsDataUserFollows.follow&&userFollowsDataUserFollows.follow.length>0
        ?userFollowsDataUserFollows.follow.map( (item,index)=>{
            return  <Col span={12} style={{ padding:"20px",border:"1px solid #D5D5D5" }}>
                        <div style={{ display:"inline-block",marginRight:"10px",cursor:"pointer" }} onClick={ ()=>this.dumpUser(item.userId) }>
                            <img style={{ width:"64px",height:"64px" }} src={item.avatarUrl} alt="" title="" />                                    
                        </div>
                        <div style={{ display:"inline-block",verticalAlign:"middle",width:"250px" }}>
                            <div style={{ color:"#2983C9",height:"24px" }}>{item.nickname}</div>
                            <div>
                                <span style={{ cursor:"pointer" }} onClick={ ()=>this.dumpUserEven(item.userId) }>动态{item.eventCount}</span>
                                <span style={{ marginLeft:"5px",marginRight:"5px" }}>|</span>
                                <span style={{ cursor:"pointer" }} onClick={ ()=>this.dumpUserFollows(item.userId) }>关注{item.follows}</span>
                                <span style={{ marginLeft:"5px",marginRight:"5px" }}>|</span>
                                <span style={{ cursor:"pointer" }} onClick={ ()=>this.dumpUserFans(item.userId) }>粉丝{item.followeds}</span>
                            </div>
                            <div style={{ overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis" }}>{item.signature}</div>
                        </div>
                        <div style={{ display:"inline-block" }}>
                            <Button type="primary">关注</Button>
                        </div>
                   </Col>

        } )
        :null;
        
        return (
            <div>

                 <div className='user-event-header' style={{ backgroundColor:"#242424" }}><Header /></div>
                 <div className='user-follows-content'style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1200px" }}>
                 <Row>
                    <Col span={4}></Col>
                    <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",paddingLeft:"20px",paddingRight:"20px",paddingBottom:"100px" }}>
                          <Introduction  id={this.id} userDetailData={this.props.userDetailDataUserFollows} />
                           <div className='userFollows-content' style={{ marginTop:"50px" }}>
                                <div className='userFollows-content-title' style={{ paddingBottom:"10px",borderBottom:"2px solid #C20C0C",fontSize:"20px",color:"#676767" }}>
                                    <span>关注</span>
                                    <span>({ userFollowsDataUserFollows.follow&& userFollowsDataUserFollows.follow.length})</span>
                                </div>
                                <Row>
                                    {
                                        renderUserFollowsDataUserFollows
                                    }
                                </Row>
                           </div> 

                    </Col>
                    <Col span={4}></Col>
                </Row>
                 
                 </div>
                 <div className='user-event-footer'><Footer /></div>

            </div>
        );
    }
}


const mapStateToProps = (state={},ownProps)=>{
    return {
        userDetailDataUserFollows:state.getUserDetailDataReducerUserFollows.data||{},
        userFollowsDataUserFollows:state.userFollowsDataReducerUserFollows.data||{},
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        userDetailDataFunc:(data)=>{
            dispatch(getUserDetailDataActionUserFollows(data))
        },
        userFollowsDataFuncUserFollows:(data)=>{
            dispatch(userFollowsDataActionUserFollows(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserFollows);





