import React, { Component } from 'react'
import { Row,Col,Button,Pagination } from 'antd'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import SearchSelectList from '../searchSelectList'
 class User extends Component {

  dumpUser=(id)=>{
      this.props.history.push(`/user/home?id=${id}`)
  }

  render() {
    const searchData = this.props.searchData;

    const searchDataUserprofiles =  searchData.result&&searchData.result.userprofiles;
    const renderSearchDataUserprofiles = searchDataUserprofiles&&searchDataUserprofiles.length>0&&searchDataUserprofiles.map( (item,index)=>{
     return   <Row style={{ backgroundColor:index%2===0?"#fff":"#F7F7F7",height:"60px" }}>
        <Col 
            onClick={ ()=>this.dumpUser(item.userId) }
            style={{ display:"inline-block",marginLeft:"10px",cursor:"pointer",verticalAlign:"bottom" }} >
            <img style={{ width:"50px",height:"50px" }} src={item.avatarUrl}/>
        </Col>
        <Col style={{ display:"inline-block",width:"340px",marginLeft:"30px",cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",position:"relative" }}>
            <div onClick={ ()=>this.dumpUser(item.userId) } style={{ width:"300px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                {item.nickname}
            </div>
            <div style={{ width:"300px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                {item.signature}
            </div>
        </Col>
        <Col style={{ display:"inline-block",marginRight:"10px",verticalAlign:"super" }}>
           <Button type="primary" size="small"> + 关注</Button>
        </Col>
        <Col style={{ display:"inline-block",marginRight:"10px",verticalAlign:"super" }}>
            <span onClick={ ()=>this.dumpUser(item.creator.userId) }>歌单:1</span>
        </Col>
        
    </Row>

    } )
    return (
      <div className='search-user'>
        <div className='singer-song-title' style={{ color:"#999999",fontSize:"12px" }}>
            搜索"{this.props.keyword}"找到 
            <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.userprofileCount}</span> 个用户
        </div>
        <div className='user-searchList'>
            <SearchSelectList  keyword={this.props.keyword} type={ this.props.type } />
        </div>
        <div className='user-content'>
            {
                renderSearchDataUserprofiles
            }
        </div>
        <div style={{ marginTop:"50px",textAlign:"center" }}>
            <Pagination  total={searchData.result&&searchData.result.userprofileCount} pageSize={30}  onChange={ (page, pageSize,e)=>this.handleChangePage(page, pageSize,e)  } />

        </div>
      </div>
    )
  }
}
export default withRouter(User)