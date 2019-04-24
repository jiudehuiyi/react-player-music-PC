import React, { Component,Fragment } from 'react'
import {Row,Col,Pagination, Spin} from 'antd';
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import Header from '../../common/header'
import Footer from '../../common/footer'
import { getNewAlbum,getNewAlbumAll } from '../../api';

import './index.scss'
import MusicPlay from '../../common/MusicPlay';

 class DiscoverAlbum extends Component {

  //用于自定义渲染上一页和下一页
  itemRender=(current, type, originalElement)=>{
    if(type==='prev') {
        return <a>上一页</a>
    }if(type==='next') {
        return <a>下一页</a>
    }
    return originalElement
  }

  //改变分页重新请求数据
  handleChangePage=(current,size)=>{
    getNewAlbumAll(size,current).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.newAlbumAllDataFunc(res.data)
        }
      }catch(err){
        console.log("错误:"+err);
      } 
    } )
  }
  //选择地区
  handleAreaData=(ev,area)=>{
    this.props.history.push(`/discover/album?area=${area}`)
    getNewAlbumAll(35,1,area).then( (res)=>{
      console.log(res.data)
      try{
        if(res.data.code === 200) {
          this.props.newAlbumAllDataFunc(res.data)
        }
      }catch(err){
        console.log("错误:"+err);
      }    
    } )
  }

  handleAlbum=(id)=>{
      this.props.history.push(`/album?id=${id}`);
  }
  handleArtist=(id)=>{
      this.props.history.push(`/artist?id=${id}`)
  }
   componentDidMount(){
     
    getNewAlbum().then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.newAlbumDataFunc(res.data)
        }
      }catch(err){
        console.log("错误:"+err);
      }
    } )

    getNewAlbumAll(35,1).then( (res)=>{
      try{
        if(res.data.code === 200) {
          this.props.newAlbumAllDataFunc(res.data)
        }
      }catch(err){
        console.log("错误:"+err);
      }    
    } )

   }
  render() {
    // console.log(this.props)
    const newAlbumData = this.props.newAlbumData.albums||[];
    const newAlbumAllData = this.props.newAlbumAllData.albums||[];
    // console.log(newAlbumAllData)
    const renderNewAlbumData = newAlbumData.slice(0,10).map( (item,index)=>{
        return (
              <Fragment key={item.name}>
                  {
                        index+1%5?<Col span={1}></Col>  :null
                    }
                    <Col span={4} style={{ position:"relative",marginTop:"30px" }} >
                         <img style={{ width:"130px",height:"130px",cursor:"pointer",zIndex:"1000",position:"relative" }} src={item.picUrl} alt="" title={item.name} onClick={ ()=>this.handleAlbum(item.id) }   />
                         <div className='discover-album-content-bg' style={{  }}></div>
                         <div 
                         onClick={ ()=>this.handleAlbum(item.id) }
                         style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"#2D2D2D",fontSize:"12px",cursor:"pointer" }}>
                                {item.name}
                         </div>
                         <div 
                         onClick={ ()=>this.handleArtist(item.artist.id) }
                         style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"12px",cursor:"pointer" }}>
                            {item.artist.name}
                         </div>
                    </Col>
                   
                                      
              </Fragment>
          )
    } )
    const renderNewAlbumAllData = newAlbumAllData.map( (item,index)=>{
      return (
        <Fragment key={item.name}>
            {
                  index+1%5?<Col span={1}></Col>  :null
              }
              <Col span={4} style={{ position:"relative",marginTop:"30px" }} >
                   <img style={{ width:"130px",height:"130px",cursor:"pointer",zIndex:"1000",position:"relative" }} src={item.picUrl} alt="" title={item.name} onClick={ ()=>this.handleAlbum(item.id) }   />
                   <div className='discover-album-content-bg' style={{  }}></div>
                   <div 
                   onClick={ ()=>this.handleAlbum(item.id) }
                   style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"#2D2D2D",fontSize:"12px",cursor:"pointer" }}>
                          {item.name}
                   </div>
                   <div 
                   onClick={ ()=>this.handleArtist(item.artist.id) }
                   style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"12px",cursor:"pointer" }}>
                      {item.artist.name}
                   </div>
              </Col>
             
                                
        </Fragment>
    )
    } )
    return (
      <div className='discover-album'>
        <div className='header'>
          <Header />
        </div>
        <MusicPlay />

        <div className='discover-album-content' style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1300px" }}>
          <Row>
            <Col span={4}></Col>


            <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",padding:"20px" }}>
                <div className='discover-album-firstPart'>
                    <div className='discover-album-firstPart-title' style={{ fontSize:"20px",color:"#000",paddingBottom:"10px",borderBottom:"2px solid #C20C0C" }}>
                        热门新碟
                    </div>
                    {
                      renderNewAlbumData.length>0?
                      <div className='discover-album-firstPart-content'>
                      <Row>
                          {
                            renderNewAlbumData
                          }
                      </Row>
                    </div>
                    :<Spin />
                    }
                    

                    <div style={{ paddingBottom:"10px",borderBottom:"2px solid #C20C0C",marginTop:"30px" }}>
                        <div className='discover-album-secondPart-title' style={{ fontSize:"20px",color:"#000",display:"inline-block" }}>
                            全部新碟
                        </div>
                        <span style={{ marginLeft:"10px",marginRight:"10px",cursor:"pointer" }}  
                            onClick={ (ev)=>this.handleAreaData(ev,'ALL') }
                        >全部</span>
                        <span>|</span>
                        <span style={{ marginLeft:"10px",marginRight:"10px",cursor:"pointer" }}
                          onClick={ (ev)=>this.handleAreaData(ev,'ZH') }
                        >华语</span>
                        <span>|</span>
                        <span style={{ marginLeft:"10px",marginRight:"10px",cursor:"pointer" }}
                          onClick={ (ev)=>this.handleAreaData(ev,'EA') }
                        >欧美</span>
                        <span>|</span>
                        <span style={{ marginLeft:"10px",marginRight:"10px",cursor:"pointer" }}
                          onClick={ (ev)=>this.handleAreaData(ev,'KR') }
                        >韩国</span>
                        <span>|</span>
                        <span style={{ marginLeft:"10px",marginRight:"10px",cursor:"pointer" }}
                          onClick={ (ev)=>this.handleAreaData(ev,'JP') }
                        >日本</span>
                    </div>
                    {
                      renderNewAlbumAllData.length>0?
                      <div className='discover-album-firstPart-content'>
                      <Row>
                          {
                            renderNewAlbumAllData
                          }
                      </Row>
                    </div>
                    :<Spin/>
                    }
                   


                    <div style={{ marginTop:"40px" }}>
                     <Row style={{ textAlign:"center" }}>
                        <Pagination
                         total={this.props.newAlbumAllData.total} defaultPageSize={35} 
                         itemRender={(current, type, originalElement)=>this.itemRender(current, type, originalElement)}
                         onChange={ (current,size)=>this.handleChangePage(current,size) }
                         />
   
                     </Row>
                </div>
                </div>


            </Col>



            <Col span={4}></Col>
          </Row>
        </div>

        <div className='indexFooter'>
          <Footer />
        </div>
      </div>
    )
  }
}
export default DiscoverAlbum