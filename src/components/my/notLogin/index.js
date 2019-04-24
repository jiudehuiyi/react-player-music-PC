import React, { Component } from 'react';
import Header from '../../../common/header'
import Footer from '../../../common/footer'
import { Empty } from 'antd'
import 'antd/dist/antd.css'
class NotLogin extends Component {
    render() {
        return (
            <div className='my-notLogin'>
                <div style={{ backgroundColor:"#242424" }}><Header/></div>
                <div className='my-notLogin-content' style={{ marginTop:"30px",paddingTop:"50px",paddingBottom:"50px" }} >
                    <Empty  description="请登录,登录可以获取更好的体验" />
                </div>
                <div><Footer /></div>
            </div>
        );
    }
}

export default NotLogin;