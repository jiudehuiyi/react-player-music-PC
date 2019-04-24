import React, { Component } from 'react'
import { Button,Icon,Row,Col } from 'antd';

import {withRouter,NavLink} from 'react-router-dom'
import {getHotCommendTagsContent} from '../../../api/';
import 'antd/dist/antd.css';

 class SelectTags extends Component {

  constructor(props){
    super(props);
    this.state={
      icons:[
        <Icon type="global" />,
        <Icon type="database" />,
        <Icon type="coffee" />,
        <Icon type="smile" />,
        <Icon type="tags" />
      ]
    }
  }

  
  //点击相应的标签,请求相应的资源
  handleClick=(name)=>{
    // this.props.history.push(`/discover/playlist?cat=${name}`)
     //获取查询字符串
     this.search = decodeURIComponent(this.props.location.search);
      //得到查询字符串的多参数
    this.getSearchParamter = this.search.match(/\w+=(\w+|[\u4e00-\u9fa5]+|\d)/gi);
    const index = this.search.indexOf('order=');
    this.order = this.search.slice(index+6,index+9);
    const realOrder = this.order?`&order=${this.order}`:"";    
    const hotOrNew = realOrder.slice(7);
    this.props.history.push(`/discover/playlist?cat=${name}&order=${hotOrNew}`)
   
    
   
    // getHotCommendTagsContent(this.getSearchParamter,35,0).then( (res)=>{
    //       this.props.hotCommendTagsContentFunc(res.data)
    // } ) 
    getHotCommendTagsContent([`cat=${name}`],35,0).then( (res)=>{
      this.props.hotCommendTagsContentFunc(res.data)
    } )

  }

  //选择全部请求数据
  handleAll=(isExtends)=>{
    this.props.history.push('/discover/playlist')

      // isExtends是当点击全部后收起选择菜单
      this.props.selectedExtends(isExtends)
      getHotCommendTagsContent(null).then( (res)=>{
        this.props.hotCommendTagsContentFunc(res.data)
      } )
  }

  render() {

    //获取查询字符串
    // this.search = decodeURIComponent(this.props.location.search);
    // //得到查询字符串的多参数
    //  this.getSearchParamter = this.search.match(/\w+=(\w+|[\u4e00-\u9fa5]+|\d)/gi);
    // console.log(this.props.selectTagsData)
    //种类分类
    const categories = this.props.selectTagsData.categories?this.props.selectTagsData.categories:null;
    //种类分类的菜单
    const sub = this.props.selectTagsData.sub || this.props.selectTagsData.length>0?this.props.selectTagsData.sub:[];
    // console.log(sub)
    //将categories对象转化为数组
    let categoriesArr = [];
    for(let index in categories) {
      categoriesArr.push(categories[index])
    }
    //将sub分组
    let subArr = [ [],[],[],[],[] ];
    sub.forEach( (item,index)=>{
      switch(item.category) {
        case 0:
           subArr[0].push(item);
        break;
        case 1 :
          subArr[1].push(item)
        break;
        case 2 :
          subArr[2].push(item)
        break;
        case 3 :
          subArr[3].push(item)
        break;
        case 4 :
          subArr[4].push(item)
        break;  
      }
    } )


    //渲染分类
    const renderCategories = categoriesArr &&categoriesArr.length>0 ?categoriesArr.map( (item,index)=>{
      
      return (
        <div key={item}>
          <Row style={{ marginBottom:"30px" }}>
              <Col span={4} style={{ textAlign:"center" }}>
                <div className='title' style={{}}>
                    <span style={{ fontSize:"20px",verticalAlign:"middle",marginRight:"10px" }}>{this.state.icons[index]}</span>
                    <span style={{ color:"#515151",fontWeight:"bold",verticalAlign:"middle" }}>{item}</span>
                </div>
              </Col>
              <Col span={20}>
                <div>
                  {
                    subArr[index].map( (item,index)=>{
                      return (
                        <span key={item.name} style={{ 
                            lineHeight:"20px",height:"20px",paddingLeft:"10px",paddingRight:"10px",
                            borderRight:"1px solid #dddddd",
                             }}>
                             <span  onClick={ ()=>{this.handleAll(!this.props.isExtends),this.handleClick(item.name)} } style={{ color:"#333333",fontSize:"12px",cursor:"pointer" }} >
                                  {item.name}
                             </span>
                        </span>
                      )
                    } )
                  }
                 </div>
              </Col>
          </Row>
            
            
        </div>
      )
    } ):null;



    
   
    return (
      <div className='selectTags' 
          style={{ 
              width:"700px",height:"100x",
              position:"absolute",left:"-110px",top:"45px",
              border:"1px solid #C6C6C6",boxShadow:"0px 0px 5px #C6C6C6",marginTop:"30px",
              zIndex:"200",backgroundColor:"#fff",borderRadius:"5px"
              }}>
          <div className='selectTags-all' style={{ margin:"20px",borderBottom:"1px solid #E6E6E6",paddingBottom:"5px" }}>
              <Button onClick={ ()=>this.handleAll(!this.props.isExtends) } style={{ backgroundColor:"#F6F6F6" }} >全部风格</Button>
          </div>
          <div className='selectTagsData-sort'>
              {
                renderCategories
              }
          </div>
      </div>
    )
  }
}
export default withRouter(SelectTags)