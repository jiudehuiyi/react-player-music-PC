import React, { Component } from 'react'
import { Row,Col,Pagination } from 'antd'
import { withRouter } from 'react-router-dom'
import SearchSelectList from '../searchSelectList'
import 'antd/dist/antd.css';
 class DjRadios extends Component {
    
    dumpDjRadios=(id)=>{
        this.props.history.push(`/djradio?id=${id}`)
    } 
    dumpUser=(id)=>{
        this.props.history.push(`/user/home?id=${id}`)
    }

  render() {
    const searchData = this.props.searchData;
    const searchDataDjRadios =  searchData.result&&searchData.result.djRadios;
    const renderSearchDataDjRadios=searchDataDjRadios&&searchDataDjRadios.length>0&&searchDataDjRadios.map( (item,index)=>{
        return (
            <Col style={{ display:"inline-block",marginTop:"20px" }}>
            <div style={{ width:"150px",height:"150px",cursor:"pointer" }} onClick={ ()=>this.dumpDjRadios(item.id) }>
                <img src={item.picUrl} style={{ width:"150px",height:"150px" }} />
            </div>
            <div style={{ width:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} onClick={ ()=>this.dumpDjRadios(item.id) }>
               {item.name}
            </div>
            <div style={{ width:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} onClick={ ()=>this.dumpUser(item.dj.userId) }>
                 by {item.dj.nickname}
            </div>

              </Col>
        )
    } )
    return (
      <div className='search-djRadios'>
            <div className='singer-song-title' style={{ color:"#999999",fontSize:"12px" }}>
                搜索"{this.props.keyword}"找到 
                <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.djRadiosCount}</span> 个节目
            </div>
            <div className='singer-song-searchList'>
                <SearchSelectList  keyword={this.props.keyword} type={ this.props.type } />
            </div>
            <div className='search-djRadios' style={{ paddingBottom:"10px",borderBottom:"1px solid #DADADA",color:"#333333",fontSize:"14px",fontWeight:"bold" }}>
                主播电台
            </div>
            <div className='search-djRadios-content'>
                <Row gutter={20}>
                    {
                        renderSearchDataDjRadios
                    }
                </Row>
            </div>
            <div style={{ marginTop:"50px",textAlign:"center" }}>
            <Pagination  total={searchData.result&&searchData.result.djRadiosCount} pageSize={30}  onChange={ (page, pageSize,e)=>this.handleChangePage(page, pageSize,e)  } />

            </div>
        </div>
    )
  }
}
export default withRouter(DjRadios)