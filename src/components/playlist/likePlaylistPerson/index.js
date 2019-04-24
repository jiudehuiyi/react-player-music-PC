import React, { Component } from 'react'
import { Row,Col } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
 class LikePlaylistPerson extends Component {
  render() {
      const subscribers = this.props.subscribers || [];
     const renderSubscribers = subscribers.map( (item,index)=>{
        return <Col span={6} style={{marginTop:"10px" }} key={item.nickname}>
                    <Link to={`/user/home?id=${item.userId}`}>
                       <img style={{ width4:"40px",height:"40px" }} src={item.avatarUrl} title={item.nickname} alt={item.nickname}/>
                    </Link>
               </Col>
     } )
    return (
        <div>
        {
            subscribers && subscribers.length>0?
            <div className='like-playlist-person'>
            <div className='like-playlist-person' style={{ fontSize:"16px",color:'#000',borderBottom:"1px solid #CCCCCC",paddingBottom:"5px" }}>
                喜欢这个歌单的人
            </div>
           <Row gutter={10}>
                {
                    renderSubscribers   
                }

           </Row>
           </div>
            :null
        }
        </div>
      
    )
  }
}
export default LikePlaylistPerson