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
      indexBannners:0,//当前显示轮播图的引索,默认为第一张
      bannerBgArr:[]//轮播图图片,由于没有背景图的接口数据,这里用图片加上模糊度去模拟
    }
  }

    componentDidMount(){
        getIndexBanner()
        .then( (res)=>{
            //请求轮播图数据,通过getBannnerFunc函数给回到
            if(res.data.code === 200) {
              //formatHomeBanner(res.data.banners) 格式化数据
                this.props.getBannnerFunc(formatHomeBanner(res.data.banners));
                this.state.bannerBgArr = [...res.data.banners];
            }else {
                console.log("你的请求有错误.")
            }
        } ).catch( (error)=>{
          console.log( "错位为:",error )
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
        //根据targetType得数字类型跳转到相应的模块类别
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
      
      //判断获取到的数据是否为空,不为空则渲染内容,也就是渲染轮播图,为空则渲染null
    const banners = this.props.homeBannerData.length>0?
    this.props.homeBannerData.map( (item,index)=>{
     
      return (
        // indexBannner${index}

        <div className={`indexBannner`} key={item.imageUrl} style={{ 
          height:"336px",
        }}>  
          <div>
          {
            item.imageUrl.length>0?<img src={ item.imageUrl } title={item.typeTitle} alt={item.typeTitle} onClick={ ()=>this.handleClick(item.url,item.targetId,item.targetType) } style={{ width:"730px",height:"336px",margin:'0 auto',cursor:"pointer" }} />:<Spin />
          }
          </div>

         </div>
      )
      
    } )
    :<Spin />;
    let bgContent = this.state.bannerBgArr[this.state.indexBannners]&&this.state.bannerBgArr[this.state.indexBannners].imageUrl;
    bgContent = bgContent || "http://p1.music.126.net/El56giZfsh9EmFFD_hVPnA==/109951164617485189.jpg?imageView&blur=40x20";
    
    return (
      <div style={{ position:"relative",marginTop:"30px",minWidth:"990px",marginTop:"30px" }} className={`indexBannner${this.state.indexBannners}`}>
      <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <div style={{ height:"336px" }}>
        <div className='leftArrow' onClick={ ()=>this.prevImg() }>
            <Icon type="left" style={{ fontSize:"40px",color:"#fff",width:"40px",height:"70px" }} />
         </div>
         {/* 由于没有背景图的接口数据,这里用图片加上模糊度去模拟 */}
         <div style={{ position:"absolute",left:"-100%",top:"0px",width:"600%",height:"336px",backgroundImage:`url(${bgContent})`,backgroundRepeat:"no-repeat",backgroundSize:"600% 336px",filter:"blur(10px)"  }}></div>
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