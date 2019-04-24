import React, { Component } from 'react';
import { Row,Col,Icon,Tag,message } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { getPlaylistData,getPlayListCommentData, getHotPlaylistLike,getSongUrlData,getSongData } from '../../api';
import Header from '../../common/header'
import OwnComment from './ownComment' 
import HotComment from './hotComment'
import NewComment from './newComment'
import LikePlaylistPerson from './likePlaylistPerson'
import { formatPlaylistData, formatPlaylistPublishTime } from '../../api/formatPlayList'
import './index.scss'
import SongList from './songList';
import HotPlaylistLike from './hotPlaylistLike';
import MultipleDownload from './MultipleDownload';

import Footer from '../../common/footer'
import MusicPlay from '../../common/MusicPlay';
import docCookies from '../../api/docCookies';

 class PlayList extends Component {

  componentDidMount(){

    //获取playlistURL中的数据
     this.search = this.props.location.search;//获取查询字符串?id=xxx
    getPlaylistData(this.search).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.displayDataFunc(res.data);
        }
      }catch(err){
        console.log('错误为:'+err)
      }
    } )
    //获取歌单的评论数据
    getPlayListCommentData(this.search,20,1).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.playlistCommentDataFunc(res.data);
        }
      }catch(err){
        console.log('错误为:'+err)
      }
    } )
    // 获取歌单中的热门歌单(相似歌单
    getHotPlaylistLike(this.search).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.hotPlaylistDataFunc(res.data);
        }
      }catch(err){
        console.log('错误为:'+err)
      }
    } )


  }

  startPlaySong=(id)=>{
    
    //请求歌曲播放地址
 // 传递一个歌曲id给MusicPlayer
 getSongUrlData(id).then( (res)=>{
     if(res.data.code===200) {
         //这个是用reducer实现数据持久化
         // this.props.songUrlDataFunc(res.data);
         //储存一个歌曲播放列表,这里尝试用storage,不过这里也可以用reducer进行储存,这里采用storage试试效果
         let arr = [];
        let storage =  JSON.parse(localStorage.getItem("songUrlData"));
        if(!storage) {
           arr.push(res.data)
           localStorage.setItem('songUrlData',JSON.stringify( arr))
        }else {
         storage.push(res.data)
         localStorage.setItem("songUrlData",JSON.stringify(storage))
        }


         docCookies.setItem("playing","PLAYING");
         this.forceUpdate();
     }else {
         message.info("请求数据失败,请在此点击尝试")
     }
 } )
 //请求歌曲,歌手的播放信息
 getSongData(id).then( (res)=>{
     if(res.data.code===200) {
          //这个是用reducer实现数据持久化
         // this.props.songSingerInfoFunc(res.data)

         //储存一个歌手和歌曲信息这里尝试用storage,不过这里也可以用reducer进行储存,这里采用storage试试效果
         let arr = [];
         let storage =  JSON.parse(localStorage.getItem("songInfoData"));
         if(!storage) {
            arr.push(res.data)
            localStorage.setItem('songInfoData',JSON.stringify( arr))
            this.forceUpdate();

         }else {
          storage.push(res.data)
          localStorage.setItem("songInfoData",JSON.stringify(storage))
         }


     }else {
         message.info("请求歌手歌曲数据失败,请重新尝试")
     }
 } )
}

  handlePagination=(current,size)=>{
    //出发分页后的数据
    getPlayListCommentData(this.search,size,current).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.playlistCommentDataFunc(res.data);
        }
      }catch(err){
        console.log('错误为:'+err)
      }
    } )
  }

  render() {
    //playlisy路由的数据 
    // console.log(this.props.playlistData);
    //playlist评论数据
    // console.log(this.props.playlistCommentData)
    const playlist = this.props.playlistData?this.props.playlistData.playlist:{};
    const realPlaylist = formatPlaylistData(playlist?playlist:{});
    const tags = realPlaylist.tags?realPlaylist.tags:[];
    const renderTags = tags.map( (item,index)=>{
        return (
          <Tag key={item}>{item}</Tag>
        )
    } )
    const introduction = realPlaylist.description?realPlaylist.description:"";
    const renderIntroduction = introduction.replace(/\n/gi,"<br />")
    // console.log(realPlaylist) 
    return (
      <div className='playlist'>
          <div className='playlist-header' style={{ backgroundColor:"#242424" }}>
              <Header />
          </div>
          <MusicPlay />
          <div className='playlist-content' style={{ marginTop:"30px",backgroundColor:"#f5f5f5",minWidth:"992px" }}>
              <Col span={4}></Col>
              {/* //playlist内容 */}
              <Col style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3" }} span={16}>
                  <Row>
                      {/* //内容左侧 */}
                      <Col span={17} style={{ borderRight:"1px solid #E6E6E6" }}>
                          <div className='playlist-content-description' style={{ padding:"47px 30px 40px 39px" }}> 
                              <Row gutter={20}>
                                  <Col span={7}>
                                      <img style={{ width:"100%",height:"100%",padding:"3px",border:" 1px solid #EAEAEA" }} src={realPlaylist.coverImgUrl}  alt="" />
                                  </Col>
                                  <Col span={17}>
                                  {
                                    realPlaylist.name?
                                    <div className='playlist-content-description-title' style={{ marginBottom:"10px" }}>
                                        <span className='playlist-icon'></span>
                                        <span style={{ fontSize:"20px",color:"#000",fontWeight:"normal" }}>{realPlaylist.name}</span>
                                    </div>:null
                                  }

                                  {
                                    realPlaylist.creator&&realPlaylist.createTime?
                                    <div className='playlist-content-description-creator' style={{ marginBottom:"20px" }}>
                                        <img style={{ width:"35px",height:"35px",verticalAlign:"middle",marginRight:"10px" }} src={realPlaylist.creator?realPlaylist.creator.avatarUrl:""} alt="" />
                                        <Link style={{ fontSize:"12px" }} to={ `/user/home?id=${realPlaylist.creator?realPlaylist.creator.userId:''} ` }>{realPlaylist.creator?realPlaylist.creator.nickname:""}</Link>
                                        <span style={{ marginLeft:"20px",color:"#9D9D9D" }}>{realPlaylist.createTime?formatPlaylistPublishTime(realPlaylist.createTime):""} 创建</span>
                                    </div>:null
                                  }
                                  
                                   {
                                     realPlaylist.shareCount&&realPlaylist.commentCount?
                                          <div style={{ marginBottom:"20px" }} className='playlist-content-description-menu'>
                                          <Row gutter={10} style={{ minWidth:"430px"  }}>
                                                  <Col span={6} >
                                                      <span className='menu-player-bg' style={{ cursor:"pointer" }}>
                                                          <span className='menu-player-bgLeft'>
                                                              <Icon type="right-circle" style={{ color:"#fff",marginLeft:"5px",fontSize:"16px",fontWeight:"bold",verticalAlign:"middle" }} />
                                                              <span style={{ color:"#fff",fontSize:"12px",fontWeight:"bold",marginLeft:"5px",verticalAlign:"middle" }}>播放</span>
                                                          </span>
                                                          <span className='menu-player-bgRight'></span>
                                                      </span>
                                                      <span className='add'>

                                                      </span>
                                                  </Col>
                                                  <Col span={4} className='menu-player-store' >
                                                      <span style={{ fontSize:"8px" }}  className='menu-player-storeLogo'>{`${realPlaylist.subscribedCount?realPlaylist.subscribedCount:""}`}</span>

                                                      <i className='menu-player-store-bgRight'></i>
                                                  </Col>
                                                  <Col span={4} className='menu-player-store'>
                                                      <span style={{ backgroundPosition:"0 -1225px" }} className='menu-player-storeLogo'>{realPlaylist.shareCount?realPlaylist.shareCount:""}</span>
                                                      <i className='menu-player-store-bgRight'></i>
                                                  </Col>
                                                  <Col span={4} className='menu-player-store'>
                                                      <span style={{ backgroundPosition:"0 -2761px" }}  className='menu-player-storeLogo'>下载 </span>
                                                      <i className='menu-player-store-bgRight'></i>
                                                  </Col>
                                                  <Col span={6} className='menu-player-store'>
                                                      <span style={{ backgroundPosition:"0 -1465px" }}  className='menu-player-storeLogo'>{realPlaylist.commentCount?realPlaylist.commentCount:""}</span>
                                                      <i className='menu-player-store-bgRight'></i>
                                                  </Col>
                                            </Row>
                                          
                                    </div>
                                      :null
                                   } 
                                   {
                                     renderTags?
                                     <div className='playlist-content-description-tags'>
                                      <span style={{ marginRight:"15px" }}>标签:</span>
                                      {
                                        renderTags
                                      }
                                  </div>:null
                                   }  
                                  
                                  {
                                    renderIntroduction?
                                    <div className='playlist-content-description-introduction' style={{ fontSize:"12px",marginTop:"15px" }}>
                                      <span>介绍:</span>
                                      <span dangerouslySetInnerHTML={{ __html:renderIntroduction }}></span>
                                      
                                  </div>
                                  :null
                                  }
                                  
                                  


                                  </Col>
                              </Row>
                              <Row>
                                  <div className='playlist-content-songlist' style={{marginTop:"20px" }}>
                                        <SongList  tracks={ realPlaylist.tracks } playCount={realPlaylist.playCount}  startPlaySong={ (id)=>this.startPlaySong(id) } />
                                  </div>
                                  <div className='playlist-content-ownComment'>
                                      <OwnComment commentCount={realPlaylist.commentCount} />
                                  </div>
                                  <div className='playlist-content-hotComment'>
                                    <HotComment hotComment = {this.props.playlistCommentData.hotComments||[]} />
                                  </div>
                                  <div className='playlist-content-newComment'>
                                     <NewComment comments={this.props.playlistCommentData.comments ||[]} total={this.props.playlistCommentData.total} handlePagination={(current,size)=>this.handlePagination(current,size)}/>
                                  </div>
                              </Row>
                          </div>
                      
                      
                      
                      </Col>
                      {/* {内容右侧} */}
                      <Col span={7} style={{ padding:"20px",minWidth:"250px" }}>
                          <div className='like-playlist-person'>
                              <LikePlaylistPerson  subscribers={realPlaylist.subscribers?realPlaylist.subscribers:null}/>
                          </div>
                          <div className='hot-playlist-like'>
                              <HotPlaylistLike  hotPlaylistData={this.props.hotPlaylistData}/>
                          </div>
                          <div className='multiple-download'>
                                <MultipleDownload />
                          </div>
                      </Col>
                  </Row>
                  
              
              </Col>


              <Col span={4}></Col>
          </div>
           
      </div>
    )
  }
}
export default PlayList