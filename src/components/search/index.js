import React, { Component } from 'react';
import { Row,Col,message } from 'antd'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import Header from '../../common/header'
import Footer from '../../common/footer'
import { getSearchData,getSongUrlData,getSongData } from '../../api';

import SingerSong from './singerSong'
import Artists from './artists'
import Album from './album'
import Video from './video'
import docCookies from '../../api/docCookies'
import Lyrics from './lyrics';
import Playlist from './playlist'
import DjRadios from './djRadios'
import User from './user'
import MusicPlay from '../../common/MusicPlay';
class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            str:""
        }
    }
    handlePagination=(page,pageSize)=>{
        getSearchData(this.keyword,this.type,page,30).then( (res)=>{
            if(res.data.code===200) {
                this.props.searchDataFunc(res.data)
            }else {
                console.log("请求搜索数据失败")
            }
        } )
    }
    startPlaySongMain=(id)=>{
        // console.log(id)
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

    componentDidMount(){
        this.search = decodeURIComponent(this.props.location.search);
        this.search.replace("?","").split("&").map( (item,index)=>{
            // console.log(item)
            if(/^s=/.test(item)) {
                this.keyword = item.replace("s=","");
                
            }else if(/^type=/.test(item)){
                this.type=item.replace("type=","");
            }
        } );
        // console.log(this.keyword)
        if(this.keyword) {
            getSearchData(this.keyword,this.type).then( (res)=>{
                if(res.data.code===200) {
                    this.props.searchDataFunc(res.data)
                }else {
                    console.log("请求搜索数据失败")
                }
            } )
        }
        
    }

    render() {
        //s搜索得到的加过
        const searchData = this.props.searchData;
        // console.log(this.props.searchData)
      
        return (
            <div className='search'>
                <div className='search-header' style={{ backgroundColor:"#242424" }}><Header /></div>
                <MusicPlay />
                <div className='search-content' style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1200px" }}>
                    <Row>
                        <Col span={4}></Col>


                        <Col span={16} style={{ backgroundColor:"#fff",padding:"30px",border:"2px solid #D3D3D3",minWidth:"940px" }}>
                            {
                                (()=>{
                                    if(this.type==1){
                                      return  <SingerSong searchData={searchData} keyword={this.keyword} type={ this.type  }  handlePagination={ (page,pageSize)=>this.handlePagination(page,pageSize) } startPlaySongMain={(id)=>this.startPlaySongMain(id)} />
                                    }else if(this.type==100) {
                                      return  <Artists  searchData={searchData} keyword={this.keyword} type={ this.type  } />
                                    }else if(this.type==10) {
                                        return <Album  searchData={searchData} keyword={this.keyword} type={ this.type  }  handlePagination={ (page,pageSize)=>this.handlePagination(page,pageSize) } />
                                    }else if(this.type == 1014) {
                                        return <Video  searchData={searchData} keyword={this.keyword} type={ this.type  } handlePagination={ (page,pageSize)=>this.handlePagination(page,pageSize) }/>
                                    }else if(this.type==1006) {
                                        return <Lyrics  searchData={searchData} keyword={this.keyword} type={ this.type  } handlePagination={ (page,pageSize)=>this.handlePagination(page,pageSize) }  startPlaySongMain={(id)=>this.startPlaySongMain(id)}/>
                                    }else if(this.type==1000) {
                                        return <Playlist  searchData={searchData} keyword={this.keyword} type={ this.type  } handlePagination={ (page,pageSize)=>this.handlePagination(page,pageSize) } startPlaySongMain={(id)=>this.startPlaySongMain(id)}/>
                                    }else if(this.type==1009) {
                                        return <DjRadios  searchData={searchData} keyword={this.keyword} type={ this.type  } handlePagination={ (page,pageSize)=>this.handlePagination(page,pageSize) }/>
                                    }else if( this.type==1002 ) {
                                        return <User  searchData={searchData} keyword={this.keyword} type={ this.type  } handlePagination={ (page,pageSize)=>this.handlePagination(page,pageSize) }/>
                                    }
                                })()
                            }
                        </Col>


                        <Col span={4}></Col>
                    </Row>

                </div>


                <div className='search-footer'><Footer /></div>
            </div>
        );
    }
}

export default withRouter(Search);