import { connect } from 'react-redux';

import Album from '../../components/album';
import { getAlbumAction,getAlbumCommentAction,getSingerOtherAlbumAction } from '../../actions/album'

const mapStateToProps = (state,props)=>{
    // console.log(state)
    return {
        //专辑中的数据
        albumData:state.albumData.data||{},
        //专辑评论数据
        albumCommentData:state.albumCommentData.data||{},
        //专辑中的歌手的其他专辑
        singerOtherAlbum:state.singerOtherAlbum.data || []
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        //专辑数据函数
        getAlbumData:(data)=>{
            dispatch(getAlbumAction(data))
        },
        //专辑评论数据
        getAlbumCommentData:(data)=>{
            dispatch(getAlbumCommentAction(data))
        },
        //歌手其他专辑数据
        getSingerOtherAlbum:(data)=>{
            dispatch(getSingerOtherAlbumAction(data))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Album)
