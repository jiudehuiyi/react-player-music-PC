import React, { Component } from 'react';

class Des extends Component {
    render() {
        const singerDesData = this.props.singerDesData;
        const renderIntroduction = singerDesData.introduction&&singerDesData.introduction.map( (item,index)=>{
         return   <div className='des1' style={{ marginTop:"20px",marginBottom:"20px" }}>
            <div className='des1-title' style={{ color:"#333333",fontSize:"20px" }}>
                {
                    singerDesData.introduction[index].ti
                }
            </div>
            <div
                dangerouslySetInnerHTML={{ __html:singerDesData.introduction[index].txt.replace(/\n/gi,"<br />") }} 
                className='des1-content' 
                style={{ fontSize:"12px",lineHeight:"24px",textIndent:"20px" }}>
                
            </div>
           </div>
        } )
        return (
            <div className='artist-des'>
                <div className='des1' style={{ marginTop:"20px",marginBottom:"20px" }}>
                    <div className='des1-title' style={{ color:"#333333",fontSize:"20px" }}>
                        简介
                    </div>
                    <div className='des1-content' style={{ fontSize:"12px",lineHeight:"24px",textIndent:"20px" }}>
                         {
                             singerDesData.briefDesc
                         }
                    </div>
                </div>

                {
                    renderIntroduction
                }


           
                
                
                
                
                 </div>
        );
    }
}

export default Des;