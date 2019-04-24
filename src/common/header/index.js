import React,{ Component } from 'react';
import { connect } from 'react-redux'
import './index.scss';
import TopPart from './topPart';
import BottomPart from './bottomPart'
import { loginDataAction } from '../../actions/header';
import axios from 'axios';
import { message } from 'antd';
import 'antd/dist/antd.css'
import { loginStatusRefresh } from '../../api';
import MusicPlay from '../MusicPlay';

class Header extends Component{
    constructor(props){
        super(props);
        
    }

    

    componentDidMount(){
        
        
    }

    render(){
        // console.log(this.props.loginData)
        
        return (
            <div className='header-wrapper'>
            {/* handleLogin={ (boo,data)=>this.handleLogin(boo,data) }   */}
                <TopPart loginData={this.props.loginData}  loginDataFunc={this.props.loginDataFunc} />
                <BottomPart  />
            </div>
        )
    }
}


const mapStateToProps = (state,ownProps)=>{
    return {
        loginData:state.loginDataReducer.data||{},
    }
}

const mapDispatchToProps=(dispatch,ownProps)=>{
    return {
        loginDataFunc:(data)=>{
            dispatch(loginDataAction(data))
        }
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(Header)