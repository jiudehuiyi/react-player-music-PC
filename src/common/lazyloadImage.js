import React, { Component } from 'react'
import LazyLoad from 'vanilla-lazyload';
import { Spin } from 'antd';
import lazyloadConfig from "../assets/lazyload";


// Only initialize it one time for the entire application
if (!document.lazyLoadInstance) {
    document.lazyLoadInstance = new LazyLoad(lazyloadConfig);
  }
  

export default class LazyImage extends Component {

// Update lazyLoad after first rendering of every image
componentDidMount() {
    console.log(222)
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
      console.log(333)
    document.lazyLoadInstance.update();
  }

  render() {
    const { alt, src, srcset, sizes, width, height } = this.props;

    return (
     
         <img
        alt={alt}
        className="lazy"
        data-src={src}
        data-srcset={srcset}
        data-sizes={sizes}
        width={width}
        height={height}
        callback_exit={(el)=>{console.log("Exited", el)}}
        callback_enter={ (el)=>{console.log("Entered", el)} }
        />
    )
  }
}
