//喜欢这张专辑的人没有这个接口,或者还没找到,等找到后再补上这个完整的组件,现在用默认头像代替一下
import React, { Component } from 'react';
import { Row,Col ,Icon,Spin} from 'antd';

import {getSingerAlbum} from  '../../../api';
import { formatAlbum,formatDate } from '../../../api/formatData';
import 'antd/dist/antd.css';

 class LikeAlbumPerson extends Component {

    

  render() {
    //   console.log( this.props )
    // const realAlbumData = formatAlbum(this.props.albumData||{})||{};

    // console.log(realAlbumData.artistId)
    const singerOtherAlbum = this.props.singerOtherAlbum;
    const renderOtherAlbum = singerOtherAlbum.length>0?singerOtherAlbum.map( (item,index)=>{
        const dt = new Date(item.publishTime);
        let str = dt.getFullYear()+'-'+formatDate(dt.getMonth()+1)+'-'+formatDate(dt.getDate())
        return (
                <Row key={item.picId} style={{ marginTop:"30px",marginBottom:"15px" }}>
                    <Col span={8}>
                       
                        {item.picUrl? <img style={{ width:"100%",height:"100%" }} src={item.picUrl} alt="" />:null}
                    </Col>
                    <Col span={16}>
                        <div style={{ marginLeft:"5px",marginBottom:"10px",fontSize:"14px",color:"#000",fontWeight:"bold" }}>{item.name}</div>
                        <div style={{ fontSize:"12px",marginLeft:"5px" }}>
                            {
                                str
                            }
                        </div>
                    </Col>
               </Row>
        )
    } ):null;
    return (
      <div className='likeAlbumPerson'>
            <div className='likeAlbumPerson-title'>
                <div style={{ fontSize:"12px",color:"#000",fontWeight:"bold",borderBottom:"1px solid #CCCCCC",paddingBottom:"10px" }}>喜欢这张专辑的人</div>
            </div>
            <div className='likeAlbumPerson-avatar' style={{ marginTop:"15px",marginBottom:"20px" }} >
                <Row gutter={10}>
                    <Col span={6}><Icon type="user" /></Col>
                    <Col span={6}><Icon type="user" /></Col>
                    <Col span={6}><Icon type="user" /></Col>
                    <Col span={6}><Icon type="user" /></Col>
                </Row>
                <Row gutter={10}>
                    <Col span={6}><Icon type="user" /></Col>
                    <Col span={6}><Icon type="user" /></Col>
                    <Col span={6}><Icon type="user" /></Col>
                    <Col span={6}><Icon type="user" /></Col>
                </Row>
            </div>
            <div className='other-hotAlbum' className='clearfix' style={{ borderBottom:"1px solid #CCCCCC" }}>
                <Row>
                    <Col span={24}>
                        <div style={{ fontSize:"12px",float:"left",color:"#000",fontWeight:"bold",paddingBottom:"10px" }}>Ta的其他热门专辑</div>
                       <div style={{ float:"right" }}>全部></div>
                    </Col>
                </Row>
            </div>
            
               {
                   renderOtherAlbum
               }
      </div>
    )
  }
}
export default LikeAlbumPerson