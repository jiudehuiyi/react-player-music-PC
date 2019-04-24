//播放音乐的组件

import React, { Component } from 'react';
import { Row,Col,Icon,Slider, message,Dropdown,Menu,Modal } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import docCookies from '../../api/docCookies';
import PlayTime from './playTime'
import Sound from 'react-sound';
import { getSongPlayerTime, } from '../../api/formatData';
import './index.scss'
import { getSongUrlData,getSongData } from '../../api';

class MusicPlay extends Component {

    constructor(props){
        super(props);
        
        this.state={
            position:"00.00",
            duration:"00.00",
            sliderValue:0,
            audioPosition:0,
            noVolume:false,//声音状态
            volume:50,
            songIndex:"",
            showVolumeSlider:false,
            rateFont:1.00,
            //单曲循环(singleLoop),循环(songsLoop),随机(songsRandom)
            songMode:"singerLoop",
            modalVisible:false,
        }
        // 如果有些音频插件时用true或者false去确定播放状态,并且是用cookie去储存全局变量的时候,必须用JSON.parse去取得对应的布尔值
        docCookies.setItem("playing","STOPPED");
    }

    //点击播放的时候触发的函数
    playing=()=>{
        docCookies.setItem("playing","PLAYING");
        this.forceUpdate()
    }
    //点击暂停按钮的时候出发的函数
    pause=()=>{
        docCookies.setItem("playing","PAUSED")
        this.forceUpdate()
    }
    //当音乐播放完毕触发的函数
    mediaPlayingFinish=()=>{
        docCookies.setItem("playing","STOPPED");
        this.setState({
            position:"00.00",
            duration:"00.00",
            sliderValue:0
           
        })
        this.forceUpdate()
    }
    //音频加载失败触发的函数
    handleError=(errorCode,description)=>{
        message.info("音频加载失败,请重新尝试");
        docCookies.setItem("playing","PAUSED")
    }
  
    
    
   componentDidMount(){
    docCookies.getItem("playing")
   }
    //当音乐播放时触发的函数
   mediaPlaying=({position,duration})=>{
        let sliderPosition = position;
        let durationPosition = duration;
        this.changeAudioPosition = duration;
        //改变歌曲进行时间
        let min = Math.floor(position/1000/60);
        let sec = Math.floor(position/1000%60);
        min = min<10?`0${min}`:min;
        sec = sec<10?`0${sec}`:sec;
        let durMin = Math.floor(duration/1000/60);
        let durSec = Math.floor(duration/1000%60);
        durMin = durMin<10?`0${durMin}`:durMin;
        durSec = durSec<10?`0${durSec}`:durSec;
        position = `${min}:${sec}`;
        duration = `${durMin}:${durSec}`;
        //改变歌曲进度条
         let sliderValue = Math.floor(sliderPosition/durationPosition*100);
        this.setState({
            position:position,
            duration:duration,
            sliderValue:sliderValue,//进度条的值
            audioPosition:sliderPosition,//音频播放位置的值
        })
   }
   //改变(拖动)进度条,去改变audioPosition(音频的播放位置),再由mediaPlaying重新触发音乐的播放
   handleSliderChange=(value)=>{
      
        this.changeAudioPosition
        let changeValue = (value/100)*this.changeAudioPosition;
        this.setState({
            audioPosition:changeValue
        })
   }
   //resumeVolume
   resumeVolume=()=>{
       this.setState({
            noVolume:false,
            volume:this.beforeVolume,
       })
   }
   //noVolume
   noVolumeFunc=()=>{
       //在静音之前保存之前的音量,以用于恢复音量的时候使用
       this.beforeVolume = this.state.volume;
       this.setState({
         noVolume:true,
         volume:0
       })
   }

  

   handleMouseOver=()=>{
        this.setState({
            showVolumeSlider:true
        })
   }
   handleMouseOut=()=>{
        this.setState({
            showVolumeSlider:false
        })
   }

   handleVolumeChange=(value,)=>{
    this.setState({
        volume:value
       })
   }
   //改变播放速率
   changePlayRate=(rate)=>{
        this.setState({
            rateFont:rate
        })
    }
    //改变播放模式
    changePlayMode=(mode)=>{
        this.setState({
            songMode:mode
        })
    }
    //显示歌曲列表
    showModal=()=>{
        this.setState({
            modalVisible:true
        })
    }
    handleCancel=()=>{
        this.setState({
            modalVisible:false
        })
    }
    //清除storage
    handleClearItem=()=>{
        localStorage.removeItem("songUrlData");
        localStorage.removeItem("songInfoData");
        this.forceUpdate()
    }
    //点击播放列表,播放歌曲,
    playSong=(id,index)=>{
    // 传递一个歌曲id给MusicPlayer
    
    let storageSongUrlData = JSON.parse(localStorage.getItem("songUrlData"));
     storageSongUrlData.splice(index,1);
    localStorage.setItem("songUrlData",JSON.stringify(storageSongUrlData) );
    
    let storageSongInfoData=JSON.parse(localStorage.getItem("songInfoData"));
    storageSongInfoData.splice(index,1);
    localStorage.setItem("songInfoData",JSON.stringify(storageSongInfoData) );
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
        }else {
         storage.push(res.data)
         localStorage.setItem("songInfoData",JSON.stringify(storage))
        }


    }else {
        message.info("请求歌手歌曲数据失败,请重新尝试")
    }
    } )

    }
   //在歌曲列表中播放下一首歌
   nextSong=(id)=>{
       this.playSong(id,0)
   }
   //在歌曲列表中播放上一首歌
   preSong=(id)=>{
      message.info("原理跟下一首一样,这里省略");
   }
   //在列表中点击歌手跳转相应得歌手页面
   dumpArtist=(singerId)=>{
       console.log(singerId)
       this.props.history.push(`/artist?id=${singerId}`)
   }
   

    
     

    render() {
 

        // console.log(this.state.audioPosition)
        //应该传递给组件的数据为:songUrlData歌曲播放地址(id),格式为一个songs数组,这种方式是采用reducer保存去实现持久化
        // const songUrlData = this.props.songUrlData&&this.props.songUrlData.data;
         //是歌手和歌曲的信息,是一个数组
        //  const songSingerInfo = this.props.songSingerInfo && this.props.songSingerInfo.songs;

        //获取storage中的songUrlData歌曲播放地址(id),这种是采用storage去实现数据持久化
         const songUrlData = JSON.parse(localStorage.getItem("songUrlData"))
         const songInfoData = JSON.parse(localStorage.getItem("songInfoData"))
        //  console.log(JSON.parse(localStorage.getItem("songInfoData")) )
    //    console.log(songInfoData)
        const menu = (
            <Menu >
              <Menu.Item onClick={ ()=>this.changePlayRate(0.5) }>
                <span>0.50倍速</span>
              </Menu.Item>
              <Menu.Item onClick={ ()=>this.changePlayRate(0.75) }>
                <span>0.75倍速</span>
              </Menu.Item>            
               <Menu.Item onClick={ ()=>this.changePlayRate(1.0) }>
                <span>1.00倍速</span>
              </Menu.Item>
              <Menu.Item onClick={ ()=>this.changePlayRate(1.25) }>
                <span>1.25倍速</span>
              </Menu.Item>
              <Menu.Item onClick={ ()=>this.changePlayRate(1.5) }>
                <span>1.50倍速</span>
              </Menu.Item>
              <Menu.Item onClick={ ()=>this.changePlayRate(2.0) }>
                <span>2.00倍速</span>
              </Menu.Item>
              <Menu.Item onClick={ ()=>this.changePlayRate(4.0) }>
                <span>4.00倍速</span>
              </Menu.Item>
            </Menu>
          );
            console.log(docCookies.getItem("playing"))
        return (
            <div>
                <div>
                    <Sound   
                        url={`https://music.163.com/song/media/outer/url?id=${songUrlData&&songUrlData.length>0?songUrlData[songUrlData.length-1].data[0].id:""}.mp3`}
                        playStatus={docCookies.getItem("playing")}
                        onPlaying={ ({position,duration})=>this.mediaPlaying({position,duration}) }
                        onFinishedPlaying={ ()=>this.mediaPlayingFinish() }
                        position={this.state.audioPosition}
                        onError={ (errorCode,description)=>this.handleError(errorCode,description) }
                        volume={this.state.volume}
                        playbackRate={ this.state.rateFont }
                        loop={this.state.songMode==="singerLoop"?true:false}
                    />

                </div>
                <div >
                <Modal
                    wrapClassName="playlist-modal"
                    title={
                        [
                            <div key="play-list" style={{ float:"left" }}>播放列表({songInfoData&&songInfoData.length||0})</div>,
                            <div key="all-store" style={{ float:"right",marginRight:"20px",fontSize:"12px" }}>
                                <span style={{ marginRight:"10px",cursor:"pointer" }}><Icon style={{ marginRight:"10px" }} type="folder-add" />收藏全部</span>
                                <span style={{ marginRight:"10px",cursor:"pointer" }}  onClick={ ()=>this.handleClearItem() }><Icon  style={{ marginRight:"10px" }} type="delete" />清除</span>
                            </div>,
                            <div key="clear" style={{ clear:"both" }}></div>
                        ]
                    }
                    mask={false}
                    visible={this.state.modalVisible}
                    footer={null}
                    bodyStyle={{ height:"260px",overflow:"auto",backgroundColor:"#242223",color:"#CCCCCC" }}
                    onCancel={ ()=>this.handleCancel() }
                    >
                    {
                        songInfoData&&songInfoData.map( (item,index,arr)=>{
                            return(
                                <div key={index} className='playlist-modal-sub'>
                                     {
                                         index===arr.length-1
                                         ?<div style={{ display:"inline-block",width:"20px",height:"28px",lineHeight:"28px",verticalAlign:"super" }}>
                                                 <Icon type="caret-right" style={{ color:"#B50A0A",fontSize:"20px" }} />
                                          </div>
                                          :<div style={{ display:"inline-block",width:"20px",height:"28px",lineHeight:"28px",verticalAlign:"super" }}>
                                            </div>
                                     }
                                    <div  
                                        onClick={ ()=>this.playSong(item.songs[0].id,index) }
                                        style={{ display:"inline-block", width:"266px",height:"28px",lineHeight:"28px",textAlign:"left",fontSize:"12px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer",paddingLeft:"10px" }}>
                                        {item.songs[0].name}
                                    </div>
                                    <div 
                                    onClick={ ()=>this.dumpArtist(item.songs[0].ar[0].id) }
                                    style={{ display:"inline-block",width:"80px",height:"28px",lineHeight:"28px",fontSize:"12px",fontSize:"12px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"  }}>
                                        {item.songs[0].ar[0].name}
                                    </div>
                                    <div style={{ display:"inline-block",width:"45px",height:"28px",lineHeight:"28px",fontSize:"12px",fontSize:"12px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer"  }}>
                                        {getSongPlayerTime(item.songs[0].dt)}
                                    </div>                               
                                </div>
                            )
                        } )
                    }
                </Modal>
                </div>
            <div className='music-play' style={{ width:"100%",height:"53px",lineHeight:"53px",backgroundColor:"#1F2632",color:"#fff",position:"fixed",bottom:"0px",left:"0px",zIndex:"9999" }}>
               <div className='music-play-content' style={{ width:"980px",margin:"0 auto",minWidth:"1200px" }}>
                    <Row gutter={30}>
                        <Col style={{ float:"left" }}>
                            <Row  >
                                <Col onClick={ ()=>this.preSong(songInfoData.length>0&&songInfoData[0].songs[0].id) } style={{ float:"left",cursor:"pointer" }}><Icon style={{ fontSize:"30px",verticalAlign:"middle" }} type="step-backward" /></Col>
                                {
                                    docCookies.getItem('playing')==="PLAYING"
                                    ?<Col style={{ float:"left",cursor:"pointer" }}><Icon style={{ fontSize:"30px",verticalAlign:"middle" }} type="pause-circle" onClick={ ()=>this.pause() } /></Col>
                                    :<Col style={{ float:"left",cursor:"pointer" }}><Icon style={{ fontSize:"30px",verticalAlign:"middle" }} type="play-circle" onClick={ ()=>this.playing() } /></Col>
                                }
                                
                                <Col onClick={ ()=>this.nextSong(songInfoData.length>0&&songInfoData[0].songs[0].id) } style={{ float:"left",cursor:"pointer" }}><Icon style={{ fontSize:"30px" ,verticalAlign:"middle"}} type="step-forward" /></Col>
                                <Col style={{ clear:"both" }}></Col>
                            </Row>
                        </Col>
                        <Col style={{ float:"left" }}>
                            <div style={{ display:"inline-block",width:"35px",height:"35px",marginRight:"15px" }}>
                                {
                                    songInfoData&&songInfoData.length>0
                                    ?<img src={songInfoData.length>0?songInfoData[songInfoData.length-1].songs[0].al.picUrl:null} style={{ width:"35px",height:"35px" }} />
                                    :<Icon type="user" style={{ fontSize:"20px" }} />
                                }
                            </div>
                            <div style={{ display:"inline-block",verticalAlign:"middle" }}>
                                <div style={{ lineHeight:"28px" }}>
                                    <span style={{ fontSize:"12px",marginRight:"10px",color:"#D9D9DA",cursor:"pointer" }}>{songInfoData&&songInfoData.length>0?songInfoData[songInfoData.length-1].songs[0].name:null}</span>
                                    <span style={{ fontSize:"12px",color:"#9B9B9B",cursor:"pointer" }}>{songInfoData&&songInfoData.length>0?songInfoData[songInfoData.length-1].songs[0].ar[0].name:null}</span>
                                </div>
                                <div style={{ lineHeight:"20px",marginTop:"-10px",position:"relative" }} className='songTime'>
                                    {/* //由于此音频库缺少了提供音频的状态,所以Spin无法做到waiting出现Spin，playing不出现Spin, */}
                                    {/* <Spin size='small' 
                                        spinning={this.state.spinning}
                                        style={{  position:"absolute",right:"83px",top:"12px",zIndex:"10000" }} /> */}
                                    <Slider 
                                     value={this.state.sliderValue}
                                     tooltipVisible={false} 
                                     onChange={ (value)=>this.handleSliderChange(value) }
                                     min={0}
                                     max={100}
                                     style={{ width:"490px",marginRight:"10px",display:"inline-block",verticalAlign:"middle",color:"red" }}  />
                                 
                                    {/* //这里也可以将时间在弄一个组件,功能也可以跟下面的一样 */}
                                    {/* <PlayTime /> */}
                                    <span>{this.state.position}</span>
                                    <span>/</span>
                                    <span>{this.state.duration}</span>
                                </div>
                            </div>
                        </Col>
                        <Col style={{ float:"left" }}>
                          <Icon type="file-add" style={{ fontSize:"20px",verticalAlign:"middle",color:"#B7B7B7",marginRight:"10px",cursor:"pointer" }} />
                          <Icon type="share-alt" style={{ fontSize:"20px",verticalAlign:"middle",color:"#B7B7B7",cursor:"pointer" }} />
                        </Col>
                        <Col style={{ float:"left",position:"relative",cursor:"pointer" }} onMouseOver={ ()=>this.handleMouseOver() } onMouseOut={ ()=>this.handleMouseOut() }  >
                                {
                                    this.state.noVolume
                                    ?<div onClick={ ()=>this.resumeVolume() }>
                                        <Icon type="sound" style={{ fontSize:"20px",verticalAlign:"middle",color:"#b7b7b7",cursor:"pointer" }} />
                                        <div style={{ fontSize:"10px",color:"#9B9B9B",position:"absolute",left:"14px",bottom:"-18px" }}>正常</div>
                                    </div>
                                    :<div onClick={ ()=>this.noVolumeFunc() }>
                                        <Icon type="sound" style={{ fontSize:"20px",verticalAlign:"middle",color:"#b7b7b7",cursor:"pointer" }} />
                                        <div style={{ fontSize:"10px",color:"#9B9B9B",position:"absolute",left:"14px",bottom:"-18px" }}>静音</div>
                                    </div>
                                }
                            <div style={{ position:"absolute",top:"-130px",left:"10px",width:"32px",height:"130px",backgroundColor:"#292929",display:this.state.showVolumeSlider?"block":"none" }}>
                                <Slider 
                                    vertical={true}
                                    tooltipVisible={false}
                                    value={ this.state.volume }
                                    onChange={ (value)=>this.handleVolumeChange(value) }
                                />    
                            </div>                            
                            
                        </Col>
                        <Col style={{ float:"left",cursor:"pointer" }}>
                            <Dropdown overlay={menu} placement="topCenter">
                                <div style={{ fontSize:"12px" }}>{this.state.rateFont.toFixed(2)}倍速</div>
                            </Dropdown>
                        </Col>
                        <Col style={{ float:"left",cursor:"pointer" }}>
                            {
                                this.state.songMode==="singerLoop"
                                ?<span className="singer_loop" style={{ verticalAlign:"middle" }} onClick={ ()=>this.changePlayMode("songsLoop") }></span>
                                :(this.state.songMode==="songsLoop"
                                ?<span className="songs_loop" onClick={ ()=>this.changePlayMode("songsRandom") } style={{ verticalAlign:"middle" }}></span>
                                :<span className='songs_random' onClick={ ()=>this.changePlayMode("singerLoop") } style={{ verticalAlign:"middle" }}></span>)
                            }
                        </Col>
                        <Col style={{ float:"left",cursor:"pointer" }} onClick={ ()=>this.showModal() }>
                            <span className='musicPlay-playlist'></span>
                            <span style={{ fontSize:"12px",marginLeft:"-15px" }}>{songInfoData&&songInfoData.length||0}</span>
                        </Col>
                    
                    </Row>
                    
                   
               </div>
               
            </div>

                     
        
            </div>
          
        )
    }
}

export default withRouter(MusicPlay);

