import React, { Component } from 'react'
import SearchSelectList from '../searchSelectList';
import { Row,Col,Icon,Pagination } from 'antd';
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

 class Video extends Component {
    dumpMv=(id)=>{
        this.props.history.push(`mv?id=${id}`);
    }
    dumpArtists=(id)=>{
        this.props.history.push(`/artist?id=${id}`)
    }
    handleChangePage=(page,pageSize)=>{
        this.props.handlePagination(page,pageSize)
      }
  render() {
    const searchData = this.props.searchData;
    const searchDataVideo =  searchData.result&&searchData.result.videos;
    const renderSearchDataVideo = searchDataVideo&&searchDataVideo.length>0&&searchDataVideo.map( (item,index)=>{
        return (
            <Col style={{ display:"inline-block",marginTop:"10px" }}>
                <div style={{ width:"160px",height:"90px",position:"relative",cursor:"pointer" }} onClick={ ()=>this.dumpMv(item.vid) }>
                    <img src={item.coverUrl} style={{ width:"160px",height:"90px" }}   />
                
                    <div style={{ position:"absolute",top:"0px",right:"0px",zIndex:1000,color:"#fff",marginRight:"10px" }}>
                    <Icon type="video-camera" style={{ marginRight:"5px" }} />
                        {item.playTime}
                    </div>
                </div>
                <div style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"160px",cursor:"pointer" }} onClick={ ()=>this.dumpMv(item.vid) }>{item.title}</div>
                <div style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"160px",marginBottom:"30px",cursor:"pointer" }}>
                    {
                        item.creator.map( (item,index,arr)=>{
                            return <span>
                                        <span onClick={ ()=>this.dumpArtists(item.userId) }>{item.userName} {index===arr.length-1?"":"/"} </span>  
                                  </span>
                        } )
                    }
                </div>
            </Col>
        )
    } )
    return (
      <div className='search-video'>
            <div className='singer-song-title' style={{ color:"#999999",fontSize:"12px" }}>
                搜索"{this.props.keyword}"找到 
                 <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.videoCount}</span> 个视频
            </div>
            <div className='search-video-searchList'>
                <SearchSelectList  keyword={this.props.keyword} type={ this.props.type } />
            </div>
            <div className='search-video-content'>
                <Row gutter={10}>
                    {
                        renderSearchDataVideo
                    }
                </Row>
            </div>
            <div style={{ marginTop:"50px",textAlign:"center" }}>
                  <Pagination  total={searchData.result&&searchData.result.videoCount} pageSize={30}  onChange={ (page, pageSize,e)=>this.handleChangePage(page, pageSize,e)  } />

             </div>
      </div>
    )
  }
}
export default withRouter(Video)