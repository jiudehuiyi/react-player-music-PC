import React from "react";
import Header from "../../common/header";
import 'antd/dist/antd.css';
import { Row,Col } from "antd";
import Footer from "../../common/footer";
import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import { djDetail,deDetailList } from "../../api"
class DjRadioDetail extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        //电台详情
        let search = this.props.location.search.replace(/\?id=/g,"");
        
        djDetail(parseInt(search)).then( (res)=>{
            if( res.status === 200 ) {
                this.props.djDetailFunc( res.data );
            }else {
                console.log("请求错误...");
            }
        } ).catch( (err)=>{
            console.log(err);
        } )

        deDetailList(parseInt(search)).then( (res)=>{
            if(res.status === 200){
                this.props.djDetailList(res.data)
            }else {
                console.log("请求错误...")
            }
        } ).catch( err=>{
            console.log( err )
        } )
    }

    handleUp=(boo)=>{
        let search = this.props.location.search.replace(/\?id=/g,"");
        deDetailList(parseInt(search,boo)).then( (res)=>{
            if(res.status === 200){
                this.props.djDetailList(res.data)
            }else {
                console.log("请求错误...")
            }
        } ).catch( err=>{
            console.log( err )
        } )
    }
    handleDown=(boo)=>{
        let search = this.props.location.search.replace(/\?id=/g,"");

         deDetailList(parseInt(search),boo).then( (res)=>{
            if(res.status === 200){
                this.props.djDetailList(res.data)
            }else {
                console.log("请求错误...")
            }
        } ).catch( err=>{
            console.log( err )
        } )
    }
    render(){
        let djDetailData = this.props.djDetailData
        let djRadio = djDetailData.djRadio || {};
        let djDetailListData = this.props.djDetailListData;
        return (
            <div className='djRadioDetail' style={{ backgroundColor:"#F5F5F5",position:"relative",width:"100%",paddingBottom:"30px",minWidth:"1190px"  }}>
                <div className='djRadioDetail-header' style={{ backgroundColor:"#242424" }}>
                    <Header/>
                </div>

                <div className='djRadioDetail-content' style={{ marginTop:"30px"}}>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={18} style={{    backgroundColor:"#fff",border:"1px solid #D3D3D3",paddingBottom:"30px" }}>
                            <Row>
                                <Col span={17}>
                                    <div className='leftSide'>
                                         <LeftSide djRadio={djRadio} djDetailListData={djDetailListData}  handleUp={ (boo)=>this.handleUp(boo) } handleDown={ (boo)=>this.handleDown(boo) } />
                                    </div>
                                </Col>
                                <Col span={7}>
                                    <div className='rightSide'>
                                        <RightSide />
                                     </div>
                                </Col>
                            </Row>
                           
                           
                        </Col>
                        <Col span={3}></Col>
                    </Row>
                </div>

                <div className='djRadioDetail-footer'>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default DjRadioDetail;