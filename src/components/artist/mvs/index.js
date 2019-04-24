import React, { Component } from 'react';
import { Row,Col } from 'antd'
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
class Mvs extends Component {
    dumpMv=(id)=>{
        this.props.history.push(`/mv?id=${id}`)
    }
    render() {
        const singerMvsData = this.props.singerMvsData;
        const renderSingerMvsData = singerMvsData.length>0?singerMvsData.map( (item,index)=>{
            return (
                <Col span={6} style={{ marginBottom:"20px" }}>
                <div style={{ width:"120px",height:"120px",cursor:"pointer" }} onClick={ ()=>this.dumpMv(item.id) }>
                    <img style={{ width:"120px",height:"120px" }} src={item.imgurl} />
                </div>
                <div 
                onClick={ ()=>this.dumpMv(item.id) }
                style={{ width:"100px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer" }}>
                    {item.name}
                </div>

              </Col>
            )
        } ):null
        return (
            <div className='artist-mv'>
                 <Row gutter={20}>
                    {
                        renderSingerMvsData
                    }
                </Row>

            </div>
        );
    }
}

export default withRouter(Mvs);