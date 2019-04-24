import React, { Component } from 'react';
import { Row,Col,Spin,Icon,message } from 'antd';

import 'antd/dist/antd.css';

import { getAlbum,getAlbumComment,getSingerAlbum,getSongUrlData,getSongData  } from '../../api';
import Header from '../../common/header';
import SongList from './songList'
import './index.scss';
import AlbumComment from './ownComment'
import HotComment from './hotComment'
import NewComment from './newComment'
import LikeAlbumPerson from './likeAlbumPerson'
import MulPortLogin from './mulPortLogin'
import Footer from '../../common/footer'
import { formatAlbum,formatDate,formatForwardAndComment,formatSongInAlubm } from '../../api/formatData'
import MusicPlay from '../../common/MusicPlay';
import docCookies from '../../api/docCookies';

export default class Album extends Component {


    changeRenderNewComment=(current,size)=>{
        let search = this.props.location.search;
        // console.log(current);
        // console.log(size)
        //默认取20条
        //当改变页数时,重新请求数据,重新渲染数据
        getAlbumComment(search,size,current).then( (res)=>{
            // console.log(res.data)
            this.props.getAlbumCommentData(res.data)
        } )
    }

    componentDidMount(){
        //查询字符串,用来所要请求得数据
        let search = this.props.location.search;
        let artistId="";

        //请求专辑数据
        getAlbum(search).then( (res)=>{
            this.props.getAlbumData(res.data);
            artistId=res.data.album.artist.id;
            //请求其他专辑必须再这里请求,因为当请求完上面的数据后,如果再componentDidMount中的话是请求不了数据的,如果再componentUpdateMount的话则就会无限更新
            getSingerAlbum(artistId,5).then( (res)=>{
                this.props.getSingerOtherAlbum(res.data.hotAlbums);
            } )
        } );
        //请求专辑评论数据;
        getAlbumComment(search).then( (res)=>{
            // console.log(res.data)
            this.props.getAlbumCommentData(res.data);
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
                    docCookies.setItem("playing","PLAYING");
                    this.forceUpdate();
                 }else {
                  storage.push(res.data)
                  localStorage.setItem("songUrlData",JSON.stringify(storage))
                  docCookies.setItem("playing","PLAYING");
                  this.forceUpdate();
                 }
    
    
    
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
    

  render() {
      //专辑全部数据
    //   console.log( this.props.albumData )
    // console.log( formatAlbum(this.props.albumData) )
    //经过格式化专辑后得到的数据
    const realAlbumData = formatAlbum(this.props.albumData||{})||{};
    // console.log( realAlbumData )
    // console.log( realAlbumData.info )
    //获取出版时间戳
    const pushlishTime = realAlbumData.publishTime?realAlbumData.publishTime:null;
    //获取一个标准的时间
    const standardDate = pushlishTime?new Date(pushlishTime):null;
    //获取年份
    const fullYears = standardDate?standardDate.getFullYear():null;
    //获取月份
    const fullMonths = standardDate?formatDate(standardDate.getMonth()+1):null;
    //获取日
    const fullDate = standardDate?formatDate(standardDate.getDate()):null;
    // console.log( formatForwardAndComment(realAlbumData) )对评论数和转发数进行格式化
    const commentCount = formatForwardAndComment(realAlbumData)?formatForwardAndComment(realAlbumData).commentCount:null;
    const shareCount = formatForwardAndComment(realAlbumData)?formatForwardAndComment(realAlbumData).shareCount:null;
    //介绍数据
    const description = realAlbumData.description?realAlbumData.description:null;

    //格式化的某个专辑得到的专辑中歌曲数据
    const songInAlubmData = formatSongInAlubm (this.props.albumData.songs || []);
    return (
      <div className='album'>
   
        <div className='header' style={{ backgroundColor:"#242424",color:"#fff",marginBottom:"30px" }}>
            <Header />
        </div>
        <MusicPlay />
        <div className='content' style={{ minWidth:"1400px" }}>
        
            <Row gutter={30}>
                <Col span={3}></Col>
                <Col span={18} style={{ backgroundColor:'#fff',border:"2px solid #D3D3D3" }}>
                    <Row gutter={10}>
                        {/* //左侧 */}
                        <Col span={ 18 } style={{ borderRight:"2px solid #d3d3d3",padding: '47px 30px 40px 39px' }}>
                            <div className='album-header'>
                                <Row gutter={40}>
                                    <Col span={8} >
                                        {/* //检测realAlbumData.picUrl是否有，如果有则加载，没有则加载Spin组件 */}
                                        {
                                            realAlbumData.picUrl?
                                            <img src={ realAlbumData.picUrl } alt="" style={{ width:"177px",height:"177px" }} />
                                            :<Spin />
                                        }
                                        <span className='album-mask'></span>
                                    </Col>
                                    <Col span={16}>
                                        {
                                            realAlbumData.name?
                                            <div>
                                            <span className='album-logo'></span>
                                            <span className='album-name'>{realAlbumData.name}</span>
                                            </div>
                                            :null
                                        }

                                        {
                                            realAlbumData.artists?
                                            <div style={{ marginTop:"10px" }}>
                                                <span style={{ marginRight:"10px" }}>歌手:</span>
                                                <span style={{ color:"#0C73C2" }}>{realAlbumData.artists.slice(0,realAlbumData.artists.length-1)}</span>
                                            </div>
                                            :null
                                        }
                                        {
                                            pushlishTime?
                                            <div style={{ marginTop:"10px" }}>发行时间:<span style={{ marginLeft:"5px" }}>{`${fullYears}-${fullMonths}-${fullDate}`}</span></div>
                                            :null
                                        }
                                        {
                                            realAlbumData.company?
                                            <div style={{ marginBottom:"20px" }}>发行公司:<span>{realAlbumData.company}</span></div>
                                            :null
                                        }
                                        <Row gutter={20}>
                                            <Col span={6}>
                                                <span className='songPlay'><Icon style={{ fontSize:"14px",verticalAlign:"center",marginRight:"5px" }} type="play-circle" theme="twoTone" />播放</span>
                                                <span className='add'></span>
                                            </Col>
                                            <Col span={3}>
                                                <span className='Collection'><span className='collection-i'>收藏</span></span>
                                            </Col>
                                            <Col span={3}>
                                                <span 
                                                    className='Collection'
                                                    style={{ backgroundPosition:"0 -1225px" }}
                                                >
                                                <span className='collection-i'>({commentCount?commentCount:<Spin />})</span>
                                                </span>
                                            </Col>
                                            <Col span={3}>
                                                <span className='Collection'
                                                    style={{ backgroundPosition:"0 -2761px" }}
                                                >
                                                    <span className='collection-i'>下载</span>
                                                </span>
                                            </Col>
                                            <Col span={3}>
                                                <span 
                                                    className='Collection'
                                                    style={{ backgroundPosition:"0 -1465px" }}
                                                >
                                                <span className='collection-i'>({shareCount?shareCount:<Spin />})</span>
                                                </span>
                                            </Col>
                                            <Col span={6}>&nbsp;</Col>
                                            
                                        </Row>
                                        
                                    </Col>
                                    
                                </Row>
                                
                            </div>
                            <div className='album-description'>
                                <div className='album-introduction'>专辑介绍：</div>
                                <p className='album-detailDescription'>
                                    {description}
                                </p>
                            </div>
                            <div>
                                {/* //渲染专辑歌曲列表 */}
                                <SongList  songInAlubmData={ songInAlubmData } startPlaySong={ (id)=>this.startPlaySong(id) }  />
                                {/* //发表自己评论的组件 */}
                                <AlbumComment  data={this.props.albumCommentData}/>
                                {/* //渲染专辑热门评论 */}

                                <HotComment data={this.props.albumCommentData}/>
                                {/* //渲染最新评论 */}
                                <NewComment data={this.props.albumCommentData} changeRenderNewComment={ (current,size)=>this.changeRenderNewComment(current,size) } />
                            </div>
                        </Col>

                        {/* //右侧 */}
                        <Col span={ 6 } style={{paddingLeft:"20px",paddingRight:"20px",paddingTop:"20px" }}>
                        {/* //喜欢这张专辑的人没有这个接口,或者还没找到,等找到后再补上这个完整的组件,现在用默认头像代替一下 */}
                            <LikeAlbumPerson  singerOtherAlbum={this.props.singerOtherAlbum } />
                            <MulPortLogin />   
                        </Col>
                    </Row>
                </Col>
                <Col span={3}></Col>
            </Row>
        </div>
        <Footer />
      </div>
    )
  }
}
