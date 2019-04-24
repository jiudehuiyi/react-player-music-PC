import React, { Component } from 'react';
import { Icon } from 'antd'
import 'antd/dist/antd.css'
import { withRouter } from 'react-router-dom'
import { formatSongTime } from '../../../../api/formatData';

class PlaylistContent extends Component {

    handleClick=(id)=>{
        this.props.startPlaySong(id)
    }
    dumpSong=(id)=>{
        this.props.history.push(`/song?id=${id}`)
    }
    dumpArtist=(id)=>{
        this.props.history.push(`/artist?id=${id}`);
    }
    dumpAlbum=(id)=>{
        this.props.history.push(`/album?id=${id}`)
    }

    render() {
        const getLoginPlaylistContent = this.props.getLoginPlaylistContent;
        // console.log(getLoginPlaylistContent)
        const renderPlaylistContent = getLoginPlaylistContent.playlist&&getLoginPlaylistContent.playlist.tracks.map( (item,index)=>{
            return (
                <div style={{ marginRight:"10px",backgroundColor:index%2===0?"#F3F3F3":"#fff" }}>
                    <div style={{ display:"inline-block", width:"74px",height:"38px",lineHeight:"38px",paddingLeft:"10px", }}>
                        <div style={{ float:"left",display:"inline-block" }}>{index+1}</div>
                        <div 
                         onClick={ ()=>this.handleClick(item.id) }
                         style={{ float:"right",display:"inline-block",width:"17px",height:"17px",marginRight:"10px",cursor:"pointer" }}><Icon type="play-circle" style={{ fontSize:"17px" }} /></div>
                        <div style={{ clear:"both" }}></div>
                    </div>
                    <div 
                        onClick={ ()=>this.dumpSong(item.id) }
                    style={{display:"inline-block", width:"240px",height:"38px",lineHeight:"38px",paddingLeft:"10px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer" }}>{item.name}</div>
                    <div style={{ display:"inline-block",width:"110px",height:"38px",lineHeight:"38px",paddingLeft:"10px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{formatSongTime(item.dt)}</div>
                    <div 
                    onClick={ ()=>this.dumpArtist(item.ar[0].id) }
                    style={{display:"inline-block", width:"100px",height:"38px",lineHeight:"38px",paddingLeft:"10px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer" }}>{item.ar[0].name}</div>
                    <div 
                    onClick={ ()=>this.dumpAlbum(item.al.id) }
                    style={{ display:"inline-block",width:"130px",height:"38px",lineHeight:"38px",paddingLeft:"10px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer" }}>{item.al.name}</div>
                </div>
            )
        } )
        return (
            <div className='my-playlist-content'>
                <div style={{ marginBottom:"10px",borderBottom:"2px solid #C20C0C" }}>
                    <div style={{ float:"left",color:"#333333",fontSize:"20px",marginRight:"20px" }}>歌曲列表</div>
                    <div style={{ float:"left",fontSize:"12px",marginTop:"10px" }}>{getLoginPlaylistContent.playlist&&getLoginPlaylistContent.playlist.tracks.length}首歌</div>
                    <div style={{ float:"right",fontSize:"12px",marginTop:"10px",marginRight:"20px" }}>播放<span style={{ color:"#C20C0C",fontWeight:"bold" }}>{getLoginPlaylistContent.playlist&&getLoginPlaylistContent.playlist.playCount}</span>次</div>
                    <div style={{ clear:"both" }}></div>
                </div>
                <div style={{ borderBottom:"2px solid #D3D3D3",marginRight:"10px" }}>
                    <div style={{ display:"inline-block", width:"74px",height:"38px",lineHeight:"38px",backgroundColor:"#F4F4F4",borderRight:"1px solid #DEDEDE",fontSize:"12px",paddingLeft:"10px",verticalAlign:"bottom" }}></div>
                    <div style={{display:"inline-block", width:"240px",height:"38px",lineHeight:"38px",backgroundColor:"#F4F4F4",borderRight:"1px solid #DEDEDE",fontSize:"12px",paddingLeft:"10px" }}>歌曲标题</div>
                    <div style={{ display:"inline-block",width:"110px",height:"38px",lineHeight:"38px",backgroundColor:"#F4F4F4",borderRight:"1px solid #DEDEDE",fontSize:"12px",paddingLeft:"10px" }}>时长</div>
                    <div style={{display:"inline-block", width:"100px",height:"38px",lineHeight:"38px",backgroundColor:"#F4F4F4",borderRight:"1px solid #DEDEDE",fontSize:"12px",paddingLeft:"10px" }}>歌手</div>
                    <div style={{ display:"inline-block",width:"130px",height:"38px",lineHeight:"38px",backgroundColor:"#F4F4F4",borderRight:"1px solid #DEDEDE",fontSize:"12px",paddingLeft:"10px" }}>专辑</div>
                </div>
                {
                    renderPlaylistContent
                }



            </div>
        );
    }
}

export default withRouter(PlaylistContent);