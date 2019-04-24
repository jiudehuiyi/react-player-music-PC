import React, { Component } from 'react'
import { Icon } from 'antd';
import 'antd/dist/antd.css'


 class NotExtend extends Component {

    handleClick=()=>{
        this.props.handleExtendLyric(true)
    }  

  render() {
    return (
        <div>
            <div className='renderLyric' style={{ marginTop:"50px",fontSize:"14px",height:"300px",overflow:"hidden"}} dangerouslySetInnerHTML={{ __html:this.props.html }}>
                                            
            </div> 
            <div style={{ marginTop:"20px",cursor:"pointer"  }} onClick={ ()=>this.handleClick() }>
                <span style={{ color:"#2883C9" }}>展开</span>
                <Icon type="down" />
            </div>
        </div>
        
    )
  }
}
export default NotExtend