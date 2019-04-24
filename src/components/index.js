import React,{Component} from 'react';

import './index.scss'
import Header from '../common/header'
import Bannner from '../containers/indexBanner/indexBanner'
import Footer from '../common/footer'
import IndexContent from '../containers/indexContent'
class Index extends React.Component {


    render(){
        return (
            <div className='home'>
                {/* //头部 */}
                <div className='header'>
                    <Header />
                </div>
                {/* //轮播图 */}
                <div className='indexBannner' >
                    <Bannner />
                </div>
                {/* 首页内容 */}
                <div className='indexContent'>
                    <IndexContent />
                </div>
                <div className='indexFooter'>
                    <Footer />
                </div>
            </div>
        )
    }

}


export default Index


