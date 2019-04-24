import React, { Component } from 'react'
import { Row,Col,Icon,Pagination } from 'antd'
import 'antd/dist/antd.css';
import { formatHotCommentPublishTime } from '../../../api/formatData';
import { Link } from 'react-router-dom'
 class NewComment extends Component {

  //用于自定义渲染上一页和下一页
  itemRender=(current, type, originalElement)=>{
    if(type==='prev') {
        return <a>上一页</a>
    }if(type==='next') {
        return <a>下一页</a>
    }
    return originalElement
}

handleChange=(current,size)=>{
    // current是当前的第几页,size是一页的大小是多少
    //将要改变的数据传给父元素
    // console.log(current);
    // console.log(size)
    // this.props.changeRenderNewComment(current,size);
    this.props.handlePagination(current,size)
}

  render() {
      const comments = this.props.comments;
    //渲染最新评论
    const renderNewComment = comments && comments.length>0?comments.map( (item,index,arr)=>{
        const str = item.content.replace(/\n/g,'<br />');
        //去除最后一条评论的borderbottom
        const showBorder = index === arr.length-1?false:true;
        const showStyle = showBorder?{borderBottom:"1px dashed #cccccc",paddingBottom:"20px",paddingTop:"10px"}:{paddingBottom:"20px",paddingTop:"10px"};
    return ( <div className='newcomment-content' key={item.content+index} style={showStyle}>
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
    } ):null;

    return (
      <div>
        {
            comments&&comments.length>0?
            <div className='newComment' >
                <div className='newComment-title' style={{ borderBottom:"1px dashed #CFCFCF",paddingBottom:"10px" }}>
                    <span style={{ color:"#000",fontSize:"12px",fontWeight:"bold" }}>最新评论</span>
                    <span style={{ color:"#000",fontSize:"12px",fontWeight:"bold" }}>{this.props.total}</span>
                </div>
                {
                    renderNewComment
                }
                <div style={{ marginTop:"40px" }}>
                     <Row>
                        <Col span={4}></Col>
                        <Pagination
                         total={this.props.total} defaultPageSize={20} 
                         itemRender={(current, type, originalElement)=>this.itemRender(current, type, originalElement)}
                         onChange={ (current,size)=>this.handleChange(current,size) }
                         />
   
                     </Row>
                </div>
            </div>
            :null
        }
      </div>
    )
  }
}
export default NewComment