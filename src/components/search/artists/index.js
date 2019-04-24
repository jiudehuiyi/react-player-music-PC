import React, { Component } from 'react';
import { Row,Col } from 'antd'
import { withRouter } from 'react-router-dom'
import  'antd/dist/antd.css';
import SearchSelectList  from '../searchSelectList'
class Artists extends Component {
    dumpArtists=(id)=>{
        this.props.history.push(`/artist?id=${id}`)
    }
    render() {
        const searchData = this.props.searchData;
        const searchDataArtists =  searchData.result&&searchData.result.artists;
        const renderSearchDataArtists =  searchDataArtists&&searchDataArtists.length>0&&searchDataArtists.map( (item,index)=>{
            return (
                <Col style={{ display:"inline-block",marginTop:"20px" }}>
                    <div style={{ width:"130px",height:"130px",cursor:"pointer" }} onClick={ ()=>this.dumpArtists(item.id) }>
                        <img style={{ width:"130px",height:"130px" }} src={item.picUrl} alt="" title=""   />
                    </div>
                    <div style={{ marginTop:"10px",cursor:"pointer" }}>
                        <div style={{ float:"left" }} onClick={ ()=>this.dumpArtists(item.id) }>{item.name}</div>
                        <div style={{ clear:"both" }}></div>
                    </div>
                </Col>
            )
        }  )
        return (
            <div className='search-artists'>
                <div className='search-artists-title' style={{ color:"#999999",fontSize:"12px" }}>
                    搜索"{this.props.keyword}"找到 
                    <span style={{ color:"#C20C0C",fontWeight:"bold" }}>{searchData.result&&searchData.result.artistCount}</span> 个歌手
                </div>   

                <div className='ssearch-artists-searchList'>
                    <SearchSelectList  keyword={this.props.keyword}  type={  this.props.type }/>
                </div>       

                <div>
                    <Row gutter={15}>
                        {
                            renderSearchDataArtists
                        }
                        
                    </Row>
                </div> 
        
        
         </div>
        );
    }
}

export default withRouter(Artists);