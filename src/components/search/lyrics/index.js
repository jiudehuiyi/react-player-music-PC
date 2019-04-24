import React, { Component } from 'react'
import SearchSelectList from '../searchSelectList';
import { Row,Col, Icon,Pagination } from 'antd';
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { formatSongTime } from '../../../api/formatData';
import Extends from './extends';
import NotExtends from './notExtends';

 class Lyrics extends Component {
     constructor(props){
         super(props);
         this.state={
            decideIsExtends:true
         }
         
     }
    startPlaySongSub=(id)=>{
        this.props.startPlaySongMain(id)
    }
    dumpArtists=(id)=>{
        this.props.history.push(`/artist?id=${id}`)
    }
    dumpSong=(id)=>{
        this.props.history.push(`/song?id=${id}`)
    }
    dumpAlbum=(id)=>{
        this.props.history.push(`/album?id=${id}`);
    }
    collapse=(boo)=>{
        console.log(boo)
    }
    collapse=(boo)=>{
        this.setState({
            decideIsExtends:boo
        })
    }
  render() {
    const searchData = this.props.searchData;
    const searchDataLyrics =  searchData.result&&searchData.result.songs;
    const renderSearchDataLyrics = searchDataLyrics&&searchDataLyrics.length>0&&searchDataLyrics.map( (item,index)=>{
        return (
            <div key={item.id}>
                 <Row style={{ backgroundColor:"#F7F7F7",height:"40px",lineHeight:"40px" }} >
                <Col style={{ display:"inline-block",marginLeft:"20px",marginRight:"5px" }}>
                    <Icon onClick={ ()=>this.startPlaySongSub(item.id) } type="play-circle" style={{ fontSize:"17px",color:"#B2B2B2" ,verticalAlign:"middle"}} />
                </Col>
                <Col style={{ display:"inline-block" }}>
                    <span   onClick={ ()=>this.dumpSong(item.id) } style={{ display:"inline-block",width:"370px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",verticalAlign:"middle",cursor:"pointer" }}>
                        {item.name}
                    </span>
                </Col>
                <Col style={{ display:"inline-block" }}>
                    <div style={{ width:"130px",cursor:"pointer",display:"inline-block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",verticalAlign:"middle" }}>
                        {
                            item.artists.map( (item,index,arr)=>{
                                return <span key={item.id}>
                                        <span onClick={ ()=>this.dumpArtists(item.id) }>{item.name} {index===arr.length-1?"":"/"} </span>  
                                    </span>
                            } )
                        }
                    </div>
                </Col>
                <Col style={{ display:"inline-block" }}>
                    <div onClick={ ()=>this.dumpAlbum(item.album.id) } style={{ display:"inline-block",cursor:"pointer",width:"150px",marginLeft:"10px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",verticalAlign:"middle"  }}>
                          《{item.album.name}》
                    </div>
                </Col>
                <Col style={{ display:"inline-block" }}>
                    <span>{formatSongTime(item.duration)}</span>
                </Col>
                </Row>
                <div style={{ padding:"30px 50px 30px 50px" }}>
                        {
                            this.state.decideIsExtends
                            ?<NotExtends lyrics={ item.lyrics } collapse={ (boo)=>this.collapse(boo) }  />
                            :<Extends lyrics={ item.lyrics } collapse={ (boo)=>this.collapse(boo) }/>
                        }
                    
                    
                </div>
            </div>
 
        )
    } )
    return (
      <div className='search-lyrics'>
            <div className='search-lyrics-title' style={{ color:"#999999",fontSize:"12px" }}>
                搜索"{this.props.keyword}"找到 
                <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.songCount}</span> 个歌词
            </div>
            <div className='search-lyrics-searchList'>
                  <SearchSelectList  keyword={this.props.keyword} type={ this.props.type } />
             </div>
             <div className='search-lyrics-content'>
                <div className='search-lyrics-content-title' >
                    {
                        renderSearchDataLyrics
                    }
                </div>

             </div>
             <div style={{ marginTop:"50px",textAlign:"center" }}>
            <Pagination  total={searchData.result&&searchData.result.songCount} pageSize={30}  onChange={ (page, pageSize,e)=>this.handleChangePage(page, pageSize,e)  } />

             </div>
      </div>
    )
  }
}
export default withRouter(Lyrics)