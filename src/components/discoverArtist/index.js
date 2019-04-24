import React, { Component } from 'react';
import { Row,Col } from 'antd';
import 'antd/dist/antd.css';
import Header from '../../common/header';
import Footer from '../../common/footer';
import SideMenu from './sideMenu'
import SideContent from './sideContent';
import { getSingerTypeData,getHotSingerData,getCatSingerData } from '../../api';
import MusicPlay from '../../common/MusicPlay';

class DiscoverArtists extends Component {

    constructor(props){
      super(props);
      this.state={
        loading:false
      }
    }

  componentDidMount(){
    getSingerTypeData('/artist/list?cat=5001',this.singerNumber||40).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.singerTypeDataFunc(res.data)
        }
      }catch(err){
        console.log("错误为:"+err)
      }
    } )
    //获取热门歌手数据
    getHotSingerData().then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.hotSingerDataFunc(res.data)
        }
      }catch(err){
        console.log("错误为:"+err)
      } 
       } )
      //获取cat路径的数据
      getCatSingerData(`/artist/list${this.props.location.search}`).then( (res)=>{
        try{
          if(res.data.code === 200) {
            this.props.catSingerDataFunc(res.data)
          }
        }catch(err){
          console.log("错误为:"+err)
        } 
            
        } )
  }
  //加载更多歌手
  loadMoreSinger=(singerNumber)=>{
    this.setState({
      loading:true
    })
    let limit = singerNumber + 4;
    getSingerTypeData('/artist/list?cat=5001',limit).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.singerTypeDataFunc(res.data);
          this.setState({
            loading:false
          })
        }
      }catch(err){
        console.log("错误为:"+err)
      }
    } )
  }

  handleClick=(router,dataPath,type)=>{
    console.log(dataPath)
    // router是跳转路径url
    this.props.history.push(router)
    //dataPath是请求数据的路径
    // console.log(dataPath)
    this.type=type;
   //获取cat路径的数据
   getCatSingerData(`${dataPath}`).then( (res)=>{
     console.log(`/artist/list${this.props.location.search}`)
    try{
      if(res.data.code === 200) {
        this.props.catSingerDataFunc(res.data)
      }
    }catch(err){
      console.log("错误为:"+err)
    } 
        
    } )
    // if(dataPath) {
    //   getSingerTypeData(dataPath).then( (res)=>{
    //     this.props.singerTypeDataFunc(res.data)
    //   } )
    // }
    
  }
  //根据字母跳转路径
  handleClickCat=(alpha)=>{
    if(alpha==='热门') {
      alpha=''
    }
    this.id = this.props.location.search.match(/\?id=\d+/gi)[0].slice(4);
    this.props.history.push(`/discover/artist/cat?id=${this.id}&initial=${alpha}`)
    getCatSingerData(`/artist/list?id=${this.id}&initial=${alpha}`).then( (res)=>{
      try{
        if(res.data.code === 200) {
          
          this.props.catSingerDataFunc(res.data)
        }
      }catch(err){
        console.log("错误为:"+err)
      } 
          
      } )
  }

  render() {
    // console.log(this.props.catSingerData)
    return (
      <div className='discover-artists'>
        
        <div className='discover-artists-header' style={{ backgroundColor:"#242424" }}>
             <Header/>
        </div>
        <MusicPlay />

        <div className='discover-artists-content' style={{ marginTop:"30px",backgroundColor:"#F5F5F5", }}>
            <Row>
                <Col span={4}></Col>

                
                {/* //内容 */}
                <Col span={16} style={{ border:"1px solid #D3D3D3",paddingBottom:"30px" }}>
                    <Row>
                        {/* 内容左侧 */}
                        <Col span={5}>

                            <SideMenu handleClick={(router,dataPath,type)=>this.handleClick(router,dataPath,type)}  />
                        </Col>



                        {/* 内容右侧 */}
                        <Col span={19}>
                          <SideContent  
                          //入驻歌手数据
                          singerTypeData={ this.props.singerTypeData } 
                          loadMoreSinger={(singerNumber,)=>this.loadMoreSinger(singerNumber,)} 
                          loading={this.state.loading}
                          //推荐歌手数据
                          hotSingerData={this.props.hotSingerData}
                          //cat路径数据
                          type={this.type}
                          catSingerData={this.props.catSingerData}
                          handleClickCat={(alpha)=>this.handleClickCat(alpha)}
                          />
                        </Col>
                    </Row>
                
                </Col>




                <Col span={4}></Col>
            </Row>
        
        </div>


        <div className='discover-artists-footer'>
            <Footer />
        </div>
      </div>
    )
  }
}
export default DiscoverArtists