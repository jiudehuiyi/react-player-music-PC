import React, { Component } from 'react';
import { Button } from 'antd'
import 'antd/dist/antd.css'
import { formatYearMonthDate } from '../../../../api/formatData';
import { withRouter } from 'react-router-dom'
class PlaylistInfo extends Component {

    dumpUser=()=>{
        this.props.history.push(`/user/home?id=${this.props.userId}`)
    }

    render() {
        return (
            <div className='my-playlist-info' style={{ marginBottom:"50px" }}>
                <div style={{ width:"208px",height:"208px",border:"1px solid #ccc",display:"inline-block" }}>
                    <img src={this.props.coverImgUrl} style={{   width:"208px",height:"208px" }}/>
                </div>
                <div style={{ display:"inline-block",verticalAlign:"top",marginLeft:"20px", }}>
                    <div>
                        <Button type='primary' >歌单</Button>
                        <span style={{ color:"#000",fontSize:"20px",marginLeft:"20px" }}>{this.props.name}</span>
                    </div>
                    <div style={{ marginTop:"15px" }}>
                        <img style={{ width:"35px",height:"35px",cursor:"pointer" }} onClick={ ()=>this.dumpUser() } src={this.props.creatorImg} />
                        <span style={{ color:"#1A7BC6",marginLeft:"10px",cursor:"pointer" }} onClick={ ()=>this.dumpUser() }>{this.props.nickname}</span>
                        <span style={{ color:"#ACACAC",marginLeft:"20px" }}>{formatYearMonthDate(this.props.createTime)}创建</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PlaylistInfo);