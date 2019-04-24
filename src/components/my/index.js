import React, { Component } from 'react';
import  axios from 'axios';
import NotLogin from './notLogin'
import LoginMyPlaylist from './loginMyPlaylist';
import docCookies from '../../api/docCookies';
import MusicPlay from '../../common/MusicPlay';
import { message } from 'antd'
import 'antd/dist/antd.css'
import { getSongUrlData,getSongData } from '../../api';
class My extends Component {

    constructor(props){
        super(props);
        this.state={
        }
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

    changePane=(index)=>{
        axios.get("http://localhost:3000/login/status").then( (res)=>{
            // console.log(res.data)
            this.props.getLoginStatusFunc(res.data);
            if(res.data.code===200) {
                axios.get(`http://localhost:3000/user/playlist?uid=${res.data.profile.userId}`).then( (res)=>{
                    // console.log(res.data)
                    this.props.getLoginPlaylistInfoFunc(res.data)
                    if(res.data.code===200) {
                        axios.get(`http://localhost:3000/playlist/detail?id=${res.data.playlist[index].id}`).then( (res)=>{
                            this.props.getLoginPlaylistContentFunc(res.data)
                        } )
                    }
                } )
            }

            
        } )
    }

componentDidMount(){
    // axios.get("http://localhost:3000/login/status").then( (res)=>{
    //     this.setState({
    //         loginStatus:res.data.code,
    //     })
    //     if(res.data.code) {
    //         this.userId = res.data.profile.userId;
    //         console.log( this.userId )
    //     }

    // } ).catch( (error)=>{
    //     if(error.response){
    //         this.setState({
    //             loginStatus:error.response.status
    //         })
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         console.log(error.request);
    //       } else {
    //         console.log('Error', error.message);
    //       }
    // } )
    // axios.get("http://localhost:3000/login/refresh")
     this.csrf = docCookies.getItem("__csrf");
    //  console.log(this.csrf)
     axios.get("http://localhost:3000/login/refresh")

    if(this.csrf) {
        axios.get("http://localhost:3000/login/status").then( (res)=>{
            // console.log(res.data)
            this.props.getLoginStatusFunc(res.data);
            if(res.data.code===200) {
                axios.get(`http://localhost:3000/user/playlist?uid=${res.data.profile.userId}`).then( (res)=>{
                    // console.log(res.data)
                    this.props.getLoginPlaylistInfoFunc(res.data)
                    if(res.data.code===200) {
                        axios.get(`http://localhost:3000/playlist/detail?id=${res.data.playlist[0].id}`).then( (res)=>{
                            this.props.getLoginPlaylistContentFunc(res.data)
                        } )
                    }
                } )
            }

            
        } )
    }else {
    }
}

    render() {
        // console.log(this.props.getLoginPlaylistContent)
        // console.log(this.props.getLoginPlaylistInfo)
        let csrf=docCookies.getItem("__csrf");
        return (
            <div className='my'>
              <MusicPlay />
                {
                    csrf
                    ?<LoginMyPlaylist  getLoginPlaylistInfo={this.props.getLoginPlaylistInfo} getLoginPlaylistContent={this.props.getLoginPlaylistContent}  startPlaySong={(id)=>this.startPlaySong(id)}   changePane={ (index)=>this.changePane(index) } />
                    :<NotLogin />
                }
            </div>
        );
    }
}

export default My;