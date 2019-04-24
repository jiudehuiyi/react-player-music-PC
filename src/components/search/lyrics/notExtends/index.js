import React, { Component } from 'react'

export default class NotExtends extends Component {

    notCollapseSub=(boo)=>{
        this.props.collapse(boo)
    }

  render() {
    const lyrics = this.props.lyrics;
    let txt = lyrics.txt;
    txt = txt.split(/\n/gi).slice(0,4).join("-");
    console.log(txt)
    const renderTxt = txt.replace(/-/gi,"<br />");

    return (
      <div>
            <div dangerouslySetInnerHTML={ {__html:renderTxt }}>

            </div>
            <div style={{ cursor:"pointer",marginTop:"20px" }} onClick={ ()=>this.notCollapseSub(false) }>
              展开v
            </div>
      </div>
    )
  }
}
