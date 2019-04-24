//处理单首歌曲的组件
import React, { Component } from 'react'
import SearchSelectList from '../searchSelectList';
import { Icon,Pagination,message } from 'antd';
import 'antd/dist/antd.css'
import { withRouter } from 'react-router-dom'
import { formatSongTime } from '../../../api/formatData';

 class SingerSong extends Component {


  handleChangePage=(page,pageSize)=>{
    this.props.handlePagination(page,pageSize)
  }
  //播放歌曲
  startPlaySongSub=(id)=>{
    // console.log("准备开始播放。。。")
     //请求歌曲播放地址
    this.props.startPlaySongMain(id)
  }
  dumpSong=(id)=>{
    this.props.history.push(`song?id=${id}`)
  }
  dumpArtists=(id)=>{
    this.props.history.push(`/artist?id=${id}`)
  }
  dumpAlbum=(id)=>{
    this.props.history.push(`/album?id=${id}`)
  }

  render() {
    //   console.log(this.props)
      const searchData = this.props.searchData;

      const searchDataSong =  searchData.result&&searchData.result.songs;
      const renderSearchDataSong =  searchDataSong&&searchDataSong.length>0&&searchDataSong.map( (item,index)=>{
        return  <div style={{ padding:"10px 10px 8px 18px",backgroundColor:index%2===0?"#fff":"#F7F7F7" }} key={item.id}>
                  <div style={{ width:"17px",height:"17px",display:"inline-block",cursor:"pointer" }} onClick={ ()=>this.startPlaySongSub(item.id) }>
                      <Icon type="play-circle" style={{ fontSize:"17px",color:"#B2B2B2",verticalAlign:"middle" }} />
                  </div>
                  <div 
                    onClick={ ()=>this.dumpSong(item.id) }
                    style={{ width:"370px",display:"inline-block",fontSize:"12px",verticalAlign:"middle",marginLeft:"10px",cursor:"pointer" }}>
                      {item.name}
                  </div>
                  <div 
                    onClick={ ()=>this.dumpArtists(item.artists[0].id) }
                    style={{ display:"inline-block" ,width:"130px",fontSize:"12px",verticalAlign:"middle",cursor:"pointer"}}>
                    {item.artists[0].name}
                  </div>
                  <div 
                    onClick={ ()=>this.dumpAlbum(item.album.id) }
                    style={{ display:"inline-block",width:"160px",fontSize:"12px",verticalAlign:"middle",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer" }}>
                    《{item.album.name}》
                  </div>
                  <div style={{ display:"inline-block" }}>
                    {formatSongTime(item.duration)}
                  </div>
               </div>
      } )
      return (
      <div className='singer-song'  >
        <div className='singer-song-title' style={{ color:"#999999",fontSize:"12px" }}>
            搜索"{this.props.keyword}"找到 
            <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.songCount}</span> 首单曲
        </div>
        <div className='singer-song-searchList'>
            <SearchSelectList  keyword={this.props.keyword} type={ this.props.type } />
        </div>
        <div className='singer-song-content'>
          {
            renderSearchDataSong
          }
        </div>
        <div style={{ marginTop:"50px",textAlign:"center" }}>
            <Pagination  total={searchData.result&&searchData.result.songCount} pageSize={30}  onChange={ (page, pageSize,e)=>this.handleChangePage(page, pageSize,e)  } />

        </div>
      </div>
    )
  }
}
export default withRouter(SingerSong)
