import React, { Component } from 'react'
import { Row,Col,Pagination } from 'antd';
import 'antd/dist/antd.css'
import  { withRouter } from 'react-router-dom';
import SearchSelectList from '../searchSelectList';

 class Album extends Component {

    dumpAlbum=(id)=>{
        this.props.history.push(`/album?id=${id}`)
    } 
    dumpArtists=(id)=>{
        this.props.history.push(`/artist?id=${id}`)
    }
    handleChangePage=(page,pageSize)=>{
        this.props.handlePagination(page,pageSize)
      }

  render() {
    const searchData = this.props.searchData;
    const searchDataAlbum =  searchData.result&&searchData.result.albums;
    const renderSearchDataAlbum=searchDataAlbum&&searchDataAlbum.length>0&&searchDataAlbum.map( (item,index)=>{
        return (
            <Col style={{ display:"inline-block",marginTop:"15px" }} key={index+item.blurPicUrl}>
                <div style={{ width:"150px",height:"150px",cursor:"pointer" }} onClick={ ()=>this.dumpAlbum(item.id) }>
                    <img style={{ width:"150px",height:"150px" }} src={item.blurPicUrl}/>
                </div>
                <div onClick={ ()=>this.dumpAlbum(item.id) } style={{ marginTop:"10px",width:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</div>
                <div onClick={ ()=>this.dumpArtists(item.artist.id) } style={{ marginTop:"10px",width:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.artist.name}</div>
           </Col>
        )
    } )
    console.log(searchData)
    return (
      <div className='search-album'>
            <div className='singer-song-title' style={{ color:"#999999",fontSize:"12px" }}>
                搜索"{this.props.keyword}"找到 
                <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.albumCount}</span> 张专辑
            </div>
            <div className='search-album-searchList'>
                 <SearchSelectList  keyword={this.props.keyword} type={ this.props.type } />
            </div>
            <div className='singer-song-content'>
                <Row gutter={30}>
                    {
                        renderSearchDataAlbum
                    }
                </Row>
            </div>
            <div style={{ marginTop:"50px",textAlign:"center" }}>
            <Pagination  total={searchData.result&&searchData.result.albumCount} pageSize={30}  onChange={ (page, pageSize,e)=>this.handleChangePage(page, pageSize,e)  } />

        </div>
      </div>
    )
  }
}
export default withRouter(Album)