import React, { Component } from 'react'
import { withRouter,Redirect  } from 'react-router-dom'
import { Icon,Menu,Dropdown,Modal,Input,Select,Button, Checkbox,Form,message } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import { loginStatusRefresh,getMessageCode,checkMessageCode,registerApi } from '../../../../api';
import {baseURL} from "../../../../api/index";
 class NotLoginMenu extends Component {

  constructor(props){
    super(props);
    this.phoneRef = React.createRef();//短信验证手机号码的ref
    this.phoneRegisterRef = React.createRef();//注册的短信验证手机号码的ref
    this.state={
      visible:false,//手机号码是否显示弹窗
      mailVisible:false,//邮箱登录是否显示弹窗
      messageVisible:false,//短信验证是否显示弹窗
      registerVisible:false,//注册是否显示弹窗
      loading:false,//登录按钮的状态,可以提交和不可提交
      mailLoading:false,//邮箱登录按钮状态,可以提交和不可提交
      messageLoading:false,//短信验证登录按钮状态,可以提交和不可提交
      getMessageCodeDisabled:false,//获取验证码按钮状态,可用和不可用
    }
  }

  //点击手机号码登录触发的函数，弹出modal
  telLogin=()=>{
    this.setState({
      visible:true
    })
  }
  //点击邮箱登录触发的函数,弹出modal
  mailLogin=()=>{
    this.setState({
      mailVisible:true
    })
  }
  //点击短信登录触发的函数,弹出modal
  messageLogin=()=>{
    this.setState({
      messageVisible:true
    })
  }
  //点击注册触发的函数,弹出modal
  register=()=>{
    this.setState({
      registerVisible:true
    })
  }
  //取消手机号码登录的弹窗
  onCancel=()=>{
    this.setState({
      visible:false
    })
  }
  //取消邮箱登录的弹窗
  onMailCancel=()=>{
    this.setState({
      mailVisible:false
    })
  }
  //取消短信验证的弹窗
  onmessageCancel=()=>{
    this.setState({
      messageVisible:false
    })
  }
  //取消注册的弹窗
  onRegisterCancel=()=>{
    this.setState({
      registerVisible:false
    })
  }
  //手机号码和密码提交触发的函数
  handleSubmit=(ev)=>{
    this.props.form.validateFields(["telephone","password"],(err, values) => {
      if(err) {
        ev.preventDefault();
      }else {
        this.setState({
          loading:true
        })
        const telephone = encodeURIComponent(values.telephone);
        const password =encodeURIComponent(values.password);
        ev.preventDefault();
        //请求该登录接口,得到cookie凭证__csrf和登录信息
        axios.get(`/login/cellphone?phone=${telephone}&password=${password}`,{
          // baseURL:"http://localhost:3000",
          baseURL:baseURL,
          withCredentials: true
        }).then(  (res)=>{
        
          //将返回的信息储存在storage中,包含用户唯一ID等信息
          localStorage.setItem("loginObj",JSON.stringify(res.data));

        if(res.data.code === 200){
          this.setState({
            visible:false,
            loading:false
          })
          message.info("登录成功~")
          //刷新登录状态,数据的获取不是通过res.data去获取,而是通过路由/login/status去获得持久化数据
          loginStatusRefresh().then( (res)=>{
            } )
            // axios.get("http://localhost:3000/login/refresh").then()
            axios.get(`${baseURL}/login/refresh`).then()
            this.forceUpdate();
          this.props.handleLogin(true)
        }else if(res.data.code===502){
          message.info(res.data.message);
          this.setState({
            loading:false
          })
        }else {
          message.error(res.data.msg)
        }
      })
       
      }


    });
  }
  //邮箱账号密码提交触发的函数
  handleMailSubmit=(ev)=>{
   
    this.props.form.validateFields(["mailAccount","mailPassword"], (err,values)=>{
      if(err){
        ev.preventDefault();
      }else {
        
        const mailAccount = encodeURIComponent(values.mailAccount);
        const mailPassword = encodeURIComponent(values.mailPassword);
        ev.preventDefault();
        axios.get(`/login?email=${mailAccount}&password=${mailPassword}`,{
          baseURL:baseURL,
          withCredentials:true
        }).then( (res)=>{
          
             //将返回的信息储存在storage中,包含用户唯一ID等信息
          localStorage.setItem("loginObj",JSON.stringify(res.data));
          
          if(res.data.code === 200) {
            this.setState({
              mailVisible:false,
              mailLoading:false
            })
            message.info("登录成功~")
              //刷新登录状态,数据的获取不是通过res.data去获取,而是通过路由/login/status去获得持久化数据
            loginStatusRefresh().then( (res)=>{
            } )
            // axios.get("http://localhost:3000/login/refresh").then()
            axios.get(`${baseURL}/login/refresh`).then()
            this.forceUpdate();
          this.props.handleLogin(true)
          }else if(res.data.code===502){
            message.info(res.data.message);
            this.setState({
              mailLoading:false
            })
          }else {
            message.error(res.data.msg)
          }
        } )
      }
    } )
  }
  //短信验证提交后触发的函数
  handleMessageSubmit=(ev)=>{
    this.props.form.validateFields(["messagePhone","messagePassword"],(err,values)=>{
      if(err){
        ev.preventDefault();
      }else {
        const messagePhone = encodeURIComponent(values.messagePhone);
        const messagePassword = encodeURIComponent(values.messagePassword);
        ev.preventDefault();
        //由于这里没有短信验证的接口,所以这里先进行发送验证码,验证验证码
        checkMessageCode(messagePhone,messagePassword).then( (res)=>{
          if(res.data.code === 200) {
            this.setState({
              messageVisible:false
            })
            message.info("验证成功！！！");
            message.info("因为现在还没有短信验证登录的接口,等以后有了才更新");
          }else {
            message.info("验证码错误,请重新输入");
          }
        } ).catch( (err)=>{
          message.info("验证码错误,请重新输入");
        } )
      }
    })
  }
  //获取短信验证码
  handleMessageCode=()=>{
    let value = this.phoneRef.current.props.value;//获取电话号码的值
    if(!value){
      this.props.form.validateFields(["messagePhone"])
    }else {
      getMessageCode(value).then( (res)=>{
        
        if(res.data.code === 200) {
          this.setState({
            getMessageCodeDisabled:true
          })
          message.info("获取成功");
        }else{
          message.info("验证码错误,请重新发送!")
        }
      } ).catch( (err)=>{
        message.info("验证码错误,请重新发送!")
      } )
    }
  }
  //获取注册短信验证码
  handleRegisterMessageCode=()=>{
    let value = this.phoneRegisterRef.current.props.value;//获取注册电话号码的值
    if(!value){
      this.props.form.validateFields(["registerMessagePhone"])
    }else {
      getMessageCode(value).then( (res)=>{
        if(res.data.code === 200) {
          this.setState({
            getMessageCodeDisabled:true
          })
          message.info("获取成功");
        }else{
          message.info("验证码错误,请重新发送!")
        }
      } ).catch( (err)=>{
        message.info("验证码错误,请重新发送!")
      } )
    }
  }
  //注册
  handleRegister=(ev)=>{
    this.props.form.validateFields(["nickname","registerPassword","registerMessagePhone","registerCheckPassword"],(err,values)=>{
      if(err){
        ev.preventDefault();
      }else {
        const nickname = encodeURIComponent( values.nickname );
        const registerPassword = encodeURIComponent(values.registerPassword);
        const registerMessagePhone = encodeURIComponent(values.registerMessagePhone);
        const registerCheckPassword = encodeURIComponent(values.registerCheckPassword);
        ev.preventDefault();
        registerApi(nickname,registerPassword,registerMessagePhone,registerCheckPassword).then( (res)=>{
          if(res.data.code === 200) {
            message.info("注册成功!!")
          }else {
            message.info("注册失败,请重新注册!!")
          }
        } )
        .catch( (err)=>{
          console.log( message )
        } )
      }
    });
  }
  //微信登录
  weChatLogin=()=>{
    window.open( "https://open.weixin.qq.com/connect/qrconnect?appid=wxe280063f5fb2528a&response_type=code&redirect_uri=https://music.163.com/back/weichat&forcelogin=true&scope=snsapi_login&state=AuvmDLVQrP&checkToken=9ca17ae2e6ffcda170e2e6eeadb84fa3b88bbad26fadeb8eb7c45a979f8f84f33dfbb89d8db23b86918eb9e62af0feaec3b92aacb18182b670a59b96d9e65e829e8ba3c14b8be7fad6ef6f8cecfc92f674ad99ee9e&lang=zh_CN#wechat_redirect");
  }
  //qq登录
  qqLogin=()=>{
    window.open("https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100495085&response_type=code&redirect_uri=https://music.163.com/back/qq&forcelogin=true&state=iLmybfjYXv&checkToken=9ca17ae2e6ffcda170e2e6eeadb84fa3b88bbad26fadeb8eb7c45a979f8f84f33dfbb89d8db23b86918eb9e62af0feaec3b92af5b6a18ef025f5a7f9b5d55f838a9aa7d55a8aecbe91b46f85e983b0cd6d8c9cee9e");
  }
  //微博登录
  weiboLogin=()=>{
    window.open("https://api.weibo.com/oauth2/authorize?client_id=301575942&response_type=code&redirect_uri=http://music.163.com/back/weibo&forcelogin=true&scope=friendships_groups_read,statuses_to_me_read,follow_app_official_microblog&state=TFCIdyaelB&checkToken=9ca17ae2e6ffcda170e2e6eeadb84fa3b88bbad26fadeb8eb7c45a979f8f84f33dfbb89d8db23b86918eb9e62af0feaec3b92a97eefcb1f543ba9ebe90bc4a879a8fb3d55ea8ace594ef6e9ce9a6b2c254a289ee9e");
  }
  //免费注册
  handleFreeRegister=()=>{
    this.setState({
      visible:false,//手机号码是否显示弹窗
      mailVisible:false,//邮箱登录是否显示弹窗
      messageVisible:false,//短信验证是否显示弹窗
      registerVisible:true,//注册是否显示弹窗
    })
  }
  render() {
    

    const menu = (
      <Menu>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.telLogin() }>
            <Icon type="phone" theme="filled" />
            <span>手机号登录</span>
          </Menu.Item>
          <Menu.Item onClick={ ()=>this.messageLogin() }>
            {/* 短信接口验证暂时没有登录的功能,在这里实现一个发送验证码,验证验证码的功能 */}
            <Icon type="number"></Icon>
            <span>短信验证</span>
          </Menu.Item>
         {/* 微信登录暂时没接口,所以去跳转真正的微信扫码 */}
          <Menu.Item onClick={ ()=>this.weChatLogin() }>
             <Icon type="wechat" />
            <span>微信登录</span>  
          </Menu.Item>
          {/* qq登录暂时没接口,所以去跳转真正的qq登录页面 */}
          <Menu.Item onClick={ ()=>this.qqLogin() }>
            <Icon type="qq" />
            <span>qq登录</span>
          </Menu.Item>
          {/* 微博暂时没有接口,所以去跳转真正的微博登录接口 */}
          <Menu.Item onClick={ ()=>this.weiboLogin() }>
             <Icon type="weibo-circle" />
              <span>新浪微博登录</span>
          </Menu.Item>
          <Menu.Item onClick={ ()=>this.mailLogin() }>
            <Icon type="mail" />
            <span>网易邮箱账号登录</span>
          </Menu.Item>
          <Menu.Item onClick={ ()=>this.register() }>
            <Icon type="environment" />
            <span>注册</span>
          </Menu.Item>
      </Menu>
    )
    const InputGroup = Input.Group;
    const Option = Select.Option;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='notLogin-menu' style={{ position:"relative",color:"#fff" }}>
          <div style={{ cursor:"pointer", }}>
              <Dropdown overlay={menu}>
                  <span style={{ marginRight:"10px" }}>登录 <Icon type="caret-down" /></span>
              </Dropdown>
              {/* 这里的手机号码登录和邮箱登录逻辑是一样,可以写一个复用组件，这里是同时写了两组相似的逻辑 */}
              {/* 手机号登录的登录弹出框 */}
              <Modal 
              title="手机号登录"
              onCancel={ ()=>this.onCancel() }
              visible={this.state.visible}
              footer={[
                <Button type="primary" key='login' style={{ float:"left" }}>其他方式登录</Button>,
                <Button type="primary" key='register' style={{ float:"right" }} onClick={ ()=>this.handleFreeRegister() }>没有账号?免费注册</Button>,
                <div key='clear' style={{ clear:"both" }}></div>
              ]}
              >
                <div style={{ textAlign:"center",paddingTop:"30px",paddingBottom:"30px" }}>
                  <Form onSubmit={ (ev)=>this.handleSubmit(ev) }>
            
                            <InputGroup compact>
                                <Select defaultValue="中国 +86" style={{ display:"inline-block",width:"30%" }}>
                                  <Option value='中国 +86'>中国+86</Option>
                                </Select>
                                <Form.Item>
                                {
                                  getFieldDecorator('telephone',{
                                    rules: [{ required: true, message:'手机号码不能为空' }],
                                  })(
                                        <Input  style={{ display:"inline-block",verticalAlign:"super" }} placeholder='请输入手机号'/>
                                      )
                                }
                              </Form.Item>
                            </InputGroup>                         
                          
                      <Form.Item>
                        {
                          getFieldDecorator('password',{
                            rules:[{required:true,message:"密码不能为空"}]
                          })(
                            <Input.Password placeholder='请输入密码' style={{ width:"70%" }}/>
                          )
                        }
                      </Form.Item>

                       <Form.Item>
                           
                        <div style={{ width:"70%",margin:"0 auto",paddingTop:"20px" }}>
                            <div style={{ float:"left" }}>
                            {
                              getFieldDecorator('autoLogin',{
                                valuePropName:"checked",
                                initialValue:true
                              })(
                                <Checkbox>自动登录</Checkbox>
                              )
                            }
                            </div>
                            <div style={{ float:"right" }}>
                                忘记密码？
                            </div>
                            <div style={{ clear:"both" }}></div>
                        </div>                           
                        <Button type='primary' loading={this.state.messageLoading} htmlType="submit" style={{ width:"70%",marginTop:"20px"}} >登录</Button> 
                       </Form.Item> 

                  </Form>



                </div>
                
              </Modal>
              {/* 邮箱登录的弹出框 */}
              <Modal
                title="邮箱登录"
                visible={this.state.mailVisible}
                onCancel={ ()=>this.onMailCancel() }
                footer={[
                  <Button type="primary" key='login' style={{ float:"left" }}>其他方式登录</Button>,
                  <Button type="primary" key='register' style={{ float:"right" }} onClick={ ()=>this.handleFreeRegister() }>没有账号?免费注册</Button>,
                  <div key='clear' style={{ clear:"both" }}></div>
                ]}
              >
                <div>
                    <Form onSubmit={ (ev)=>this.handleMailSubmit(ev) }>
                         <Form.Item>
                                {
                                  getFieldDecorator('mailAccount',{
                                    // /^\w+@((\w+\.){1,2})(com|net)/gi,这个正则是用来匹配这些类型的账号密码:a@163.com,a@yeah.net,a@vip.163.com等
                                    rules: [{ required: true, message:'邮箱账号不能为空' },{pattern:/^\w+@((\w+\.){1,2})(com|net)/gi,message:"邮箱账号格式不正确"}],
                                  })(
                                        <Input placeholder="请输入邮箱账号"  style={{ display:"inline-block",verticalAlign:"super", }} />
                                      )
                                }
                        </Form.Item>

                        <Form.Item>
                        {
                          getFieldDecorator('mailPassword',{
                            rules:[{required:true,message:"密码不能为空"},{pattern:/\w+/gi,message:"密码不能含有非法字符"}]
                          })(
                            <Input.Password placeholder='请输入密码' />
                          )
                        }
                      </Form.Item>

                      <Form.Item>
                           
                           <div style={{ width:"70%",margin:"0 auto",paddingTop:"20px" }}>
                               <div style={{ float:"left" }}>
                               {
                                 getFieldDecorator('mailAutoLogin',{
                                   valuePropName:"checked",
                                   initialValue:true
                                 })(
                                   <Checkbox>自动登录</Checkbox>
                                 )
                               }
                               </div>
                               <div style={{ float:"right" }}>
                                   忘记密码？
                               </div>
                               <div style={{ clear:"both" }}></div>
                           </div>                           
                           <Button type='primary' loading={this.state.mailLoading} htmlType="submit" style={{ width:"70%",marginTop:"20px",marginLeft:"15%" }} >登录</Button> 
                          </Form.Item>                       
                      
                    </Form>
                </div>

              </Modal>
              {/* 短信验证登录,这里暂时还没有验证码登录的功能,只能实现发送验证码和验证验证码的功能 */}
              <Modal 
                title="短信验证登录"
                visible={this.state.messageVisible}
                onCancel={ ()=>this.onmessageCancel() }
                footer={[
                  <Button type="primary" key='login' style={{ float:"left" }}>其他方式登录</Button>,
                  <Button type="primary" key='register' style={{ float:"right" }} onClick={ ()=>this.handleFreeRegister() }>没有账号?免费注册</Button>,
                  <div key='clear' style={{ clear:"both" }}></div>
                ]}
              >
                <div style={{ textAlign:"center",paddingTop:"30px",paddingBottom:"30px" }}>
                    <Form onSubmit={ (ev)=>this.handleMessageSubmit(ev) }>
                          <InputGroup compact>
                                    <Select defaultValue="中国大陆" style={{ display:"inline-block",width:"30%" }}>
                                      <Option value='中国大陆'>中国大陆</Option>
                                      <Option value='中国香港'>中国香港</Option>
                                      <Option value='中国台湾'>中国台湾</Option>
                                      <Option value='中国澳门'>中国澳门</Option>
                                      <Option value='美国'>美国</Option>
                                      <Option value='其它特别地区'>其它特别地区</Option>
                                    </Select>
                                    <Form.Item>
                                    {
                                      getFieldDecorator('messagePhone',{
                                        rules: [{ required: true, message:'手机号码不能为空' }],
                                      })(
                                            <Input ref={this.phoneRef}  style={{ display:"inline-block",verticalAlign:"super" }} placeholder='请输入手机号'/>
                                          )
                                    }
                                  </Form.Item>
                          </InputGroup>
                          <InputGroup compact>
                            
                              <Form.Item>
                                {
                                  getFieldDecorator('messagePassword',{
                                    rules:[{required:true,message:"密码不能为空"}]
                                  })(
                                    <Input.Password placeholder='请输入短信验证码' style={{ width:"70%" }}/>
                                  )
                                }
                              </Form.Item>
                              <Button type="primary" disabled={this.state.getMessageCodeDisabled}  onClick={ ()=>this.handleMessageCode() }>获取验证码</Button>
                            </InputGroup>   
                            <Form.Item>
                              
                              <div style={{ width:"70%",margin:"0 auto",paddingTop:"20px" }}>
                                  <div style={{ float:"left" }}>
                                  {
                                    getFieldDecorator('autoLogin',{
                                      valuePropName:"checked",
                                      initialValue:true
                                    })(
                                      <Checkbox>自动登录</Checkbox>
                                    )
                                  }
                                  </div>
                                  <div style={{ float:"right" }}>
                                      忘记密码？
                                  </div>
                                  <div style={{ clear:"both" }}></div>
                              </div>                           
                              <Button type='primary' loading={this.state.mailLoading} htmlType="submit" style={{ width:"70%",marginTop:"20px"}} >登录</Button> 
                              </Form.Item> 

                    </Form>

                </div>
              
              </Modal>
                {/* 注册功能的弹出框 */}
                <Modal
                  title="注册"
                  visible={this.state.registerVisible}
                  onCancel={ ()=>this.onRegisterCancel() }
                  footer={[
                    <Button type="primary" key='login' style={{ float:"left" }}>已有账号?点击登录</Button>,
                    <div key='clear' style={{ clear:"both" }}></div>
                  ]}
                >
                     <div style={{ textAlign:"center",paddingTop:"30px",paddingBottom:"30px" }}>
                          <Form onSubmit={ (ev)=>this.handleRegister(ev) }>
                                <Form.Item>
                                   {
                                      getFieldDecorator('nickname',{
                                        rules:[{required:true,message:"昵称不能为空"}]
                                      })(
                                        <Input placeholder='请输入昵称' style={{ width:"70%" }}/>
                                      )
                                    }
                                </Form.Item>
                                <Form.Item>
                                   {
                                      getFieldDecorator('registerPassword',{
                                        rules:[{required:true,message:"密码不能为空"}]
                                      })(
                                        <Input.Password placeholder='请输入密码' style={{ width:"70%" }}/>
                                      )
                                    }
                                </Form.Item>
                                <InputGroup compact>
                                    <Select defaultValue="中国大陆" style={{ display:"inline-block",width:"30%" }}>
                                      <Option value='中国大陆'>中国大陆</Option>
                                      <Option value='中国香港'>中国香港</Option>
                                      <Option value='中国台湾'>中国台湾</Option>
                                      <Option value='中国澳门'>中国澳门</Option>
                                      <Option value='美国'>美国</Option>
                                      <Option value='其它特别地区'>其它特别地区</Option>
                                    </Select>
                                    <Form.Item>
                                    {
                                      getFieldDecorator('registerMessagePhone',{
                                        rules: [{ required: true, message:'手机号码不能为空' }],
                                      })(
                                            <Input ref={this.phoneRegisterRef}  style={{ display:"inline-block",verticalAlign:"super" }} placeholder='请输入手机号'/>
                                          )
                                    }
                                  </Form.Item>
                                </InputGroup>
                                <InputGroup compact>
                            
                                   <Form.Item>
                                      {
                                        getFieldDecorator('registerCheckPassword',{
                                          rules:[{required:true,message:"验证码不能为空"}]
                                        })(
                                          <Input.Password placeholder='请输入短信验证码' style={{ width:"70%" }}/>
                                        )
                                      }
                                  </Form.Item>
                                    <Button type="primary"   onClick={ ()=>this.handleRegisterMessageCode() }>获取验证码</Button>
                               </InputGroup>   
                                <Form.Item>
                              
                                  <div style={{ width:"70%",margin:"0 auto",paddingTop:"20px" }}>
                                      <div style={{ float:"left" }}>
                                      {
                                        getFieldDecorator('autoLogin',{
                                          valuePropName:"checked",
                                          initialValue:true
                                        })(
                                          <Checkbox>自动登录</Checkbox>
                                        )
                                      }
                                      </div>
                                      <div style={{ float:"right" }}>
                                          忘记密码？
                                      </div>
                                      <div style={{ clear:"both" }}></div>
                                  </div>                           
                                  <Button type='primary'  htmlType="submit" style={{ width:"70%",marginTop:"20px"}} >注册</Button> 
                               </Form.Item> 
                          </Form>

                     </div>
                </Modal>
          </div>
      </div>
    )
  }
}
export default Form.create()(withRouter(NotLoginMenu))

