import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row,Col } from 'antd'
import 'antd/dist/antd.css'
import './index.scss'
import docCookies from '../../../api/docCookies';

 class SearchSelectList extends Component {

    constructor(props){
        super(props);
       
    }

    
    handleClick=(keyword,types)=>{
      //解决router的一个缺陷,
        this.props.history.push("empty");
        setTimeout( ()=>{
          this.props.history.push(`search?s=${keyword}&type=${types}`);
         } )

          
   }

  render() {
    // console.log(this.props.type)
    return (
      <div className='search-select-list' style={{ marginTop:"10px",marginBottom:"10px" }}>
      <Row style={{ minWidth:"880px" }}>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==1?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==1?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
            <div to=""  onClick={ ()=>this.handleClick(this.props.keyword,1) } >单曲</div>
          </Col>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==100?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==100?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
             <div to="" onClick={ ()=>this.handleClick(this.props.keyword,100) }>歌手</div>
          </Col>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==10?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==10?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
          <div to="" onClick={ ()=>this.handleClick(this.props.keyword,10) } >专辑</div>
          </Col>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==1014?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==1014?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
          <div to='' onClick={ ()=>this.handleClick(this.props.keyword,1014) }>视频</div>
          </Col>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==1006?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==1006?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
          <div to="" onClick={ ()=>this.handleClick(this.props.keyword,1006) }>歌词</div>
          </Col>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==1000?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==1000?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
          <div to="" onClick={ ()=>this.handleClick(this.props.keyword,1000) }>歌单</div>
          </Col>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==1009?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==1009?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
          <div to="" onClick={ ()=>this.handleClick(this.props.keyword,1009) }>主播电台</div>
          </Col>
          <Col style={{ float:"left",paddingLeft:"39px",paddingRight:"39px",backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px",borderBottom:this.props.type==1002?"1px solid transparent":"1px solid #D4D4D4",borderTop:this.props.type==1002?"2px solid #D13030":"2px solid #CCCCCC",cursor:"pointer" }}>
          <div to="" onClick={ ()=>this.handleClick(this.props.keyword,1002) }>用户</div>
          </Col>
          <Col style={{ clear:"both" }}></Col>
      </Row>
        
      </div>
    )
  }
}
export default withRouter(SearchSelectList)