import React, { Component } from 'react';
import { message } from 'antd'
import 'antd/dist/antd.css'
class Friends extends Component {
    render() {
        return (
            <div>
                {
                    message.info("此组件和我的音乐逻辑基本一样,所以这里省略")
                }
            </div>
        );
    }
}

export default Friends;