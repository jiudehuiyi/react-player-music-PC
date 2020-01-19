import React, { Component, Fragment } from 'react'
import { Row,Col,Button,Icon,Pagination,Skeleton, Spin } from 'antd'
import 'antd/dist/antd.css'

import Header from '../../common/header'
import Footer from '../../common/footer'
import './index.scss'
import { getHotCommendTagsContent ,getSelectTagsData} from '../../api';
import { formatHotCommendTagsContent } from '../../api/formatPlayList';
import { formatPlayCount } from '../../api/formatIndexContent';
import SelectTags from './selectTags';
import MusicPlay from '../../common/MusicPlay';

 class DiscoverPlaylist extends Component {

    constructor(props){
      super(props);
      this.state={
        controlHot:true,
        controlNew:false,
        isExtends:false
      }
    }

   

    componentDidMount(){
      //获取查询字符串
      this.search = decodeURIComponent(this.props.location.search);
      //得到查询字符串的多参数
      this.getSearchParamter = this.search.match(/\w+=(\w+|[\u4e00-\u9fa5]+|\d)/gi);
      getHotCommendTagsContent(this.getSearchParamter,35,0).then( (res)=>{
            this.props.hotCommendTagsContentFunc(res.data)
      } ) 
    }
    
    //跳转到相应的playlist页面
    handleJumpToPlayList=(id)=>{
      this.props.history.push(`/playlist?id=${id}`)
    }
    //改变页数的函数,请求分页数据
    handlePagination=(current,pageSize)=>{
      getHotCommendTagsContent(this.getSearchParamter,pageSize,current).then( (res)=>{
        this.props.hotCommendTagsContentFunc(res.data)
      } ) 
    }
    //是否展开选择面板
    isExtend = ()=>{
      this.setState({
        isExtends:!this.state.isExtends
      })
    }
    //选择完风格后关闭选择面板
    selectedExtends=(boo)=>{
      // console.log(boo)
      this.setState({
        isExtends:boo
      })
    }
  //通过按钮改变是热门还是最新
  handleHotAndNew=(ev,str,pageSize)=>{
    //控制按钮样式
      if( str === 'hot' ) {
        this.setState({
          controlHot:true,
          controlNew:false
        })
      }else if( str === 'new' ) {
        this.setState({
          controlHot:false,
          controlNew:true,
        })
      }
    //获取查村字符串并且将其格式化
    let resultStr = this.getSearchParamter?this.getSearchParamter.toString().replace(/order=\w+/,`order=${str}`):null;


    //转化为数组,这个数组是传入请求数据的API的
    let resultArr = resultStr?resultStr.split(','):null;
    //这个是改变url路由的查询字符串的
    let urlSearch = resultArr&&resultArr.length>0?resultArr.map( (item,index)=>{
      let str = '';
      str += `${item}&`;
      return str;
    } ):null
    
    //改变路由
    let realUrlSearch = urlSearch?urlSearch.toString().replace(",","").slice(0,urlSearch.toString().length-2):"";
    this.props.history.push(`/discover/playlist?${realUrlSearch}`);
    //请求数据  
    getHotCommendTagsContent(resultArr,pageSize,1,str).then( (res)=>{
      this.props.hotCommendTagsContentFunc(res.data)
    } ) 

  }
  //点击选择分类的时候请求数据
  handleTagsContent=()=>{
    getSelectTagsData().then( (res)=>{
      this.props.selectTagsDataFunc(res.data);
    } )
  }

  

  render() {
    //标签内容数据
    const commendTagsContentData = formatHotCommendTagsContent(this.props.commendTagsContentData);
    // console.log(commendTagsContentData.playlist)
     //渲染标签内容数据
    const renderCommendTagsContentData = commendTagsContentData.playlist && commendTagsContentData.playlist.length>0? commendTagsContentData.playlist.map( (item,index)=>{
      return (
        <Fragment key={item.id} >
        {/* paddingTop:(index+1)%5===0?"1px":""是修复antd一些微小细节的bug */}
              <Col span={4} 
                  style={{ marginTop:"20px",paddingTop:(index+1)%5===0?"1px":"" }}
                  onClick={ ()=>this.handleJumpToPlayList(item.id) }
                  >
                <div style={{ cursor:"pointer",position:"relative",paddingTop:"1px" }}>
                    {
                      item.coverImgUrl?<img style={{ width:"120px",height:"120px",border:"1px solid #E8E8E8",boxSizing:"border-box" }} src={item.coverImgUrl} alt=""/>:<div style={{ width:"80%",height:"80%" }}></div>
                    }
                    <div className='clearfix' style={{ width:"80%",height:"27px",lineHeight:"27px",backgroundColor:"#000",opacity:"0.5",position:"absolute",bottom:"0px",color:"#fff" }}>
                       <span style={{ marginLeft:"10px",marginRight:"5px" }}>
                       <Icon type="customer-service" />
                       </span>
                       <span>{formatPlayCount(item.playCount)}</span>
                       <span style={{ float:"right",marginRight:"10px" }}>
                            <Icon type="play-circle" />
                        </span>
                    </div>
                    </div>
                    <div style={{ width:"80%",height:"10%",overflow:"hidden",fontSize:"14px",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"#000000",cursor:"pointer" }}>{item.name}</div>
                    <div style={{ fontSize:"12px",  cursor:"pointer",width:"80%",height:"10%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} >by {item.creator.nickname}</div>
                </Col>
                {
                  (index+1)%5===0?null:<Col span={1}></Col>
                }
               
          
        </Fragment>

      )
    } ):null
    return (
      <div className='discoverPlaylist'>
            <div className='discoverPlaylist-header' style={{ backgroundColor:"#242424" }}>
                <Header />
            </div>
            <MusicPlay />

            <div className='discoverPlaylist-content' style={{ marginTop:"30px",minWidth:"992px" }}>
               <Row>
                 <Col span={4}>
                 </Col>


                 <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",padding:"30px 20px 30px 20px" }}>
                    <div className='discoverPlaylist-content-header' style={{ paddingBottom:"10px",borderBottom:"1px solid #C20C0C" }}>
                        <Row gutter={10}>

                            <Col span={3}>
                                <span style={{ fontSize:"20px",color:"#000" }}>{commendTagsContentData.cat}</span>
                            </Col>
                            <Col span={3}>
                                <Button type='primary' onClick={ ()=>{this.isExtend(),this.handleTagsContent()} } >
                                    选择分类
                                    <Icon  type={this.state.isExtends?"up":"down"} />
                                </Button>
                                {
                                  
                                  this.state.isExtends?<SelectTags isExtends={this.state.isExtends} selectedExtends={ (boo)=>this.selectedExtends(boo) }  hotCommendTagsContentFunc={this.props.hotCommendTagsContentFunc}  selectTagsData={this.props.selectTagsData} />:null
                                }
                            </Col>
                            <Col span={10}></Col>
                            <Col span={8} style={{ textAlign:"right" }}>
                                <Button type='primary' style={this.state.controlHot?{ backgroundColor:"#40a9ff",border:"1px solid #40a9ff" }:{}} onClick={ (ev)=>this.handleHotAndNew(ev,'hot',35) }>
                                      热门
                                </Button>
                                <Button type='primary' style={this.state.controlNew?{ backgroundColor:"#40a9ff",border:"1px solid #40a9ff" }:{}} onClick={ (ev)=>this.handleHotAndNew(ev,'new',35) } >
                                      最新
                                </Button>
                            </Col>

                           
                        </Row>
                    </div>

                    <div className='discoverPlaylist-content-list'>
                          <Row style={{ marginTop:"20px",marginBottom:"20px" }}>
                              {
                                renderCommendTagsContentData?renderCommendTagsContentData:<Spin />
                              }

                            </Row>
                            <div style={{ marginTop:"40px",marginBottom:"40px",textAlign:"center" }} className='discoverPlaylist-content-pagination'>
                               <Pagination 
                                  pageSize={35}
                                  total={commendTagsContentData.total}
                                  onChange={ (current,pageSize)=>this.handlePagination(current,pageSize) }/>
                            </div>
                    </div>

                 </Col>


                 <Col span={4}></Col>
               </Row>
            </div>



            <div className='discoverPlaylist-footer'>
                <Footer />
            </div>
      </div>
    )
  }
}
export default DiscoverPlaylist


