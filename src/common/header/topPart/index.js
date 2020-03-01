import React,{Component} from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import { Row,Col, Tag,Input, Icon, Avatar } from 'antd';
import 'antd/dist/antd.css';

import LoginMenu from './loginMenu'
import NotLoginMenu from './notLoginMenu'
import './index.scss'
import docCookies from '../../../api/docCookies';
import axios from 'axios'
import { loginStatusRefresh } from '../../../api';

class TopPart extends Component {

    constructor(props){
        super(props);
        this.state={
            logined:false
        }
    }

    handleSearch=(value,event)=>{
       //这是router一个缺点,改变查询字符串的参数,页面不重新渲染,利用这个hack去解决这个问题
        this.props.history.push('/empty');
        setTimeout(() => {
            //push和replace都可以
            // this.props.history.push(`/search?s=${value}&type=1`);
            this.props.history.replace(`/search?s=${value}&type=1`);
        });
    }

    componentDidMount(){
            loginStatusRefresh().then( (res)=>{
                if(res.data.code===200){
                    axios.get('http://localhost:3000/login/status').then( (res)=>{
                        if(res.data.code)
                        this.props.loginDataFunc(res.data)
                      } ) 
                }
            } );
            
         
    }


    handleLogin=(boo)=>{
        if(boo) {
            loginStatusRefresh().then( (res)=>{
                if(res.data.code===200){
                    axios.get('http://localhost:3000/login/status',{ withCredentials: true }).then( (res)=>{
                        if(res.data.code)
                        this.props.loginDataFunc(res.data)
                      } ) 
                }
            } );
        }
        
        this.setState({
            logined:boo
        })
        this.forceUpdate();
      
    }
    
    dumpStore=()=>{
        this.props.history.push("https://music.163.com/store/product")
    }
   

    render(){
        
        let getItem = docCookies.getItem;
        //获取登录凭证
        let loginCertificate = getItem("__csrf");
        const  Search  = Input.Search;
        return (
            <div className='topPart-wrapper' style={{ minWidth:"1200px" }}>
                <Row gutter={30} >
                    
                    <Col  span={4}>
                        <div className='topPart-logo'>
                          &nbsp;
                        </div>  
                    </Col>
                    <Col span={10}>
                        <Row className='topPart-selectList' style={{ textAlign:"center" }} >
                            <Col span={4}>
                                  <NavLink activeClassName='active' to='/discover'>发现音乐</NavLink>
                            </Col>
                            <Col span={4}>
                                 <NavLink activeClassName='active' to='/my'>我的音乐</NavLink>
                            </Col>
                            <Col span={4}>
                                  <NavLink activeClassName='active' to='/friend'>朋友</NavLink>
                            </Col>
                            <Col span={4}>
                                 {/* 暂时没时间写这个,所以直接跳转到网易商城 */}
                                  {/* <NavLink activeClassName='active' to='/store/product' >商城</NavLink> */}
                                  <a href="https://music.163.com/store/product" target="_blank">商城</a>
                            </Col>
                            <Col span={4}>
                                {/* 暂时没时间写这个,所以直接跳转到网易音乐人 */}
                                  {/* <NavLink activeClassName='active' to='/store/product'>音乐人</NavLink> */}
                                  <a href="https://music.163.com/nmusician/web/index#/" target="_blank">音乐人</a>
                            </Col>
                            <Col span={4} style={{ position:"relative" }}>
                                {/* 暂时没时间写这个,所以直接跳转到下载端 */}
                                  <NavLink activeClassName='active' to='/dataSeenLogin'>数据可视化</NavLink>
                                  {/* <a href="https://music.163.com/#/download" target="_blank" >下载客户端</a> */}
                                  <Tag style={{ position:"absolute",top:"15px" }} color="#DD0D0D">Hot</Tag>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col span={10}>
                        <Row gutter={10}>
                            <Col style={{ textAlign:"right" }} span={10}>
                                <Search 
                                    placeholder='音乐/视频/电台/用户'
                                    style={{
                                        width:"158px",
                                        height:"32px",
                                        borderRadius:"20px"
                                    }}
                                    onSearch={ (value,event)=>this.handleSearch(value,event) }
                                />
                            </Col>
                            <Col span={6}>
                                <div className='creatorCenter'>创作者中心</div>
                            </Col>
                            <Col span={6}>

                                {
                                    loginCertificate?<LoginMenu loginData={this.props.loginData}  handleLogin={(boo)=>this.handleLogin(boo)}/>:<NotLoginMenu  handleLogin={(boo)=>this.handleLogin(boo)} />
                                }

                                {/* <Avatar icon='user' />
                                <Icon type="caret-down"  style={{  fontSize:"20px",marginLeft:"10px",marginTop:"10px",color:"#454545" }}/> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default withRouter(TopPart)
