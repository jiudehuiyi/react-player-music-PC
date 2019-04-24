import React, { Component } from 'react'
import FirstSong from '../../assets/images/firstSong.jpg'

//这个组件还没找到相应的接口,同时只加载了一张图片,比较简单所以再这里就直接引入了一张图片
 class MAt extends Component {
  render() {
    return (
      <div className='' style={{ width:"640px",margin:"0 auto" }}>
        <img src={FirstSong} alt="" />
      </div>
    )
  }
}
export default MAt 