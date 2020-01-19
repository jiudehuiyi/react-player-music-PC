import React, { Component } from 'react'
import { Row,Col,Icon,Button,message } from 'antd';
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import Header from '../../common/header'
import Footer from '../../common/footer'
import { allPlaylistData, toplistData,toplistCommentData,getSongUrlData,getSongData } from '../../api';
import { formatMonthDate } from '../../api/formatData';
import SongList from './songList'
import HotComment from '../playlist/hotComment';
import NewComment from '../playlist/newComment';
import OwnComment from '../playlist/ownComment';
import MusicPlay from '../../common/MusicPlay';
import docCookies from '../../api/docCookies';

 class DiscoverToplist extends Component {
    constructor(props){
        super(props);
        this.state={
            updateFrequency:"每天更新",//由于数据接口中没有这项数据(列表),所以只能用列表中的数据(内容)
        }
    }


    componentDidMount(){
          this.search = this.props.location.search;
          if(!this.search) {
              this.props.history.push("/discover/toplist?id=19723756");
          }
        //获取所有榜单(列表)数据
        allPlaylistData().then( (res)=>{
            try {
                if(res.data.code===200) {
                    this.props.allPlaylistDataFunc(res.data)
                }
            }catch(err){
                console.log("错误为:"+err)
            }
        } ).catch( (error)=>{
            console.log("错误为:",error);
        } )
        //开始播放歌曲
        //获取所有榜单(内容)数据
        toplistData(this.search).then( (res)=>{
            try{
                if(res.data.code === 200 ){
                    this.props.toplistContentDataFunc(res.data)
                }
            }catch(err){
                console.log("错误为："+err)
            }
        } ).catch( (error)=>{
            console.log("错误为:",error);
        } )

        toplistCommentData(this.search,20,1).then( (res)=>{
            try{
                if(res.data.code === 200 ){
                    this.props.toplistCommentDataFunc(res.data)
                }
            }catch(err){
                console.log("错误为："+err)
            }
        } ).catch( (error)=>{
            console.log("错误为:",error);
        } )
        
    }
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
    //点击榜单,获取对应的数据
    refreshToplistData(id,updateFrequency){
        this.setState({
            updateFrequency:updateFrequency
        })
        const search = `?id=${id}`;
        //更新榜单(内容)数据
          toplistData(search).then( (res)=>{
            try{
                if(res.data.code === 200 ){
                    this.props.toplistContentDataFunc(res.data)
                }
            }catch(err){
                console.log("错误为："+err)
            }
        } )
    }

    //处理分页
    handlePagination=(current,size)=>{
        toplistCommentData(this.search,size,current).then( (res)=>{
            try{
                if(res.data.code === 200 ){
                    this.props.toplistCommentDataFunc(res.data)
                }
            }catch(err){
                console.log("错误为："+err)
            }
        } )
    }

  render() {
      //榜单列表数据
    const topList = this.props.allPlaylistData.list || [];
    const cloudToplist = topList.slice(0,4);
    const globalToplist = topList.slice(5,topList.length-1);
    //榜单内容数据
    const toplistContentData = this.props.toplistContentData.playlist||[];
    // console.log(toplistContentData)
    //评论数据
    const toplistCommentData = this.props.toplistCommentData||{};
    //热门评论
    const toplistHotCommentData = toplistCommentData.hotComments || []; 
    //最新评论
    const toplistNewCommentData = toplistCommentData.comments ||[];
    // console.log(toplistNewCommentData);
    // console.log(toplistHotCommentData)
    //渲染云音乐特色榜
    const renderCloudToplist = cloudToplist.map( (item,index)=>{
        return (
          <Link key={item.coverImgUrl} to={`/discover/toplist?id=${item.id}`} onClick={ ()=>this.refreshToplistData(item.id,item.updateFrequency) } >
             <Row gutter={10} style={{ marginLeft:"0px",height:"60px",lineHeight:"60px",paddingtop:"5px",paddingBottom:"5px",backgroundColor:this.props.location.search===`?id=${item.id}`?"#E6E6E6":"" }}>
                <Col style={{ paddingLeft:"10px" }} span={6}>
                    <img style={{ width:"40px",height:"40px" }} src={item.coverImgUrl} />
                </Col>
                <Col span={16}>
                    <div style={{ fontSize:"12px",color:"#000",lineHeight:"20px",marginTop:"10px" }}>{item.name}</div>
                    <div style={{ color:"#999999",lineHeight:"20px",marginTop:"5px",fontSize:"12px" }} ref={ (duration)=>this.updateFrequency=duration }>{item.updateFrequency}</div>
                </Col>
             </Row>           
          </Link>  

        )
    } )
    //渲染全球媒体榜
    const renderGlobalToplist = globalToplist.map( (item,index)=>{
        return (
          <Link key={item.coverImgUrl} to={`/discover/toplist?id=${item.id}`}  onClick={ ()=>this.refreshToplistData(item.id,item.updateFrequency) }>
             <Row gutter={10} style={{ marginLeft:"0px",height:"60px",lineHeight:"60px",paddingtop:"5px",paddingBottom:"5px",backgroundColor:this.props.location.search===`?id=${item.id}`?"#E6E6E6":"" }}>
                <Col style={{ paddingLeft:"10px" }} span={6}>
                    <img style={{ width:"40px",height:"40px" }} src={item.coverImgUrl} />
                </Col>
                <Col span={16}>
                    <div style={{ fontSize:"12px",color:"#000",lineHeight:"20px",marginTop:"10px" }}>{item.name}</div>
                    <div style={{ color:"#999999",lineHeight:"20px",marginTop:"5px",fontSize:"12px" }}>{item.updateFrequency}</div>
                </Col>
             </Row>           
          </Link>  

        )
    } )
    

    return (
      <div className='discover-toplist'>
        <div className='discover-toplist-header' style={{ backgroundColor:"#242424" }}>
            <Header />
        </div>
        <MusicPlay />
        <div className='discover-toplist-content' style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1300px" }}>
            <Row>
                <Col span={4}></Col>

                <Col span={16}  style={{ border:"1px solid #D3D3D3" }}>
                     <Row>
                         {/* //内容左侧 */}
                         <Col span={6}>
                             <div className='cloud-music-toplist' style={{marginTop:"40px",marginBottom:"20px"  }}>
                                <div className='cloud-music-toplist-title' style={{ marginLeft:"20px" ,color:"#454545",fontSize:"16px",paddingBottom:"15px" }}>
                                    云音乐特色榜
                                </div>
                                <div className='cloud-music-toplist-list'>
                                   {
                                       renderCloudToplist
                                   }
                                </div>
                            </div>
                            <div className='global-media-toplist'>
                                 <div className='cloud-music-toplist-title' style={{marginLeft:"20px" , color:"#454545",fontSize:"16px",paddingBottom:"15px" }}>
                                    全球媒体榜
                                </div>
                                <div className='global-toplist-list'>
                                    {
                                        renderGlobalToplist
                                    }
                                </div>
                            </div>
                         </Col>
                            




                         {/* //内容右侧 */}
                         <Col span={18}>
                            <div className='toplist-contentRight' style={{ paddingLeft:"20px",paddingRight:"10px",borderLeft:"1px solid #DCDCDC",paddingBottom:"150px" }}>
                                <div className='toplist-contentRight-header' style={{ marginTop:"30px" }}>
                                    <Row>
                                         <Col span={6}>
                                            <img 
                                                style={{ width:"150px",height:"150px",padding:"2px",border:"1px solid #CCCCCC" }} 
                                                src={toplistContentData.coverImgUrl} alt="" />
                                         </Col>
                                         <Col span={18}>
                                            <div style={{ fontSize:"20px",color:"#000",marginTop:"10px" }} >{toplistContentData.name}</div>
                                            <div style={{ marginTop:"10px" }}>
                                                <Icon type="clock-circle" theme="twoTone" style={{  marginRight:"5px",textAlign:"middle" }} />
                                                <span style={{ fontSize:"12px",marginRight:"5px" }}>最近更新: </span>
                                                <span>{formatMonthDate(toplistContentData.trackUpdateTime)}</span>
                                                <span>( {this.state.updateFrequency} )</span>
                                            </div>
                                            <div className='toplist-menu' style={{ marginTop:"30px" }}>
                                                <Row gutter={5}  >
                                                    <Col style={{ display:"inline-block" }}>
                                                        <Button type='primary' style={{ verticalAlign:"bottom",padding:"3px" }}>
                                                            <Icon style={{ fontSize:"20px" }} type="right-circle" theme="twoTone" />
                                                            <span>播放</span>
                                                        </Button>
                                                        <Button type='primary' style={{ verticalAlign:"bottom",padding:"3px" }} >
                                                            <span style={{ fontSize:"20px" }}>+</span>
                                                        </Button>
                                                    </Col>
                                                    <Col  style={{ display:"inline-block" }}>
                                                        <Button type='primary' style={{ padding:"3px",verticalAlign:"bottom" }}>
                                                           <Icon style={{ fontSize:"20px" }} type="file-add" theme="twoTone" />
                                                            <span>({toplistContentData.subscribedCount})</span>
                                                        </Button>
                                                    </Col>
                                                    <Col style={{ display:"inline-block" }}>
                                                        <Button type='primary' style={{ verticalAlign:"bottom",padding:"3px" }}>
                                                            转发({toplistContentData.shareCount})
                                                        </Button>
                                                    </Col>
                                                    <Col style={{ display:"inline-block" }}>
                                                        <Button type='primary' style={{ verticalAlign:"bottom",padding:"3px" }}> 
                                                             <Icon type="download" />
                                                            <span>下载</span>
                                                        </Button>
                                                    </Col>
                                                    <Col style={{ display:"inline-block" }}>
                                                        <Button type='primary' style={{ verticalAlign:"bottom",padding:"3px" }}>
                                                            评论
                                                            <span>({toplistContentData.commentCount})</span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                         </Col>
                                    </Row>
                                    <Row>
                                        <div className='toplist-songlist'>
                                            <SongList  toplistContentData={toplistContentData||{}} startPlaySong={ (id)=>this.startPlaySong(id)  }/>
                                        </div>
                                        <div className='toplist-ownComment'>
                                            <OwnComment  commentCount={toplistCommentData.total}/>
                                        </div>
                                        {
                                            toplistNewCommentData.length>0?
                                            <div className='toplist-hotComment' style={{ marginTop:"30px" }}>
                                                  <HotComment  hotComment={toplistHotCommentData}/>
                                             </div>
                                             :null
                                        }
                                        {
                                          toplistNewCommentData.length>0?
                                          <div className='toplist-newComment'>
                                            <NewComment total={toplistCommentData.total} handlePagination={ (current,size)=>this.handlePagination(current,size) }  comments={toplistNewCommentData}/>
                                          </div>  
                                          :null
                                        }
                                        
                                    </Row>
                                </div>


                            </div>
                            
                         </Col>
                     </Row>
                </Col>

                
                <Col span={4}></Col>
            </Row>
        </div>


        <div className='discover-toplist-footer'>
            <Footer />
        </div>
      </div>
    )
  }
}
export default DiscoverToplist