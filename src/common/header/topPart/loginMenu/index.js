import React, { Component } from 'react';
import {Icon,Menu,Dropdown, Avatar} from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loginOut,loginStatusRefresh,baseURL } from '../../../../api';
import docCookies from "../../../../api/docCookies"
 class LoginMenu extends Component {

    // componentDidMount(){
    //   console.log(222)
    //   axios.get('http://localhost:3000/login/refresh').then( (res)=>{
    //     console.log(333)
    //     console.log(res.data)
    //   }  );
    // }
   //跳转主页的函数
    handleHomePage=(userId)=>{
      this.props.history.push(`/user/home?id=${userId}`)
    }
    //跳转我的消息函数
  handleMyMessage=()=>{
    this.props.history.push('/msg/m/at')
  }
  //跳转我的等级
  handleLevel=()=>{
    this.props.history.push('/user/level')
  }
  //跳转VIP会员
  handleMember=()=>{
    this.props.history.push("/member")
  }
  //跳转个人设置
  personSetting=()=>{
    this.props.history.push('/user/update')
  }
  //跳转实名认证
  authentic=()=>{
    window.location='https://music.163.com/st/userbasic/#/nameverify'
  }
  //退出登录
  exit=(boo)=>{
    loginOut().then( (res)=>{
      if(res.data.code===200) {
        this.props.handleLogin(boo)
      }
    } );
    //清除相应的cookie _csrf
    docCookies.removeItem("_csrf");
    //清除对应的登录信息
    localStorage.removeItem("loginObj")
    //返回到主页
    this.props.history.push("/");
  }
  render() {
    const menu = (
      <Menu>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.handleHomePage(this.profile.userId) }  >
            <Icon type="user" />
            <span>我的主页</span>
          </Menu.Item>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.handleMyMessage() }>
            <Icon type="mail" />
            <span>我的消息</span>  
          </Menu.Item>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.handleLevel() }>
          <Icon type="database" />
          <span>我的等级</span>
          </Menu.Item>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.handleMember() }>
            <Icon type="money-collect" theme="filled" />
              <span>VIP会员</span>
          </Menu.Item>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.personSetting() }>
          <Icon type="setting" />
            <span>个人设置</span>
          </Menu.Item>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.authentic() }>
          <Icon type="issues-close" />
            <span>实名认证</span>
          </Menu.Item>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.exit(true) }>
            <Icon type="logout" />
            <span>退出</span>
          </Menu.Item>
      </Menu>
    )
    // console.log(this.props.loginData)
    const loginData = this.props.loginData?this.props.loginData:{};
      this.profile = loginData.profile?loginData.profile:{};
    // console.log(loginData)
    return (
      <div style={{ color:"#fff" }} className='login-menu'>
             <Dropdown overlay={menu}>
                  <span style={{ marginRight:"10px" }}>
                  {
                    this.profile.avatarUrl?<Avatar  src={this.profile.avatarUrl}/>:<Avatar size="large" icon="user" /> 

                  }
                  <Icon type="caret-down" style={{ marginLeft:"10px" }} />
                  </span>
              </Dropdown>


      </div>
    )
  }
}
export default withRouter(LoginMenu)