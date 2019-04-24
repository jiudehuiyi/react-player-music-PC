import React from 'react';
import { Row,Col,Input } from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'
class Test extends React.Component{

    constructor(props){
        super(props);
        this.state={
            obj:{}
        }
    }
   
    componentDidMount(){
        axios.get( "http://localhost:3000/song/url?id=33894312" ).then( (res)=>{
            this.setState({
                obj:res.data
            })
        } )
    }

    render(){
        // console.log( this.state.obj )
       
        return (
            <div>
                222
                {/* <audio  src="https://music.163.com/song/media/outer/url?id=33894312.mp3" autoPlay={true}/> */}
                
               
            </div>
        )
    }
}

export default Test
















