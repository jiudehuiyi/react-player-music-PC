import React, { Component } from 'react'
import { withRouter,Link } from 'react-router-dom';
import { Button,Row,Col,Icon } from 'antd';
import 'antd/dist/antd.css'

 class Cat extends Component {

  constructor(props){
    super(props);
    this.state={
      alphaList:[
        {alpha:"热门"},
        {alpha:"A"},
        {alpha:"B"},
        {alpha:"C"},
        {alpha:"D"},
        {alpha:"E"},
        {alpha:"F"},
        {alpha:"G"},
        {alpha:"H"},
        {alpha:"I"},
        {alpha:"J"},
        {alpha:"K"},
        {alpha:"L"},
        {alpha:"M"},
        {alpha:"N"},
        {alpha:"O"},
        {alpha:"P"},
        {alpha:"Q"},
        {alpha:"R"},
        {alpha:"S"},
        {alpha:"T"},
        {alpha:"U"},
        {alpha:"V"},
        {alpha:"W"},
        {alpha:"X"},
        {alpha:"Y"},
        {alpha:"Z"},
        {alpha:"其他"},
      ],
      showStyle:"",
    }
  }
  
  dumpUser=(id)=>{
    this.props.history.push(`/user/home?id=${id}`)
  }

  handleClick=(alpha)=>{
    // if(alpha === '热门') {
    //   alpha='/'
    // }
    // const pathname = this.props.location.pathname;
    // const search = this.props.location.search;
    // const initial = alpha==='/'?"":`&initial=${alpha}`
    // this.props.history.push(`${pathname}${search}${initial}`)
    this.alpha=alpha;
    this.props.handleClickCat(alpha)
  }
  dumpArtists=(id)=>{
    this.props.history.push(`/artist?id=${id}`)
  }


  componentDidMount(){
    this.alpha='热门'
    this.search=this.props.location.search;
    if(!this.search) {
      this.props.history.push("/discover/artist/signed/");
    }
    this.id=this.search&&this.search.match(/\d+/gi).toString();
    switch(this.id) {
       case "1001":
       this.title="华语男歌手"
       break;
       case "1002":
       this.title='华语女歌手'
       break;
       case "1003":
       this.title="华语组合/乐队"
       break;
       case "2001":
       this.title="欧美男歌手"
       break;
       case "2002":
       this.title="欧美女歌手"
       break;
       case "2003":
       this.title="欧美组合/乐队"
       break;
       case "6001":
       this.title="日本男歌手"
       break;
       case "6002":
       this.title="日本女歌手"
       break;
       case "6003":
       this.title="日本组合/乐队"
       break;
       case "7001":
       this.title="韩国男歌手"
       break;
       case "7002":
       this.title="韩国女歌手"
       break;
       case "7003":
       this.title="韩国组合/乐队"
       break;
       case "4001":
       this.title="其他男歌手"
       break;
       case "4002":
       this.title="其他女歌手"
       break;
       case "4003":
       this.title="其他组合/乐队"
       break;
    }
  }
 
  
  render() {
    // console.log(this.props.catSingerData)
    const renderAlpha = this.state.alphaList.map( (item,index)=>{
      return (
        <div key={item.alpha}
        onClick={ ()=>this.handleClick(item.alpha) }
        style={{  
          display:"inline-block",padding:"7px",cursor:"pointer",height:"24px",textAlign:"center",color:"#5E5E5E",fontSize:"12px"
        }}>
          {
            this.alpha===item.alpha?<Button type="primary">{item.alpha}</Button>:item.alpha
          }
           
        </div>
      )
    } );
    const renderSinger = this.props.catSingerData.artists
                         &&this.props.catSingerData.artists.length>0?
                         this.props.catSingerData.artists.map( (item,index)=>{
                            return (
                              <Col span={6}>
                                <div style={{ marginTop:"20px" }} onClick={ ()=>this.dumpArtists(item.id) }>
                                  <img style={{ width:"150px",height:"150px",cursor:"pointer" }}  src={item.picUrl} alt=""/>
                                </div>
                                <div style={{ marginTop:"10px" }}>
                                    <div style={{ float:"left" }} onClick={ ()=>this.dumpArtists(item.id) }>{item.name}</div>
                                    {
                                      item.accountId?
                                          <div style={{ float:"right",cursor:"pointer" }}
                                          onClick={ ()=>this.dumpUser(item.accountId) }
                                        >
                                           <Icon type="weibo-circle" theme="filled" style={{ color:"#E2252B",fontSize:"16px" }} />
                                      </div>:null
                                    }
                                   
                                      <div className='clear' style={{ clear:"both" }}></div>
                                </div>
                              </Col>
                            )
                         } ):null;
    return ( 
        <div className='cat' style={{ borderLeft:"1px solid #E9E9E9",paddingBottom:"50px" }}>
            <div className='cat-title' style={{ padding:"50px 0px 10px 0px",margin:"0px 30px 0px 30px",fontSize:"24px",borderBottom:"2px solid #C20C0C" }}>
                {this.props.type||this.title}
            </div>
            <div style={{ marginLeft:"30px",marginRight:"30px",marginTop:"10px" }} className='select-alpha'>
              {
                renderAlpha
              }

            </div>
            <div className='cat-content' style={{ margin:"30px" }}>
                <Row gutter={30}>
                      {
                        renderSinger
                      }
                </Row>
            </div>
      </div>
    )
  }
}
export default withRouter(Cat)