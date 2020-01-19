import React, { Component } from 'react';
import { Row,Col } from 'antd';
import 'antd/dist/antd.css';

import { getHotCommend,getNewAlbum,getIncreate,getNewList,getOriginalList,getEnteringSinger,getHotCommendTags,getLoginStatus,recommendPlaylist,recommendSongs,personFM } from '../../api';
import HotRecommend from './hotrecommend';
import NewdishShelf from './newdishshelf';
import HomeList from './homeList'
import UserLogin from './userLogin'
import HotDj from './hotdj'
import { formatHotCommend,formatHotCommendTags } from '../../api/formatIndexContent'
import EnteringSinger from './enteringSinger';
import PersonalRecommend from './personalRecommend'
import MusicPlay from '../../common/MusicPlay';
import docCookies from "../../api/docCookies"
 class IndexContent extends Component {

  constructor(props){
    super(props);
  
  }

  componentDidMount(){
    //请求热门推荐中的歌单
    getHotCommend().then( (res)=>{
   
      this.props.hotCommendFunc(res.data);
      
    } )
    //请求新碟上架数据
    getNewAlbum().then( (res)=>{
      this.props.newDishShelfFunc(res.data)
    } )

    //获取榜单云音乐的飙升榜
    getIncreate().then( (res)=>{
      this.props.topListFunc(res.data)
    } )
    //首页云音乐新歌榜
    getNewList().then( (res)=>{
      this.props.newListFunc(res.data)
    } )

    getOriginalList().then( (res)=>{
      this.props.originalListFunc(res.data)
    } )
    //获取入驻歌手数据
    getEnteringSinger().then( (res)=>{
      this.props.entertingSingerFunc(res.data)
    } )
    //获取热门推荐的标签
    getHotCommendTags().then( (res)=>{
        this.props.hotCommendTagsFunc(res.data)
    } )

    let loginCertificate = docCookies.getItem("__csrf");
    if( loginCertificate ) {
      //获取每日推荐歌单
      recommendPlaylist().then( (res)=>{
        if(res.status === 200) {
          this.props.recommendPlaylistFunc(res.data);
        }else {
          console.log( "请求错误..." )
        }
      } ).catch( err=>{
        console.log( err )
      } )
    }
    //获取每日推荐歌曲
    recommendSongs().then( (res)=>{
      if( res.status === 200 ) {
        this.props.recommendSongsFunc( res.data )
      }else {
        console.log("请求错误...");
      }
    } ).catch( err=>{
      console.log( err )
    } )
    

  
  }

  render() {
    const hotCommend = this.props.hotCommend?formatHotCommend(this.props.hotCommend.result):[];
    const newAlbum = this.props.newAlbum.code === 200 ?this.props.newAlbum.albums :null;
    const hotCommendTags = this.props.hotCommendTags.tags||[];
    const renderHotCommendTags = formatHotCommendTags(hotCommendTags).slice(0,5);
    // console.log(newAlbum)
    //登录凭证
    let loginCertificate = docCookies.getItem("__csrf");
    return (
      <div style={{ minWidth:"1150px" }}>
       <MusicPlay />
        <Row gutter={10}>
            <Col span={3}></Col>
            <Col span={18}>
                <Row >
                  <Col span={18}  style={{ border:"1px solid #D3D3D3",borderTop:"none",paddingLeft:"30px",paddingTop:"25px",paddingBottom:"50px",paddingRight:"30px" }}>
                      {/* //热门推荐歌单 */}
                      <div className='Hotrecommend'>
                          <HotRecommend  hotCommend={hotCommend} hotCommendTags = { renderHotCommendTags } />
                      </div>
                    
                      {/* 这个需要再登录之后菜可以获取数据 */}
                      <div className='personalRecommend'>
                        {
                          loginCertificate?<PersonalRecommend recommendPlaylistData={this.props.recommendPlaylistData} recommendSongsData={ this.props.recommendSongsData }/>:<div></div>
                        }
                          
                      </div>
                      {/*新碟上架组件 */}
                      <div className='newDishShelf'>
                          <NewdishShelf  newAlbum = { newAlbum ||[] }  />
                      </div>
                      {/* 首页榜单数据 */}
                      <div className='homelist'>
                          <HomeList topList={ this.props.topList } newList={ this.props.newList } originalList={ this.props.originalList } />
                      </div>
                      
                  </Col>
                  <Col span={6}>
                      <UserLogin />
                      <EnteringSinger enteringSinger={this.props.enteringSinger} />
                      <HotDj />
                  </Col>
                </Row>
            
            </Col>
            <Col span={3}></Col>
        </Row>
      </div>
    )
  }
}
export default IndexContent