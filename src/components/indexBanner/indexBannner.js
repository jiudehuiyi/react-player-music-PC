import  React, { Component } from 'react';
import { Carousel, Spin,Icon,Row,Col  } from 'antd';
import 'antd/dist/antd.css'
import { withRouter } from 'react-router-dom'

import { getIndexBanner } from '../../api';
import { formatHomeBanner } from '../../api/formatData'
import './indexBannner.scss'
 class IndexBannner extends Component {

  constructor(props){
    super(props);
    this.state={
      indexBannners:0
    }
  }

    componentDidMount(){
        getIndexBanner()
        .then( (res)=>{
            //请求轮播图数据,通过getBannnerFunc函数给回到
            if(res.data.code === 200) {
              //formatHomeBanner(res.data.banners) 格式化数据
                this.props.getBannnerFunc(formatHomeBanner(res.data.banners));
            }else {
                console.log("你的请求有错误.")
            }
        } )
    }

    handleClick=(url,targetId,targetType)=>{
      //以前的版本API的跳转方法
      // const regExp = /https:\/\/music\.163\.com/gi;
      // url=url.replace(regExp,"");
      // this.props.history.push(url)
      //新版本的API中banner数据移除了url这项数据
      // 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频      const baseUrl = 'http://localhost:3000'
      if(url) {
        window.location = url
      }else {
        if( targetType === 1 ) {
          this.props.history.push(`/song?id=${targetId}`)
        }else if(targetType === 10 ){
          this.props.history.push(`/album?id=${targetId}`)
        }else if(targetId === 1000) {
          
          this.props.history.push(`/artist?id=${targetId}`)
        }
        else if(targetId === 1002) {
          this.props.history.push(`/user/home?id=${targetId}`)
        }else if( targetType === 1004 ) {
          this.props.history.push(`/mv?id=${targetId}`)
        }else if(targetId===1009) {
          this.props.history.push(`/djradio?id=${targetId}`)
        }
        else if( targetType === 3000  ) {
          this.props.history.push(`/m/at?id=${targetId}`)
        }
      }
     
    }

    prevImg=()=>{
      //切换上一张图片
      this.banners.prev();
    } 
    nextImg=()=>{
      //切换下一张图片
      this.banners.next();
    }

    afterChange=(current)=>{
      this.setState({
        indexBannners:current
      })
    }

  render() {
      // console.log( this.props )
      //判断获取到的数据是否为空,不为空则渲染内容,为空则渲染null
    const banners = this.props.homeBannerData.length>0?
    this.props.homeBannerData.map( (item,index)=>{
      return (
        // indexBannner${index}
        <div className={`indexBannner `} key={item.imageUrl} style={{ 
          width:"100%",height:"336px",
          backgroundSize:"100% 100%"
        }}
          
          >    
          {
            item.imageUrl.length>0?<img src={ item.imageUrl } onClick={ ()=>this.handleClick(item.url,item.targetId,item.targetType) } style={{ width:"730px",height:"336px",margin:'0 auto',cursor:"pointer" }} />:<Spin />
          }
       </div>
      )
      
    } )
    :<Spin />;
    return (
      <div style={{ position:"relative",marginTop:"30px",minWidth:"990px",marginTop:"30px",paddingTop:"30px" }} className={`indexBannner${this.state.indexBannners}`}>
      <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <div style={{ position:"relative" }}>
        <div className='leftArrow' onClick={ ()=>this.prevImg() }>
            <Icon type="left" style={{ fontSize:"40px",color:"#fff",width:"40px",height:"70px" }} />
         </div>
         
         <Carousel
            afterChange={ (current)=>this.afterChange(current) }
            autoplay={true}
            effect="fade"
            ref={ (middle)=>this.banners=middle }
         >
          {
            banners
          }
         </Carousel>
         <div className='rightArrow' onClick={ ()=>this.nextImg() }>
            <Icon type="right" style={{ fontSize:"40px",color:"#fff",width:"40px",height:"70px" }}   />
         </div>


        </div>
      
      </Col>
      <Col span={4}></Col>
      </Row>

       
      </div>
    )
  }
}

export default withRouter(IndexBannner)