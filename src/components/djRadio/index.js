import React, { Component, Fragment } from 'react';
import { Row,Col,Carousel,Icon,Pagination } from 'antd';
import { NavLink,withRouter } from "react-router-dom"
import 'antd/dist/antd.css';
import Header from "../../common/header";
import Footer from "../../common/footer";
import './index.css'
import { djCateList,djCateListType,radioLeaderboard } from "../../api"
class DjRadio extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        //电台分类请求
        djCateList().then( (res)=>{
            
            if(res.data.code === 200) {
                this.props.djCateListFunc(res.data);
            }else {
                console.log("请求数据错误,错误码为:",res.data.code);
            }

        } ).catch( (err)=>{
            console.log( err )
        } )

        //电台分类对应的数据
         //优秀新电台数据
         djCateListType(2001).then( (res)=>{
            if(res.status === 200) {
                this.props.djCateListTypeFunc(res.data);
            }else {
                console.log("请求错误...")
            }
        } ).catch( (err)=>{
            console.log( err );
        } )

         //电台排行榜
         radioLeaderboard(2001).then( (res)=>{
            if(res.data.code === 200) {
                this.props.radioLeaderBorderFunc(res.data);
            }else {
                console.log("请求错误...")
            }
        } ).catch( (err)=>{
            console.log( err );
        } )
      
    }
   
    //切换下一面版
    nextPancel=()=>{
        this.carousel.next();
    }
    prevPancel=()=>{
        this.carousel.prev();
    }
    //点击某个item触发的函数
    diCateListItem=(index,currentId)=>{
       //优秀新电台数据
        djCateListType(currentId).then( (res)=>{
            if(res.status === 200) {
                this.props.djCateListTypeFunc(res.data);
            }else {
                console.log("请求错误...")
            }
        } ).catch( (err)=>{
            console.log( err );
        } )
        //电台排行榜
        radioLeaderboard(currentId).then( (res)=>{
            if(res.data.code === 200) {
                this.props.radioLeaderBorderFunc(res.data);
            }else {
                console.log("请求错误...")
            }
        } ).catch( (err)=>{
            console.log( err );
        } )
      
       
    }
    //跳转个人电台
    handlePersonDj=(id)=>{
        const url = `/djradio?id=${id}`;
        this.props.history.push(url);
    }
    //跳转到相对应的电台
    dumpDjradio=(id)=>{
        this.props.history.push(`/djradio?id=${id}`);
    }
    //跳转用户主页
    handleHome=(id)=>{
        this.props.history.push(`/user/home?id=${id}`);
    }
    //分页回调函数
    handleChange=(page,pageSize)=>{
          //电台排行榜
          radioLeaderboard(page).then( (res)=>{
            if(res.data.code === 200) {
                this.props.radioLeaderBorderFunc(res.data);
            }else {
                console.log("请求错误...")
            }
        } ).catch( (err)=>{
            console.log( err );
        } )
    }


    render(){
       // console.log( this.props.diCateListData )
       let search = this.props.location.search.replace(/\?/g,"");
       //电台分类数据
        const diCateListData = this.props.diCateListData.categories ?  this.props.diCateListData.categories:[];
       const diCateList1 = diCateListData.slice(0,10).map( (item,index)=>{
           //search string类型,item.id number类型,
            let fontColor = search === item.id.toString()?"#BD2D0B":"#888";
            let bgImage = search === item.id.toString()?"-48px -48px":"0px 0px";
            let borderStyle = search === item.id.toString()?"2px solid #BD2D0B":"2px solid transparent"
            let borderRadiusStyle = search === item.id.toString()?"5px":"";
           return (
               <Fragment key={item.name}>
                   <NavLink exact={true}  to={`/discover/djradio/category?${item.id}`} className="categoryOrigin"  >
                        <Col span={2} style={{ position:"relative",border:borderStyle,borderRadius:borderRadiusStyle }} key={item.name} onClick={ ()=>this.diCateListItem(index,item.id) }>
                            <div style={{ paddingLeft:"20%" }}>
                               <div style={{ width:"48px",height:"48px",backgroundImage:`url(${item.picWebUrl})`,backgroundPosition:bgImage }}></div>
                            </div>
                            <div style={{ fontSize:"12px",textAlign:"center",color:fontColor }} className="categoryDescription">{item.name}</div>
                        </Col>
                   </NavLink>
                    
               </Fragment>
           )
       } )
       const diCateList2 = diCateListData.slice(10,20).map( (item,index)=>{
        let fontColor = search === item.id.toString()?"#BD2D0B":"#888";
        let bgImage = search === item.id.toString()?"-48px -48px":"0px 0px";
        let borderStyle = search === item.id.toString()?"2px solid #BD2D0B":"2px solid transparent"
        let borderRadiusStyle = search === item.id.toString()?"5px":"";

        return (
            <Fragment key={item.name}>
                <NavLink to={`/discover/djradio/category?${item.id}`} className="categoryOrigin" >
                    <Col span={2} style={{ position:"relative",border:borderStyle,borderRadius:borderRadiusStyle }} key={item.name} onClick={ ()=>this.diCateListItem(index+10,item.id) }>
                        <div style={{ paddingLeft:"20%" }}>
                          <div style={{ width:"48px",height:"48px",backgroundImage:`url(${item.picWebUrl})`,backgroundPosition:bgImage  }}></div>
                        </div>
                        <div style={{ fontSize:"12px",textAlign:"center",color:fontColor }} className="categoryDescription">{item.name}</div>
                    </Col>
                 </NavLink>
            </Fragment>
        )
    } )
    //优秀新电台数据
    let djCateListTypeData = this.props.djCateListTypeData && (this.props.djCateListTypeData.djRadios)
    let djRadios = djCateListTypeData || [];
    djRadios = djRadios.length>=5?djRadios.slice(0,5):djRadios.slice(0);
    let djRadiosList = djRadios.map( (item,index)=>{
       return (
                <Fragment key={item.id}>
                    <Col span={4} style={{  }}>
                        <div onClick={ ()=>this.handlePersonDj(item.id) }> 
                                {
                                   <img width="150px" height="150px" style={{ borderRadius:"5px",cursor:"pointer" }} src={item.picUrl} alt="" title="" />
                                }
                        </div>
                        <div onClick={ ()=>this.handlePersonDj(item.id) } style={{ cursor:"pointer" }}>{item.name}</div>
                        <div style={{ color:"#999",fontSize:"12px",lineHeight:"18px" }}>{item.rcmdtext}</div>
                    </Col>
                    {
                        (index+1)%5!== 0 ?<Col span={1}></Col>:""
                    }
                </Fragment>
          )
    } );
    //电台排行榜数据(最热)
    const radioLeaderBorderData = this.props.radioLeaderBorderData;
    const radioLeaderBorderDataDjRadios = radioLeaderBorderData.djRadios || [];
    const renderRadioLeaderBorderDataRadios = radioLeaderBorderDataDjRadios.map( (item,index)=>{
        return (
            <Fragment key={item.id}>
                <Col span={11} style={{ borderBottom:"1px solid #E7E7E7",paddingBottom:"20px" }}>
                    <Row style={{ marginTop:"20px" }}>
                        <Col span={7} onClick={ ()=>this.dumpDjradio(item.id) }>
                            <img width="120px" height="120px" style={{ borderRadius:"5px",cursor:"pointer" }} src={item.picUrl} alt={item.name} title={item.name} />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={16}>
                            <h3 onClick={ ()=>this.dumpDjradio(item.id) } style={{ height:"50px",lineHeight:"50px",fontWeight:"bold",cursor:"pointer"  }}>{item.name}</h3>
                            <div onClick={ ()=>this.handleHome(item.dj.userId) }>
                                <Icon type="user" style={{ marginRight:"5px" }}/>
                                <span style={{ cursor:"pointer" }}>{item.dj.nickname || item.name}</span>
                            </div>
                            <div style={{ color:"#999",fontSize:"12px",marginTop:"10px" }}>
                                <span style={{ marginRight:"10px" }}>{`共${item.programCount}期`}</span>
                                 <span>{`订阅${item.subCount}次`}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={1}></Col>
            </Fragment>
        )
    } )
        return (
            <div className='djradio'>
                <div className='header'> 
                    <Header/>
                </div>

                <div className="djradio-content" style={{ marginTop:"30px",backgroundColor:"#F5F5F5",minWidth:"1300px" }}>
                    <Row>
                        <Col span={4}></Col>
                        <Col span={16} style={{ backgroundColor:"#fff",border:"1px solid #D3D3D3",padding:"20px" }}>
                            <div className='djradio-cateList' style={{paddingTop:"20px",paddingBottom:"20px",position:"relative" }}>
                                <div onClick={ ()=>this.prevPancel() }><Icon style={{ fontSize:"40px",position:"absolute",left:"0px",top:"65px",cursor:"pointer",zIndex:"100" }} type="left" /></div>

                                 <Carousel ref={ (duration)=>this.carousel=duration } >
                                <div >

                                    <Row style={{marginTop:"30px",position:"relative"  }}>
                                        
                                        <Col span={2} >
                                        </Col>
                                        <div style={{ height:"100px" }}>
                                            {diCateList1}
                                        </div>
                                        <Col span={2}>
                                        </Col>
                                        
                                    </Row>
                                </div>
                                <div>
                                <div >
                                    <Row style={{marginTop:"30px",position:"relative"  }}>
                                        
                                        <Col span={2} >
                                        </Col>
                                        <div style={{ height:"100px" }}>
                                            {diCateList2}
                                        </div>
                                        <Col span={2}>
                                        </Col>
                                        
                                    </Row>

                                </div>
                                    
                                </div>
                            </Carousel>
                                 <div onClick={ ()=>this.nextPancel() }><Icon style={{ fontSize:"40px",position:"absolute",right:"0px",top:"65px",cursor:"pointer",zIndex:"100" }} type="right" /></div>

                            </div>
                       
                            <div className='djradio-newDj'>
                                <div className='djradio-newDj-header'>
                                    优秀新电台
                                </div>
                                <div style={{ marginTop:"20px" }}>
                                    <Row >
                                        {
                                            djRadiosList
                                        }
                                    </Row>
                                </div>
                            </div>
                        
                            <div className='djradio-Leaderboard' style={{ marginTop:"30px" }}>
                                <div className='djradio-Leaderboard-list'>
                                    电台排行榜
                                </div>
                                <div style={{ marginTop:"20px" }}>
                                    <Row >
                                       {
                                           renderRadioLeaderBorderDataRadios
                                       }
                                    </Row>
                                </div>
                                <div style={{ textAlign:"center",marginTop:"30px",marginBottom:"100px" }}>
                                    <Pagination total={1000} defaultCurrent={1} onChange={(page,pageSize)=>this.handleChange(page,pageSize)  } />
                                </div>
                            </div>
                       
                        </Col>
                        <Col span={4}></Col>
                    </Row>
                    
              
                </div>

             
                <div className='footer' id="djRadioFooter">
                    <Footer />
                </div>
            </div>
        )
    }
}
 
export default withRouter(DjRadio);