import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Signed from './signed'//路由为/discover/artist/signed/的组件
import Recommend from './recommend'//路由为/discover/artist/组件
import Cat from './cat' //路由为/discover/artist/cat?id=的路由
 class SideContent extends Component {



  render() {
    // console.log(this.props.type)
    let pathname = this.props.location.pathname;
    //由于这个页面的路由比较特殊,有3个不同一类的路由,所以这里头部脚部和左侧内容是一样的,右侧内容是不一样的,所以只改变右侧内容的组件
    return (
      <div className='side-content'>
        {
          pathname==="/discover/artist/signed/"?
          <div className='discover-artist-signed' >
          <Signed 
             loading={this.props.loading}
            singerTypeData={ this.props.singerTypeData }  
            loadMoreSinger={(singerNumber)=>this.props.loadMoreSinger(singerNumber)}/>

          </div>
          :(pathname==="/discover/artist/"?
          <div><Recommend  singerTypeData={ this.props.singerTypeData }  hotSingerData={this.props.hotSingerData}/></div>
          :<div className='discover-artist-cat'>
              <Cat  type={this.props.type} catSingerData={this.props.catSingerData}  handleClickCat={ (alpha)=>this.props.handleClickCat(alpha) } />
          </div>)
        }
      </div>
    )
  }
}
export default withRouter(SideContent)