import  React, { Component, Fragment } from 'react';
import { Row,Col,Carousel,Icon } from 'antd';
import { Link,withRouter } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.scss'
class NewDishShelf extends Component {

    handleAlbum=(id)=>{
        this.props.history.push(`/album?id=${id}`);
    }
    handleArtist=(id)=>{
        this.props.history.push(`/artist?id=${id}`)
    }
    nextAlbum=()=>{
        this.carousel.next()
    }
    prevAlbum=()=>{
        this.carousel.prev()
    }

  render() {
      const newAlbum = this.props.newAlbum;
      const firstPageAlbum = newAlbum.slice(0,5);
      const secondPageAlbum = newAlbum.slice(5,10);
      const renderFirstPageAlbum = firstPageAlbum.map( (item,index)=>{
          return (
              <Fragment key={item.name}>
                    <Col span={4} style={{ position:"relative" }} >
                         <img style={{ width:"100px",height:"100px",cursor:"pointer",zIndex:"1000",position:"relative" }} src={item.picUrl} alt="" title={item.name} onClick={ ()=>this.handleAlbum(item.id) }   />
                         <div className='newdishshelf-content-bg'></div>
                         <div 
                         onClick={ ()=>this.handleAlbum(item.id) }
                         style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"#2D2D2D",fontSize:"12px" }}>
                                {item.name}
                         </div>
                         <div 
                         onClick={ ()=>this.handleArtist(item.artist.id) }
                         style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"12px",cursor:"pointer" }}>
                            {item.artist.name}
                         </div>
                    </Col>
                    {
                        index+1%5?<Col span={1}></Col>  :null
                    }
                                      
              </Fragment>
          )
      } )
      const renderSecondPageAlbum = secondPageAlbum.map( (item,index)=>{
        return (
            <Fragment key={item.name}>
                  <Col span={4} style={{ position:"relative" }} >
                       <img style={{ width:"100px",height:"100px",cursor:"pointer",zIndex:"1000",position:"relative" }} src={item.picUrl} alt="" title={item.name} onClick={ ()=>this.handleAlbum(item.id) }   />
                       <div className='newdishshelf-content-bg'></div>
                       <div 
                       onClick={ ()=>this.handleAlbum(item.id) }
                       style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:"#2D2D2D",fontSize:"12px" }}>
                              {item.name}
                       </div>
                       <div 
                       onClick={ ()=>this.handleArtist(item.artist.id) }
                       style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:"12px",cursor:"pointer" }}>
                          {item.artist.name}
                       </div>
                  </Col>
                  {
                      index+1%5?<Col span={1}></Col>  :null
                  }
                                    
            </Fragment>
        )
    } )
    return (
      <div className='new_dish_shelf' style={{ marginTop:"50px", }}>
            <div className='new_dish_shelf-title' style={{ paddingBottom:"5px",borderBottom:"2px solid #C10D0C" }}>
                <Row gutter={10}> 
                    <Col span={1} className='newdishshelf-title-logo'></Col>
                    <Col span={6} style={{ fontSize:"20px",color:"#000" }}>新碟上架</Col>
                    <Col span={15}></Col>
                    <Col style={{ fontSize:"12px",textAlign:"center",marginTop:"10px" }} span={2}>
                            <Link style={{ color:"#000" }} to={`/discover/album/`} >更多</Link>
                            <span className='more-icon'></span>
                    </Col>
                </Row>
            </div>
            <div className='new_dish_shelf_content'  >
                <Col span={1} 
                onClick={ ()=>this.prevAlbum() }
                style={{ position:"relative",top:"40%",fontSize:"20px",cursor:"pointer" }}>
                  <Icon type="left" />
                </Col>
                <Col span={22}>
                    <Carousel dots={false} ref={ (duration)=>this.carousel=duration } >
                        <div >
                            <Row style={{marginTop:"30px"  }}>
                                {
                                    renderFirstPageAlbum
                                }
                            </Row>
                        </div>
                        <div>
                            <Row style={{marginTop:"30px"  }}>
                            {
                                renderSecondPageAlbum
                            }
                            </Row>
                            
                        </div>
                    </Carousel>
                </Col>
               <Col span={1} 
                onClick={ ()=>this.nextAlbum() }
               style={{ position:"relative",top:"40%",textAlign:"right",fontSize:"20px",cursor:"pointer" }}>
                   <Icon type="right" /> 
               </Col>    
            </div>
      </div>
    )
  }
}
export default  withRouter(NewDishShelf)