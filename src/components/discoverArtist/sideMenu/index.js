import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
 class SideMenu extends Component {

  constructor(props){
    super(props);
    this.state={
      //由于没有数据接口,所以用state来模拟
      artists:[
        {type:"推荐歌手",now:false,url:"/discover/artist/",id:0,},
        {type:"入驻歌手",now:true,url:"/discover/artist/signed/",id:1,dataPath:"/artist/list?cat=5001"},
        {type:"华语男歌手",now:false,url:"/discover/artist/cat?id=1001",id:2,dataPath:"/artist/list?cat=1001"},
        {type:"华语女歌手",now:false,url:"/discover/artist/cat?id=1002",id:3,dataPath:"/artist/list?cat=1002"},
        {type:"华语组合/乐队",now:false,url:"/discover/artist/cat?id=1003",id:4,dataPath:"/artist/list?cat=1003"},
        {type:"欧美男歌手",now:false,url:"/discover/artist/cat?id=2001",id:5,dataPath:"/artist/list?cat=2001"},
        {type:"欧美女歌手",now:false,url:"/discover/artist/cat?id=2002",id:6,dataPath:"/artist/list?cat=2002"},
        {type:"欧美组合乐队",now:false,url:"/discover/artist/cat?id=2003",id:7,dataPath:"/artist/list?cat=2003"},
        {type:"日本男歌手",now:false,url:"/discover/artist/cat?id=6001",id:8,dataPath:"/artist/list?cat=6001"},
        {type:"日本女歌手",now:false,url:"/discover/artist/cat?id=6002",id:9,dataPath:"/artist/list?cat=6002"},
        {type:"日本组合/乐队",now:false,url:"/discover/artist/cat?id=6003",id:10,dataPath:"/artist/list?cat=6003"},
        {type:"韩国男歌手",now:false,url:"/discover/artist/cat?id=7001",id:11,dataPath:"/artist/list?cat=7001"},
        {type:"难过女歌手",now:false,url:"/discover/artist/cat?id=7002",id:12,dataPath:"/artist/list?cat=7002"},
        {type:"韩国组合/乐队",now:false,url:"/discover/artist/cat?id=7003",id:13,dataPath:"/artist/list?cat=7003"},
        {type:"其他男歌手",now:false,url:"/discover/artist/cat?id=4001",id:14,dataPath:"/artist/list?cat=4001"},
        {type:"其他女歌手",now:false,url:"/discover/artist/cat?id=4002",id:15,dataPath:"/artist/list?cat=4002"},
        {type:"其他组合乐队",now:false,url:"/discover/artist/cat?id=4003",id:16,dataPath:"/artist/list?cat=4003"},
      ]
    }
  }

  componentDidMount(){
  }

  handleDump=(ev,router,index,dataPath,type)=>{
    // this.props.history.push(router);
    this.props.handleClick(router,dataPath,type)

    let arr = [];
    this.state.artists.forEach( (item)=>{
      if(item.id === index) {
        item.now=true;
        arr.push(item)
      }else {
        item.now=false;
        arr.push(item)
      }
    } )
      this.setState({
        artists:arr
      })

    
  }

  render() {
    const renderRecommend = this.state.artists.slice(0,2).map( (item,index)=>{
      return (
          <div  key={item.type}
            ref={ (duration)=>this.playClick=duration }
          onClick={ (ev)=>this.handleDump(ev,item.url,item.id,item.dataPath) }
          style={{ height:"30px",lineHeight:"30px",fontSize:"12px",marginTop:"10px",cursor:"pointer",border:item.now?"1px solid #DADADA":"1px solid transparent",backgroundColor:item.now?"#FAFAFA":"" }}>  
          <span style={{   width:"5px", height:"5px",display:"inline-block",backgroundColor:item.now?"#C20C0C":"#AFAFAF",verticalAlign:"middle",marginLeft:"10px",marginRight:"10px", }}></span> 
          <span style={{ color:item.now?"#C20C0C":"" }}>{item.type}</span> 
        </div>
      )
    } )
    const renderChinese =  this.state.artists.slice(2,5).map( (item,index)=>{
      
      return (
          <div  key={item.type}
          onClick={ (ev)=>this.handleDump(ev,item.url,item.id,item.dataPath,item.type) }
          style={{ height:"30px",lineHeight:"30px",fontSize:"12px",marginTop:"10px",cursor:"pointer",border:item.now?"1px solid #DADADA":"1px solid transparent",backgroundColor:item.now?"#FAFAFA":"" }}>  
          <span style={{   width:"5px", height:"5px",display:"inline-block",backgroundColor:item.now?"#C20C0C":"#AFAFAF",verticalAlign:"middle",marginLeft:"10px",marginRight:"10px", }}></span> 
          <span style={{ color:item.now?"#C20C0C":"" }}>{item.type}</span> 
        </div>
      )
    } )

    const renderERandAm = this.state.artists.slice(5,8).map( (item,index)=>{
      return (
          <div  key={item.type}
          onClick={ (ev)=>this.handleDump(ev,item.url,item.id,item.dataPath,item.type) }
          style={{ height:"30px",lineHeight:"30px",fontSize:"12px",marginTop:"10px",cursor:"pointer",border:item.now?"1px solid #DADADA":"1px solid transparent",backgroundColor:item.now?"#FAFAFA":"" }}>  
          <span style={{   width:"5px", height:"5px",display:"inline-block",backgroundColor:item.now?"#C20C0C":"#AFAFAF",verticalAlign:"middle",marginLeft:"10px",marginRight:"10px", }}></span> 
          <span style={{ color:item.now?"#C20C0C":"" }}>{item.type}</span> 
        </div>
      )
    } )

    const renderJapan = this.state.artists.slice(8,11).map( (item,index)=>{
      return (
          <div  key={item.type}
          onClick={ (ev)=>this.handleDump(ev,item.url,item.id,item.dataPath,item.type) }
          style={{ height:"30px",lineHeight:"30px",fontSize:"12px",marginTop:"10px",cursor:"pointer",border:item.now?"1px solid #DADADA":"1px solid transparent" ,backgroundColor:item.now?"#FAFAFA":""}}>  
          <span style={{   width:"5px", height:"5px",display:"inline-block",backgroundColor:item.now?"#C20C0C":"#AFAFAF",verticalAlign:"middle",marginLeft:"10px",marginRight:"10px", }}></span> 
          <span style={{ color:item.now?"#C20C0C":"" }}>{item.type}</span> 
        </div>
      )
    } )
    const renderKorea = this.state.artists.slice(11,14).map( (item,index)=>{
      return (
          <div  key={item.type}
          onClick={ (ev)=>this.handleDump(ev,item.url,item.id,item.dataPath,item.type) }
          style={{ height:"30px",lineHeight:"30px",fontSize:"12px",marginTop:"10px",cursor:"pointer",border:item.now?"1px solid #DADADA":"1px solid transparent",backgroundColor:item.now?"#FAFAFA":"" }}>  
          <span style={{   width:"5px", height:"5px",display:"inline-block",backgroundColor:item.now?"#C20C0C":"#AFAFAF",verticalAlign:"middle",marginLeft:"10px",marginRight:"10px", }}></span> 
          <span style={{ color:item.now?"#C20C0C":"" }}>{item.type}</span> 
        </div>
      )
    } )
    const renderOther = this.state.artists.slice(14,17).map( (item,index)=>{
      return (
          <div  key={item.type}
          onClick={ (ev)=>this.handleDump(ev,item.url,item.id,item.dataPath,item.type) }
          style={{ height:"30px",lineHeight:"30px",fontSize:"12px",marginTop:"10px",cursor:"pointer",border:item.now?"1px solid #DADADA":"1px solid transparent",backgroundColor:item.now?"#FAFAFA":"" }}>  
          <span style={{   width:"5px", height:"5px",display:"inline-block",backgroundColor:item.now?"#C20C0C":"#AFAFAF",verticalAlign:"middle",marginLeft:"10px",marginRight:"10px", }}></span> 
          <span style={{ color:item.now?"#C20C0C":"" }}>{item.type}</span> 
        </div>
      )
    } )

    return (
      <div className='side-menu' style={{ marginTop:"50px" }}>
      {/* //推荐的列表 */}
        <div className='side-menu-recommend' style={{ paddingLeft:"5px",paddingRight:"5px",paddingBottom:"10px" }}>
            <div style={{ borderBottom:"1px solid #D3D3D3",padding:"5px" }}>
                <div className='side-menu-recommend-title' style={{ fontSize:"18px",fontWeight:"bold",color:"#000" }}>推荐</div>
                {
                  renderRecommend
                }
            </div>
        </div>
              {/* //华语列表 */}
        <div className='side-menu-recommend' style={{ paddingLeft:"5px",paddingRight:"5px",paddingBottom:"10px" }}>
            <div style={{ borderBottom:"1px solid #D3D3D3",padding:"5px" }}>
                <div className='side-menu-recommend-title' style={{ fontSize:"18px",fontWeight:"bold",color:"#000" }}>华语</div>
                {
                  renderChinese
                }
            </div>
        </div>
        {/* 欧美列表 */}
        <div className='side-menu-recommend' style={{ paddingLeft:"5px",paddingRight:"5px",paddingBottom:"10px" }}>
            <div style={{ borderBottom:"1px solid #D3D3D3",padding:"5px" }}>
                <div className='side-menu-recommend-title' style={{ fontSize:"18px",fontWeight:"bold",color:"#000" }}>欧美</div>
                {
                  renderERandAm
                }
            </div>
        </div>
        {/* 日本列表 */}
        <div className='side-menu-recommend' style={{ paddingLeft:"5px",paddingRight:"5px",paddingBottom:"10px" }}>
            <div style={{ borderBottom:"1px solid #D3D3D3",padding:"5px" }}>
                <div className='side-menu-recommend-title' style={{ fontSize:"18px",fontWeight:"bold",color:"#000" }}>日本</div>
                {
                  renderJapan
                }
            </div>
        </div>
        {/* 韩国列表 */}
        <div className='side-menu-recommend' style={{ paddingLeft:"5px",paddingRight:"5px",paddingBottom:"10px" }}>
            <div style={{ borderBottom:"1px solid #D3D3D3",padding:"5px" }}>
                <div className='side-menu-recommend-title' style={{ fontSize:"18px",fontWeight:"bold",color:"#000" }}>韩国</div>
                {
                  renderKorea
                }
            </div>
        </div>
        {/* //其他列表 */}
        <div className='side-menu-recommend' style={{ paddingLeft:"5px",paddingRight:"5px",paddingBottom:"10px" }}>
            <div style={{ borderBottom:"1px solid #D3D3D3",padding:"5px" }}>
                <div className='side-menu-recommend-title' style={{ fontSize:"18px",fontWeight:"bold",color:"#000" }}>其他</div>
                {
                  renderOther
                }
            </div>
        </div>
     </div>
    )
  }
}
export default withRouter(SideMenu)