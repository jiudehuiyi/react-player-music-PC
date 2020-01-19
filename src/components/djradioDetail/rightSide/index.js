import React from "react";
import { Empty  } from "antd"
import 'antd/dist/antd.css';
class RightSide extends React.Component {

    render(){
        return (
            <div>
                <Empty description="暂时没有数据,等有数据接口的时候再补充"/>
            </div>
        )
    }
}
export default RightSide;