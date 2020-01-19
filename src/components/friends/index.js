import React, { Component } from 'react';
import { message } from 'antd'
import 'antd/dist/antd.css'
import docCookies from "../../api/docCookies"
import MusicPlay from '../../common/MusicPlay';
import NotLogin from "../my/notLogin";
import LoginFriends from "./loginFriends"
import { getDyncMessage } from "../../api"
class Friends extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        getDyncMessage().then( (res)=>{
        
            if(res.status===200) {
                this.props.friendsFunc(res.data)
            }else {
                console.log("请求错误...")
            }
        } ).catch( err=>{
            console.log(err);
        } )
    }

    render() {
        let loginObj = localStorage.getItem("loginObj");//登陆后返回的信息,这里是将登录后的信息用localStorage存起来
          loginObj = JSON.parse( loginObj );
        let csrf=docCookies.getItem("__csrf");
        return (
            <div className="friends">
                 <MusicPlay />
                 {
                    csrf
                    ?<div><LoginFriends loginObj={loginObj} firendsData={ this.props.firendsData }/></div>
                    :<NotLogin />
                }
            </div>
        );
    }
}

export default Friends;