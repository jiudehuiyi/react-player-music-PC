import React, { Component } from 'react'
import { Icon } from 'antd';
import 'antd/dist/antd.css'

class Extend extends Component {


  handleClick=()=>{
    this.props.handleExtendLyric(false)
    }  

  render() {
    return (
        <div>
            <div className='renderLyric' style={{ marginTop:"50px",fontSize:"14px" }} dangerouslySetInnerHTML={{ __html:this.props.html }}>
                                            
            </div> 
            <div style={{ marginTop:"20px",cursor:"pointer" }} onClick={ ()=>this.handleClick() }>
                <span style={{ color:"#2883C9" }}>收起</span>
                <Icon type="up" />
            </div>
        </div>
    )
  }
}
export default  Extend