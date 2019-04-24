import React, { Component } from 'react';
import { Row,Col } from 'antd'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import { formatYearMonthDate } from '../../../api/formatData';

class AllAlbum extends Component {

    dumpAlbum=(id)=>{
        this.props.history.push(`/album?id=${id}`);
    }

    render() {
        // console.log( this.props.hotAlbums )
        const hotAlbums = this.props.hotAlbums;
        const renderHotAlbums = hotAlbums.length>0?hotAlbums.map( (item,index)=>{
            return (
                <Col span={6} style={{ marginBottom:"20px" }}>
                <div style={{ width:"120px",height:"120px",cursor:"pointer" }} onClick={ ()=>this.dumpAlbum(item.id) }>
                    <img style={{ width:"120px",height:"120px" }} src={item.picUrl} />
                </div>
                <div 
                onClick={ ()=>this.dumpAlbum(item.id) }
                style={{ width:"100px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",cursor:"pointer" }}>
                    {item.name}
                </div>
                <div>
                    {formatYearMonthDate(item.publishTime)}
                </div>
              </Col>
            )
        } ):null
        return (
            <div className='artist-allblbum'>
                <Row gutter={20}>
                    {
                        renderHotAlbums
                    }
                </Row>
            </div>
        );
    }
}

export default  withRouter(AllAlbum);