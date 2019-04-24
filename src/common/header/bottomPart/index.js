import React, { Component } from 'react'
import { withRouter,NavLink } from 'react-router-dom'
import { Row,Col } from 'antd';
import 'antd/dist/antd.css';


 import './index.scss';
 class BottomPart extends Component {
    constructor(props) {
        super(props);
        this.state={
            discoverList:[]//列表菜单
        }
    }

    componentDidMount(){
        //获取当前的路径部分(不包括主机号和端口号)
        let pathname = this.props.location.pathname;
       
       
            this.setState({
                discoverList:[
                    {name:"推荐",link:"/discover"},
                    {name:"排行榜",link:"/discover/toplist"},
                    {name:"歌单",link:"/discover/playlist"},
                    {name:"主播电台",link:"/discover/djradio"},
                    {name:"歌手",link:"/discover/artist"},
                    {name:"新碟上市",link:"/discover/album"},
                ]
            })
        
        
    }

  render() {
    const  discoverList  = this.state.discoverList;
    //当数据的时候渲染列表,当没有数据的时候渲染null
    const discoverCol = discoverList.length>0?
    discoverList.map( (item,index)=>{
        return <Col key={item.name} span={4} style={{ textAlign:"center",lineHeight:"30px" }}>
                 <NavLink 
                    exact={true}
                    activeStyle={{ 
                        width:"50px",height:"20px",
                        display:"inline-block",lineHeight:"20px",
                        backgroundColor:"#9B0909",borderRadius:"10px",
                        fontSize:"12px"
                        }} 
                        style={{ color:"#fff" }} to={item.link}>
                        {item.name}
                 </NavLink>
               </Col>
    } )
    :null;

    return (
      <div className='bottomPart-wrapper' style={{ height:this.state.discoverList.length>0?"30px":'5px',minWidth:"1200px"  }}>
      <Row>
        <Col span={5}></Col>
        <Col span={9}>
            {
                discoverCol
            }
           
        </Col>
        <Col span={10}></Col>
      </Row>
       
      </div>
    )
  }
}

export default withRouter(BottomPart);
