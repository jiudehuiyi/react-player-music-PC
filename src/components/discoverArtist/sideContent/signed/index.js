import React, { Component } from 'react'
import { Row,Col,Icon, Spin,Button } from 'antd';
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css';
class Signed extends Component {
  
  constructor(props){
    super(props)
    this.state={
      loadAll:false
    }
  }

  dumpArtists=(id)=>{
    this.props.history.push(`/artist?id=${id}`)
  }
  dumpUser=(id)=>{
    this.props.history.push(`/user/home?id=${id}`)
  }
  loadingMoreSinger=(singerNumber,)=>{
    // 网易云的接口singerNumber限制为100的
    if(singerNumber>=99){
      this.setState({
        loadAll:true
      })
    }
    this.props.loadMoreSinger(singerNumber,)
   
  }
  render() {
      const renderTest = this.props.singerTypeData.artists&&this.props.singerTypeData.artists.length>0?this.props.singerTypeData.artists.map( (item,index)=>{
          return (
        <Col span={6}  key={item.name}>
            <div 
              onClick={ ()=>this.dumpArtists(item.id) }
              style={{ width:"164px",height:"164px",marginTop:"20px",border:"1px solid #F0F0F0",cursor:"pointer" }}>
              <img style={{ width:"164px",height:"164px" }} src={item.picUrl}/>
            </div>
            <div style={{ width:"100%",height:"20px",lineHeight:"20px",marginTop:"5px" }}>
              <div 
               onClick={ ()=>this.dumpArtists(item.id) }
              style={{ float:"left",fontSize:"12px",color:"#000" }}>{item.name}</div>
              <div style={{ float:"right",cursor:"pointer" }}
                onClick={ ()=>this.dumpUser(item.accountId) }
              ><Icon type="weibo-circle" theme="filled" style={{ color:"#E2252B",fontSize:"16px" }} /></div>
              <div className='clear' style={{ clear:"both" }}></div>
            </div>
        </Col>

          )
      } ):null
    return (
      <div>
        {
          renderTest?
          <div className='signed' style={{ borderLeft:"1px solid #E9E9E9",paddingBottom:"50px" }}>
          <div className='signed-title' style={{ padding:"50px 0px 10px 0px",margin:"0px 30px 0px 30px",fontSize:"24px",borderBottom:"2px solid #C20C0C" }}>
             入驻歌手
          </div>
          <div className='signed-content'>
             <Row gutter={20} style={{ marginLeft:"20px",marginRight:"20px" }}>
               {
                 renderTest
               }
             </Row>
             {/* //为这个页面增加一个功能,点击加载加载更多歌手,网易云是没有的 */}
             <div className='more-singer' style={{ textAlign:"center",marginTop:"30px" }}>
               {
                 this.state.loadAll?
                 <Button>数据加载完毕</Button>:
                 <Button 
                 loading={this.props.loading}
                 onClick={ ()=>this.loadingMoreSinger(this.props.singerTypeData.artists.length) } type='primary'>加载更多歌手</Button>
  
               }
             </div>
          </div>
       
     </div>:<Spin/>
        }
      </div>
      
    )
  }
}
export default withRouter(Signed)