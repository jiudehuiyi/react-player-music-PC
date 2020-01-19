import React, { Component } from 'react'
import AlreadyLogin from "./alreayLogin"
import NotLogin from './notLogin'
import docCookies from "../../../api/docCookies"
import { getUserDetailData } from "../../../api"

 class UserLogin extends Component {
   constructor(props){
     super(props);
   }

   componentDidMount(){
    // let loginObj = localStorage.getItem("loginObj");//登陆后返回的信息,这里是将登录后的信息用localStorage存起来
    // loginObj = JSON.parse( loginObj );
    // console.log( loginObj )
    // let uid = loginObj.account.id;//用户唯一Id(每个用户都对应着唯一的ID)
    // getUserDetailData(uid).then( (res)=>{
    //   console.log( res )
    // } ).catch( err=>{ console.log( err ) } )
  }

  render() {
    let credentialsLogin = docCookies.getItem("__csrf");//登录凭证
    let loginObj = localStorage.getItem("loginObj");//登陆后返回的信息,这里是将登录后的信息用localStorage存起来
    loginObj = JSON.parse( loginObj );
    // console.log( loginObj )
    return (
      <div>
        {
          credentialsLogin?<AlreadyLogin loginObj={ loginObj }/>: <NotLogin />
        }
       
      </div>
    )
  }
}
export default UserLogin