import React, { Component } from 'react'
import { formatHotComment,formatHotCommentPublishTime } from '../../../api/formatData'
import { Row,Col,Icon } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
class HotComment extends Component {
  render() {
      const hotComment = this.props.hotComment;
      const realHotComment =  hotComment.length>0?formatHotComment(hotComment):[]; 
      const renderHotComment = realHotComment.map( (item,index,arr)=>{
        const str = item.content.replace(/\n\n/g,'<br />');
        //去除最后一条评论的borderbottom
        const showBorder = index === arr.length-1?false:true;
        const showStyle = showBorder?{borderBottom:"1px dashed #cccccc",paddingBottom:"20px",paddingTop:"10px"}:{paddingBottom:"20px",paddingTop:"10px"};
    return ( <div className='hotcomment-content' key={item.content} style={showStyle}>
        <Row gutter={20}>
            <Col span={2}><img width="50px" height="50px" src={ item.user.avatarUrl } alt="" /></Col>
            <Col span={22}>
            <span style={{ color:"#1679C5",fontSize:"12px" }}>{item.user.nickname} : </span>
                           {/* //对返回的数据中的/n进行替换，替换成<br/>标签 */}
            <span style={{ fontSize:"12px" }} dangerouslySetInnerHTML={{__html: str}}></span>
            </Col>
        </Row>  
        {
                item.beReplied&&item.beReplied.length>0?
                <Row>
                    <Col span={2}></Col>  
                    <Col span={22} style={{ backgroundColor:"#F4F4F4",border:"1px solid #DEDEDE",padding:"10px" }} >
                        <Link to={`/user/home?id=${item.beReplied[0].user.userId?item.beReplied[0].user.userId:null}`} >{item.beReplied[0].user.nickname?item.beReplied[0].user.nickname:null}:</Link>
                        <span>{item.beReplied[0].content?item.beReplied[0].content:null}</span>
                    </Col>  
                 </Row> 
                 :null
            }
        <Row>
            <Col span={2}></Col>
            <Col span={3} style={{ color:"#9D9D9D",fontSize:"12px" }}>{formatHotCommentPublishTime(item.time)}</Col>
            <Col span={15}></Col>
            <Col span={4}>
                <Icon type="like" theme="twoTone" style={{ fontSize:"16px",marginRight:"10px" }} />
                <span style={{ marginRight:"10px",cursor:"pointer" }}>({item.likedCount})</span>
                <span style={{ marginRight:"10px" }}>|</span>
                <span style={{ fontSize:"12px",cursor:"pointer" }}>回复</span>
            </Col>

        </Row>
    </div>)
    } )
    return (
      <div className='playlist-hotComment'>
            {
                hotComment.length>0?
                <div className='hotcomment'>
                    <div className='hotcomment-title'>
                        <div>精彩评论</div>
                    </div>
                    {
                        renderHotComment
                    }
                </div>
                :null
            }
      </div>
    )
  }
}
export default  HotComment