import React, { Component } from 'react'

export default class Extends extends Component {

  collapseSub=(boo)=>{
    this.props.collapse(boo)
  }

  render() {
      const lyrics = this.props.lyrics;
      const txt = lyrics.txt;
      const renderTxt = txt.replace(/\n/gi,"<br />");
    return (
      <div>
        <div dangerouslySetInnerHTML={ {__html:renderTxt }}>

        </div>
        <div style={{ cursor:"pointer",marginTop:"20px" }} onClick={ ()=>this.collapseSub(true) }>
            收起^
        </div>
      </div>
    )
  }
}
