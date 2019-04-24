import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row,Col,Icon,Pagination } from 'antd'
import 'antd/dist/antd.css';
import SearchSelectList from '../searchSelectList'
import { formatPlayCount } from '../../../api/formatIndexContent'
 class Playlist extends Component {


    dumpPlaylist=(id)=>{
        this.props.history.push(`/playlist?id=${id}`)
    }
    dumpUser=(id)=>{
        this.props.history.push(`/user/home?id=${id}`)
    }
    handleChangePage=(page,pageSize)=>{
        this.props.handlePagination(page,pageSize)
      }

  render() {
    const searchData = this.props.searchData;
    const searchDataPlaylists =  searchData.result&&searchData.result.playlists;
    const renderSearchDataPlaylists = searchDataPlaylists&&searchDataPlaylists.length>0&&searchDataPlaylists.map( (item,index)=>{
        return (
            <Row style={{ backgroundColor:index%2===0?"#fff":"#F7F7F7",height:"60px",lineHeight:"60px" }}>
            <Col 
                style={{ display:"inline-block",cursor:"pointer",width:"17px",height:"17px",marginLeft:"20px",marginRight:"5px" }} 
                onClick={ ()=>this.dumpPlaylist(item.id) }>
                <Icon type="play-circle" style={{ fontSize:"17px",color:"#B2B2B2",verticalAlign:"middle" }} />
            </Col>
            <Col 
                onClick={ ()=>this.dumpPlaylist(item.id) }
                style={{ display:"inline-block",marginLeft:"10px",cursor:"pointer" }} >
                <img style={{ width:"50px",height:"50px" }} src={item.coverImgUrl}/>
            </Col>
            <Col style={{ display:"inline-block",width:"340px",marginLeft:"30px",cursor:"pointer" }}>
                <span onClick={ ()=>this.dumpPlaylist(item.id) }>{item.name}</span>
            </Col>
            <Col style={{ display:"inline-block",marginRight:"10px" }}>
                <span >114首</span>
            </Col>
            <Col style={{ display:"inline-block",width:"160px",cursor:"pointer" }}>
                <span> by {item.creator.nickname}</span>
            </Col>
            <Col style={{ display:"inline-block",marginRight:"10px" }}>
                <span onClick={ ()=>this.dumpUser(item.creator.userId) }>收藏：{formatPlayCount(item.bookCount)}</span>
            </Col>
            <Col style={{ display:"inline-block" }}>
                <span>收听：{formatPlayCount(item.playCount)}</span>
            </Col>
        </Row>
        )
    } )
    return (
      <div>
            <div className='search-playlist-title' style={{ color:"#999999",fontSize:"12px" }}>
                搜索"{this.props.keyword}"找到 
                <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.playlistCount}</span> 个歌单
            </div>
            <div className='search-playlist-searchList'>
                 <SearchSelectList  keyword={this.props.keyword} type={ this.props.type } />
            </div>
            <div className='search-playlist-content'>
               {
                   renderSearchDataPlaylists
               }
            </div>
            <div style={{ marginTop:"50px",textAlign:"center" }}>
            <Pagination  total={searchData.result&&searchData.result.playlistCount} pageSize={30}  onChange={ (page, pageSize,e)=>this.handleChangePage(page, pageSize,e)  } />

           </div>
      </div>
    )
  }
}
export default  withRouter(Playlist)