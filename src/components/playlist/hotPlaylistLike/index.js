import React, { Component } from 'react'
import { Row,Col } from 'antd'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
 class HotPlaylistLike extends Component {
  render() {
      const hotPlaylistData = this.props.hotPlaylistData.playlists?this.props.hotPlaylistData.playlists:[]
      const renderHotPlaylistData = hotPlaylistData.length>0?
      hotPlaylistData.map( (item,index)=>{
        return (
            <Row gutter={10} key={item.name} style={{ marginBottom:"10px",marginTop:"10px" }}>
                <Col span={6}>
                        <Link to={`/playlist?id=${item.id}`}>
                           <img src={item.coverImgUrl} title={item.name}  style={{ width:"50px",height:"50px" }}/>  
                        </Link>
                </Col>
                <Col span={18}>
                    <div ><Link style={{ color:"#000",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block" }} to={`/playlist?id=${item.id}`}>{item.name}</Link></div>
                    <div>by <Link style={{ color:"#777777",fontSize:"12px" }} to={`/user/home?${item.creator.userId?item.creator.userId:""}`}>{item.creator.nickname?item.creator.nickname:""}</Link></div>
                </Col>
            </Row>
        )
    } ):null
    return (
        <div>
            {
                hotPlaylistData&&hotPlaylistData.length>0?
                <div className='hot-playlist-like' style={{ marginTop:"30px" }}>
                    <div className='hot-playlist-like-title' style={{ fontSize:"16px",color:'#000',borderBottom:"1px solid #CCCCCC",paddingBottom:"5px" }}>
                         热门歌单
                    </div>
                    <div className='hot-playlist-like-content'>
                        {
                            renderHotPlaylistData
                        }
                    </div>      
                </div>
                :null
            }
        </div>
      
    )
  }
}
export default HotPlaylistLike