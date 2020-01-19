import React from "react";
import 'antd/dist/antd.css';
import { Row,Col,Button,Avatar,Icon  } from "antd";
import { Link,withRouter } from "react-router-dom";
import './index.css'
import { formatYearMonthDate,getSongPlayerTime } from "../../../api/formatData"
class LeftSide extends React.Component {

    constructor(props){
        super(props)
    }
    dumpUserHome=(uid)=>{
        this.props.history.push(`/user/home?id=${uid}`);
    }
    dumpDiscoverDjRadio=(categoryId)=>{
        this.props.history.push(`/discover/djradio/category?${categoryId}`);
    }
    dumpProgram=(id)=>{
        this.props.history.push(`/program?id=${id}`);
    }

    

    render(){
        const djRadio = this.props.djRadio;
        const djDetailListData = this.props.djDetailListData
        const programs = djDetailListData.programs || [];
        const renderPrograms = programs.map( (item,index)=>{
            const bgColor = index %2 === 0 ? "#F7F7F7":"#fff";
            return (
                <Row style={{ height:"50px",lineHeight:"50px",textAlign:"center",backgroundColor:bgColor}}key={item.id}>
                    <Col span={3}>
                        <span style={{ marginRight:"10px" }}>{index+1}</span>
                        <Icon type="play-circle" />
                    </Col>
                    <Col span={8} style={{ textAlign:"left",cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} onClick={ ()=>this.dumpProgram(item.id) }>{item.name}</Col>
                    <Col span={4}>{`播放${item.listenerCount}`}</Col>
                    <Col span={3}>{`赞${item.likedCount}`}</Col>
                     <Col span={4}>{formatYearMonthDate(item.createTime)}</Col>
                    <Col span={2}>{ getSongPlayerTime(item.duration)} </Col>
                </Row>
            )
        } )
        return (
            <div className='djRadio-leftSide' style={{ padding:"60px 0px 100px 30px",borderRight:"1px solid #D5D5D5" }}>
                <Row>
                    <Col span={8} >
                        <div>
                            <img width="200px" height="200px" style={{ padding:"3px",border:"1px solid #D5D5D5" }} src={djRadio.picUrl} alt={djRadio.rcmdText} title={djRadio.rcmdText} />
                        </div>
                    </Col>
                    <Col span={16}>
                        <div>
                            <Button type="primary">电台</Button>
                            <span style={{ fontSize:"20px",fontWeight:"bold",paddingLeft:"10px" }}>{djRadio.name}</span>
                        </div>
                        <div style={{ marginTop:"10px" }}>
                            {
                                 djRadio.dj&&djRadio.dj.avatarUrl?
                                <img  onClick={ ()=>this.dumpUserHome(djRadio.dj.userId) } src={djRadio.dj.avatarUrl} style={{ width:"35px",height:"35px",cursor:"pointer" }} alt={djRadio.dj.signature} title={djRadio.dj.signature}/>
                                :  <Avatar  icon="user" />
                            }
                              <Link to={`/user/home?id=${djRadio.dj&&djRadio.dj.userId}`} style={{ marginLeft:"10px" }}>{djRadio.dj&&djRadio.dj.nickname}</Link >
                        </div>
                        <div style={{marginTop:"10px" }}>
                            <Button type="primary" style={{ marginRight:"5px" }}>
                                <Icon type="star" />
                                {`订阅(${djRadio.subCount})`}
                            </Button>
                            <Button style={{ marginRight:"10px" }}>
                                 <Icon type="play-circle" />
                                 播放全部
                            </Button>
                            <Button>
                                 { `分享(${djRadio.shareCount})` }
                            </Button>
                        </div>
                        <div style={{ marginTop:"30px" }}>
                            <span onClick={ ()=>this.dumpDiscoverDjRadio(djRadio.categoryId) } style={{ border:"2px solid #CC0000",color:"#CC0000",padding:"1px",cursor:"pointer" }}>{djRadio.category}</span>
                        <span style={{ marginLeft:"10px" }}>{djRadio.desc}</span>
                        </div>
                    </Col>
                </Row>
                <Row justify="space-around" className="clearfix" style={{ marginTop:"30px" }}>
                    <Col span={4}><h2>节目列表</h2></Col>
                    <Col span={2}><span style={{ lineHeight:"30px" }}>{`共${djDetailListData.count||0}期`}</span></Col>
                    <Col span={4}><span style={{lineHeight:"30px" }}>生成外链</span></Col>
                    <Col span={4} style={{ float:"right",lineHeight:"30px" }}>
                        <Button onClick={ ()=>this.props.handleUp(false) }><Icon type="arrow-up" /></Button>
                        <Button onClick={ ()=>this.props.handleDown(true) }><Icon type="arrow-down" /></Button>

                    </Col>
                </Row>
                <div style={{ border:"1px solid #D9D9D9",borderTop:"2px solid #C20C0C",marginRight:"30px" }}>
                   {
                       renderPrograms
                   }
                </div>
            </div>
        )
    }
}
export default withRouter(LeftSide);