import React, { Component } from 'react'
import Header from '../../common/header'
import Footer from '../../common/footer'
import { Row,Col,Tabs,message } from 'antd'
import 'antd/dist/antd.css'

import { getSingerSongs, getSongUrlData,getSongData,getSingerAlbums,getSingerMvs,getSingerDesc } from '../../api';
import HotWorks from './hotWorks';
import docCookies from '../../api/docCookies';
import MusicPlay from '../../common/MusicPlay';
import AllAlbum from './allAlbum';
import Mvs from './mvs';
import Des from './des';
import MultipleDownload from '../playlist/MultipleDownload'
 class Artist extends Component {

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

                }else {
                 storage.push(res.data)
                 localStorage.setItem("songInfoData",JSON.stringify(storage))
                }
                this.forceUpdate();

            }else {
                message.info("请求歌手歌曲数据失败,请重新尝试")
            }
        } )

    }
    componentDidMount(){
        this.search = this.props.location.search;
        this.id = this.search.replace("?id=","");
        //获取歌手热门作品数据
        getSingerSongs(this.id).then( (res)=>{
            if(res.data.code===200) {
                this.props.singerSongsDataFunc(res.data)
            }else {
                console.log("请求数据错误")
            }
        } )
        //获取歌手所有专辑数据
        getSingerAlbums(this.id).then( (res)=>{
            if(res.data.code===200) {
                this.props.singerAlbumsDataFunc(res.data)
            }else{
                console.log("请求数据错误")
            }
            
        } )
        //获取歌手所有MV相关数据
        getSingerMvs(this.id).then( (res)=>{
            if(res.data.code===200) {
                this.props.singerMvsDataFunc(res.data)
            }else {
                console.log("请求数据错误")
            }
        } )
        //获取歌手介绍
        getSingerDesc(this.id).then( (res)=>{
            if(res.data.code===200) {
                this.props.singerDesDataFunc(res.data)
            }else {
                console.log("请求书错误")
            }
        } )
    }

  render() {
    const singerSongsData = this.props.singerSongsData;
    const singerAlbumsData = this.props.singerAlbumsData;
    const singerMvsData = this.props.singerMvsData;
    const singerDesData = this.props.singerDesData;
    const artist = singerSongsData.artist;
    // console.log(artist)

    return (
      <div className='artist'>
         <div className="artist-header" style={{ backgroundColor:"#242424" }}><Header /></div>
        <MusicPlay />
        <div className='artist-content' style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1200px" }}>
            <Row>
                <Col span={4}></Col>
                <Col span={16} style={{ backgroundColor:"#fff",padding:"30px",border:"1px solid #D3D3D3",borderTop:"none"  }}>
                    <Row gutter={10}>
                    {/* 内容左侧 */}
                        <Col span={17}>
                            <div>
                                <span style={{ fontSize:"25px",color:"#000",marginRight:"20px" }}>
                                    {artist&&artist.name}
                                </span>
                                <span>{artist&&artist.alias.map( (item,index,arr)=>{
                                    return <span>{item}{index===arr.length-1?"":"/"}</span>
                                } )}</span>
                            </div>
                            <div style={{ width:"600px",height:"300px",marginTop:"10px" }}>
                                <img style={{ width:"600px",height:"300px",border:"1px solid #B7B7BF" }} src={artist&&artist.picUrl} />
                            </div>
                            <div className='artist-tabList'>
                                <Tabs >
                                    <Tabs.TabPane tab="热门作品" key="1">
                                        <HotWorks  hotSongs={ singerSongsData&&singerSongsData.hotSongs||{} } startPlaySong={(id)=>this.startPlaySong(id)}   />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="所有专辑" key="2">
                                        <AllAlbum  hotAlbums={ singerAlbumsData&&singerAlbumsData.hotAlbums||{} } />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="相关MV" key="3">
                                        <Mvs   singerMvsData={singerMvsData&&singerMvsData.mvs||{}} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="艺人介绍" key="4">
                                        <Des singerDesData={this.props.singerDesData}/>
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Col>
                        {/* //内容右侧 */}
                        <Col span={7}>
                                <MultipleDownload />
                        </Col>
                    </Row>
                </Col>
                <Col span={4}></Col>
            </Row>
        
        </div>


         <div className='artist-footer'><Footer /></div>
      </div>
    )
  }
}
export default Artist