import React, { Component } from 'react'
import { withRouter,Redirect  } from 'react-router-dom'
import { Icon,Menu,Dropdown,Modal,Input,Select,Button, Checkbox,Form,message } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import { loginStatusRefresh } from '../../../../api';

 class NotLoginMenu extends Component {

  constructor(props){
    super(props);
    this.state={
      visible:false,
      loading:false
    }
  }


  telLogin=()=>{
    this.setState({
      visible:true
    })
    message.info("微信,qq，新浪没有API接口,而网易邮箱被和谐,待以后回复后再写剩下的组件,现在由手机登录暂时先代替")
  }

  onCancel=()=>{
    this.setState({
      visible:false
    })
  }

  handleSubmit=(ev)=>{
    this.props.form.validateFields((err, values) => {
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
          baseURL:"http://localhost:3000",
          withCredentials: true
        }).then(  (res)=>{
        if(res.data.code === 200){
          this.setState({
            visible:false,
            loading:false
          })
          message.info("登录成功~")
          //刷新登录状态,数据的获取不是通过res.data去获取,而是通过路由/login/status去获得持久化数据
          loginStatusRefresh().then( (res)=>{
            } )
            axios.get("http://localhost:3000/login/refresh").then()
            this.forceUpdate();
          this.props.handleLogin(true)
        }else {
          message.error(res.data.msg)
        }
      })
       
      }


    });
  }

  render() {
    

    const menu = (
      <Menu>
          <Menu.Item style={{ paddingLeft:"10px",paddingRight:"30px" }} onClick={ ()=>this.telLogin() }>
            <Icon type="phone" theme="filled" />
            <span>手机号登录</span>
          </Menu.Item>
          {/* //微信,qq，新浪没有API接口,而网易邮箱被和谐,待以后回复后再写剩下的组件,现在由手机登录暂时先代替 */}
          <Menu.Item>
             <Icon type="wechat" />
            <span>微信登录</span>  
          </Menu.Item>
          <Menu.Item>
            <Icon type="qq" />
            <span>qq登录</span>
          </Menu.Item>
          <Menu.Item>
             <Icon type="weibo-circle" />
              <span>新浪微博登录</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="mail" />
            <span>网易邮箱账号登录</span>
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

              <Modal 
              title="手机号登录"
              onCancel={ ()=>this.onCancel() }
              visible={this.state.visible}
              footer={[
                <Button type="primary" key='login' style={{ float:"left" }}>其他方式登录</Button>,
                <Button type="primary" key='register' style={{ float:"right" }}>没有账号?免费注册</Button>,
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
                        <Button type='primary' loading={this.state.loading} htmlType="submit" style={{ width:"70%",marginTop:"20px" }} >登录</Button> 
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

