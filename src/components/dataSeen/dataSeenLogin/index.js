import React from "react";
import "./index.css"
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import "antd/dist/antd.css";
import { Link,withRouter } from "react-router-dom"
class DataSeenLogin extends React.Component{


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(["username","password"],(err, values) => {
          if(err) {
            e.preventDefault();
          }else {
            const username = encodeURIComponent(values.username);
            const password =encodeURIComponent(values.password);
            if(username=="18302090015"&&password=="123456") {
              this.props.history.push("/touristDataSeen");
            }else {
              message.info("登录失败~");
            }
          }
        });
      };

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="dataSeenLogin" style={{ minWidth:"1200px",position:"relative" }}> 
                
                <div className='dataSeenLogin-loginForm' style={{ width:"300px" }}>

                <Form onSubmit={this.handleSubmit} className="login-form" style={{ width:"100%" }}>
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '用户邮箱或者手机号码不能为空' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="暂时停供的账号为:18302090015"
                        />,
                    )}
                    </Form.Item>
                      
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="暂时提供的密码为:123456"
            />,
          )}
        </Form.Item>
     
         
          <div style={{ width:"100%",textAlign:"center" }}>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{ width:"200px" }}>
                 登录
          </Button>
          </div>
          <div style={{ position:"absolute",right:"-25px",bottom:"0px"}}>

            <Link to="/touristDataSeen">免密登录</Link>

          </div>

         
         
       
      </Form>
                </div>
            </div>
        )
    }
}
export default  withRouter(Form.create({ name: 'data_seen_login' })(DataSeenLogin));