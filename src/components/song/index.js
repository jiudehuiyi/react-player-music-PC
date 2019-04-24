import React, { Component } from 'react';
import { Row,Col,Icon,Button,Input,Pagination, message  } from 'antd';
import "antd/dist/antd.css";
import  { withRouter } from 'react-router'
import  Header from '../../common/header'
import Footer from '../../common/footer';
import Extend from './extend'
import NotExtend from './notExtend'
import './index.scss';
import { getSongData,getSongComment,getSongLyric,getSimilarSong,getSongUrlData } from '../../api';
import { formatSongData ,formatAlia,formatCommentNumber,formatSongLyricData,formatSimilarSong} from '../../api/formatSong'
import { formatHotCommentPublishTime } from '../../api/formatData'
import defaultAvatar from '../../assets/images/default_avatar.jpg';
import { formatHotComment } from '../../api/formatData';
import MulPortLogin from '../album/mulPortLogin';
import MusicPlay from '../../common/MusicPlay'
import docCookies from '../../api/docCookies';
 class Song extends Component {

    constructor(props){
        super(props);
        this.state={
            isExtend:false,//用于确定歌词是否展开
        }
    }

    itemRender=(current, type, originalElement)=>{
        if(type==='prev') {
            return <a>上一页</a>
        }if(type==='next') {
            return <a>下一页</a>
        }
        return originalElement
    }
   
    handleExtendLyric=(boo)=>{
        this.setState({
            isExtend:boo
        })
    }
    handleChange=(current,size)=>{
        // this.props.changeRenderNewComment(current,size);
        const searchStr = this.props.location.search.match(/\d+/gi).toString();
        getSongComment(searchStr,size,current).then( (res)=>{
            this.props.songCommentDataFunc(res.data)
        } )
    }
    //开始播放歌曲
    startPlaySong=(searchStr)=>{
        // console.log(searchStr);
        //请求歌曲播放地址
        // 传递一个歌曲id给MusicPlayer
        getSongUrlData(searchStr).then( (res)=>{
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
        getSongData(searchStr).then( (res)=>{
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

    componentDidMount(){
        //获取歌曲id
        const searchStr = this.props.location.search.match(/\d+/gi).toString();
        this.searchStr=searchStr;
        getSongData(searchStr).then( (res)=>{
            this.props.songDataFunc(res.data);
        } )
        //获得歌曲评论数据
        getSongComment(searchStr).then( (res)=>{
            this.props.songCommentDataFunc(res.data)
        } )
        //获取单曲歌词数据
        getSongLyric(searchStr).then(  (res)=>{
            this.props.songLyricDataFunc(res.data)
        } )
        //获取相似歌曲
        getSimilarSong(searchStr).then( (res)=>{
            this.props.similarSongFunc(res.data)
        } )
        
    }

  render() {
    //   console.log( formatSimilarSong(this.props.similarSongData ))
      //单曲部分数据this.props.songData
      const songData = this.props.songData.songs||[];
      //格式化后得数据
      const realSongData = formatSongData(songData);
      //实际渲染得数据
      const renderSongData = realSongData.length>0?realSongData[0]:{};
      //单曲评论数据
      const songCommentData = this.props.songCommentData;
      //对热门单曲评论进行格式化
      let songHotComments = formatHotComment(songCommentData.hotComments||[]);
      //对单曲新的评论惊醒格式化
      let songNewComment = formatHotComment(songCommentData.comments||[]);
      //相似歌曲数据
      const similarSongData = this.props.similarSongData;
      const realSimilarSongData = formatSimilarSong(similarSongData.songs || []);

      //格式化歌词
      const formatSongLyric = this.props.songLyricData.lrc && formatSongLyricData(this.props.songLyricData);
      const realSongLyric = formatSongLyric && formatSongLyric.lrc;
      const renderSongLyric = realSongLyric? realSongLyric.lyric:"";
      //去除时间和/n得格式化歌词
      const html = renderSongLyric && renderSongLyric.replace(/\[\d+:\d+\.\d+\]/gi,"").replace(/\n/gi,"<br />");
      const TextArea = Input.TextArea;
      //渲染歌曲热门评论
      const renderHotComment = songHotComments.map( (item,index,arr)=>{
        const str = item.content.replace(/\n/g,'<br />');
        //去除最后一条评论的borderbottom
        const showBorder = index === arr.length-1?false:true;
        const showStyle = showBorder?{borderBottom:"1px dashed #cccccc",paddingBottom:"20px",paddingTop:"10px"}:{paddingBottom:"20px",paddingTop:"10px"};
    return ( <div className='hotcomment-content' key={item.content} style={showStyle}>
        <Row gutter={20}>
            <Col span={2}><img width="50px" height="50px" src={ item.user.avatarUrl } alt="" /></Col>
            <Col span={22}>
            <span style={{ color:"#1679C5",fontSize:"12px" }}>{item.user.nickname} : </span>
                           {/* //对返回的数据中的/n进行替换，替换成<br/>标签 */}
            <span style={{ fontSize:"12px" }} dangerouslySetInnerHTML={{__html: str}}></span>
            </Col>
        </Row>  
        <Row>
            <Col span={2}></Col>
            <Col span={3} style={{ color:"#9D9D9D",fontSize:"12px" }}>{formatHotCommentPublishTime(item.time)}</Col>
            <Col span={13}></Col>
            <Col span={6}>
                <Icon type="like" theme="twoTone" style={{ fontSize:"16px",marginRight:"10px" }} />
                <span style={{ marginRight:"10px",cursor:"pointer" }}>({item.likedCount})</span>
                <span style={{ marginRight:"10px" }}>|</span>
                <span style={{ fontSize:"12px",cursor:"pointer" }}>回复</span>
            </Col>

        </Row>
    </div>)
    } )

    
        //渲染最新评论
        const renderNewComment =  songNewComment.length>0?songNewComment.map( (item,index,arr)=>{
    const str = item.content.replace(/\n/g,'<br />');
    //去除最后一条评论的borderbottom
    const showBorder = index === arr.length-1?false:true;
    const showStyle = showBorder?{borderBottom:"1px dashed #cccccc",paddingBottom:"20px",paddingTop:"10px"}:{paddingBottom:"20px",paddingTop:"10px"};
        return ( <div className='newcomment-content' key={item.content+index} style={showStyle}>
            <Row gutter={20}>
                <Col span={2}><img width="50px" height="50px" src={ item.user.avatarUrl } alt="" /></Col>
                <Col span={22}>
                <span style={{ color:"#1679C5",fontSize:"12px" }}>{item.user.nickname} : </span>
                            {/* //对返回的数据中的/n进行替换，替换成<br/>标签 */}
                <span style={{ fontSize:"12px" }} dangerouslySetInnerHTML={{__html: str}}></span>
                </Col>
             </Row>  
                <Row>
                    <Col span={2}></Col>
                    <Col span={3} style={{ color:"#9D9D9D",fontSize:"12px" }}>{formatHotCommentPublishTime(item.time)}</Col>
                    <Col span={15}></Col>
                    <Col span={4}>
                        <Icon type="like" theme="twoTone" style={{ fontSize:"16px",marginRight:"10px" }} />
                        <span style={{ marginRight:"10px",cursor:"pointer" }}>({item.likedCount})</span>
                        <span style={{ marginRight:"10px" }}>|</span>
                        <span style={{ fontSize:"12px",cursor:"pointer" }}>回复</span>
                    </Col>

                </Row>
            </div>)
            } ):null;
        //渲染相似歌曲数据
        const renderSimilarSongData = realSimilarSongData.map( (item,index)=>{
            const singerName = item.artists[0]
            return (
            <Row key={item.name} style={{ height:"32px",marginTop:"20px",marginBottom:"10px" }}>
                 <Col span={18}>
                     <div style={{ fontSize:"12px",color:"#333333" }}>{item.name}</div>
                     <div style={{ fontSize:"12px",color:"#A3A3A3" }}>{singerName.name}</div>
                  </Col>
                  <Col span={6} style={{ marginTop:"10px" }}>
                      <Icon type="caret-right" />
                      <Icon type="plus" /> 
                  </Col>
            </Row>                
            )
        } )
      return (
      <div className='song'>
            <div className='header'>
                 <Header />
            </div>
            <div>
                {/* 下面注释的代码如果加上再MusicPlay组件,在把上面的this.props.songSingerInfoFunc(res.data)，
                ,this.props.songUrlData(res.data)注释回来就可以了,上就使用reducer进行持久化(没在container,action，reducer)注释掉 */}
                {/* 不加就直接使用storage进行持久化 */}
            {/* songUrlData={  this.props.songUrlData } songSingerInfo={this.props.songSingerInfo} */}
                    {/* <MusicPlay   /> */}
            </div>
            <div className='song-content' style={ { marginTop:"30px",minWidth:"1430px" } }>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",borderTop:"none",paddingBottom:"90px" }}>
                        <Row>
                            {/* //内容左侧 */}
                            <Col style={{ borderRight:"1px solid #E6E6E6", }} span={17}>
                                <Row >
                                    <Col span={8}>
                                        <div className='song-logo'>
                                            <div className='song-logo-bg'></div>
                                            <div className='song-logo-img'>
                                                <img  src={renderSongData.al && renderSongData.al.picUrl} alt="" />
                                            </div>
                                        </div>
                                        <div className='exact-link'>
                                            <span className='exact-link-icon'></span>
                                            <span className='exact-link-font'>生成外链播放器</span>
                                        </div>
                                    </Col>



                                    <Col span={16} style={{paddingTop:"30px",paddingLeft:"20px"}}>
                                        <div className='song-content-rightHeader'>
                                            <span className='song-content-rightHeader-logo'></span>
                                            <span className='song-content-rightHeader-name'>{renderSongData.name}</span>
                                        </div>
                                            {
                                             renderSongData.alia && renderSongData.alia.length>0?
                                             <div style={{ marginLeft:"70px",color:"#CACACA",fontSize:"16px" }}>
                                                   {formatAlia(renderSongData.alia).slice(0,renderSongData.alia.length-2)}
                                             </div>
                                             :null   
                                            }


                                        <div className='song-content-singer'>
                                            <span style={{ fontSize:"12px" }}>歌手:</span>
                                            <span style={{ marginLeft:"5px",fontSize:"12px",color:"#2273C2" }}>{renderSongData.ar && renderSongData.ar[0].name}</span>
                                        </div>
                                        <div className='song-content-belongAlbum'>
                                            <span style={{ fontSize:"12px" }}>所属专辑:</span>
                                            <span style={{marginLeft:"5px",fontSize:"12px",color:"#2273C2"  }}>{renderSongData.al && renderSongData.al.name}</span>
                                        </div>
                                        <div className='cong-content-menu' style={{ marginTop:"10px",minWidth:"420px" }}>
                                            <Row gutter={10}>
                                                <Col span={6} >
                                                    <span className='menu-player-bg' style={{ cursor:"pointer" }}>
                                                        <span className='menu-player-bgLeft' onClick={ ()=>this.startPlaySong(this.searchStr) }>
                                                            <Icon type="right-circle" style={{ color:"#fff",marginLeft:"5px",fontSize:"16px",fontWeight:"bold",verticalAlign:"middle" }} />
                                                            <span style={{ color:"#fff",fontSize:"12px",fontWeight:"bold",marginLeft:"5px",verticalAlign:"middle" }}>播放</span>
                                                        </span>
                                                        <span className='menu-player-bgRight'></span>
                                                    </span>
                                                    <span className='add'>

                                                    </span>
                                                </Col>
                                                <Col span={4} className='menu-player-store'>
                                                    <span className='menu-player-storeLogo'>收藏 </span>
                                                    <i className='menu-player-store-bgRight'></i>
                                                </Col>
                                                <Col span={4} className='menu-player-store'>
                                                    <span style={{ backgroundPosition:"0 -1225px" }} className='menu-player-storeLogo'>分享 </span>
                                                    <i className='menu-player-store-bgRight'></i>
                                                </Col>
                                                <Col span={4} className='menu-player-store'>
                                                    <span style={{ backgroundPosition:"0 -2761px" }}  className='menu-player-storeLogo'>下载 </span>
                                                    <i className='menu-player-store-bgRight'></i>
                                                </Col>
                                                <Col span={6} className='menu-player-store'>
                                                    <span style={{ backgroundPosition:"0 -1465px" }}  className='menu-player-storeLogo'>{`评论(${formatCommentNumber(songCommentData.total)}) `}</span>
                                                    <i className='menu-player-store-bgRight'></i>
                                                </Col>
                                            </Row>
                                         </div>

                                         
                                         {
                                             this.state.isExtend?
                                             <Extend html={html} handleExtendLyric={(boo)=>this.handleExtendLyric(boo)} />:
                                             <NotExtend html={html} handleExtendLyric={(boo)=>this.handleExtendLyric(boo)}/>
                                         }
                                        <div style={{ float:"right" }}>报错</div>    

                                    </Col>
                                            
                                </Row>                            
                            
                                <Row>
                                    <div className='ownComment-header' style={{ marginLeft:"50px",marginTop:"40px" }}>
                                        <span 
                                            style={{ color:"#4C4C4C",fontSize:"20px",marginRight:"20px" }}
                                        >评论</span>
                                        <span
                                            style={{ color:"#6F6F6F",fontSize:"14px" }}
                                        >共{songCommentData.total}条评论</span>
                                    </div>
                                </Row>
                                <div className='ownComment-content' style={{ marginLeft:"50px" }}>
                                    <Row style={{ marginBottom:"10px" }}>
                                        <Col span={2}>
                                            <img src={defaultAvatar} width="50px" height="50px" alt="" />
                                        </Col>
                                        <Col span={22} style={{ position:"relative" }}>
                                            <TextArea rows={4}   placeholder="评论" style={{ resize:"none" }}/>
                                            <span className='circle'>&nbsp;</span>
                                            <span className='circle-mask'>&nbsp;</span>
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom:"30px" }} gutter={10}>
                                        <Col span={2}></Col>
                                        <Col span={1}>
                                        <Icon type="smile" style={{ color:"#9D9D9D",fontSize:"20px",cursor:"pointer" }} />
                                        </Col>
                                        <Col span={1}>
                                            <span className='aite'></span>
                                        </Col>
                                        <Col span={17}></Col>
                                        <Col span={1} style={{ marginInline:"-80px" }}>140</Col>
                                        <Col span={2} style={{ marginLeft:"-35px" }}><Button type='primary'>评论</Button></Col>
                                    </Row>
              
                                 </div>
                                <div style={{ marginLeft:"40px" }}>
                                    {
                                        songHotComments.length>0?
                                        <div className='hotcomment'>
                                            <div className='hotcomment-title'>
                                                <div>精彩评论</div>
                                            </div> 
                                        {renderHotComment}
                                        </div>
                                        :null
                                    }
                                  </div> 
                                <div>
                                    {
                                        songNewComment.length>0?
                                        <div className='newComment' style={{ marginLeft:"40px" }}>
                                            <div className='newComment-title' style={{ borderBottom:"1px dashed #CFCFCF",paddingBottom:"10px" }}>
                                                <span style={{ color:"#000",fontSize:"12px",fontWeight:"bold" }}>最新评论</span>
                                                <span style={{ color:"#000",fontSize:"12px",fontWeight:"bold" }}>({songCommentData.total})</span>
                                            </div>
                                            {
                                                renderNewComment
                                            }

                                            <div style={{ marginTop:"40px" }}>
                                                <Row>
                                                    <Col span={4}></Col>
                                                    <Pagination
                                                    total={songCommentData.total} defaultPageSize={20} 
                                                    itemRender={(current, type, originalElement)=>this.itemRender(current, type, originalElement)}
                                                    onChange={ (current,size)=>this.handleChange(current,size) }
                                                    />
                            
                                                </Row>
                                            </div>
                                        </div>:
                                        null
                                        
                                    }
                                </div>
                         
                                    
                            </Col>




                            {/* //内容右侧 */}
                            <Col span={7}  style={{ paddingLeft:"20px",paddingRight:"20px",minWidth:"270px" }}>
                                <div className='song-content-right'  >

                                    {
                                        realSimilarSongData.length>0?
                                        <div>
                                            <div className='song-content-right-similarSong' style={{ paddingBottom:"10px",marginTop:"30px",borderBottom:"1px solid #CCCCCC" }}>
                                              <span style={{ fontSize:"12px",fontWeight:"bold" }}>相似歌曲</span>
                                            </div>
                                            <div className='song-content-right-similarSong-list'>
                                                {
                                                    renderSimilarSongData
                                                }
                                                
                                            </div>
                                        </div>
                                        :null
                                    }
                                   
                                </div>
                                <div  >
                                    <MulPortLogin />
                                </div>
                            </Col>
                        </Row>




                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
            <div>
                <Footer />
            </div>
      </div>
    )
  }
}
export default withRouter(Song)