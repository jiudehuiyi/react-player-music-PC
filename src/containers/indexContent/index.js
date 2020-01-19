import { connect } from 'react-redux';
import IndexContent from '../../components/indexContent'
import {hotCommend, newAlbumAction,topListAction,newListAction,originalListAction,enteringSingerAction,hotCommendTagsAction,recommendPlaylistAction,recommendSongsAction} from '../../actions/indexContent'
const mapStateToProps = (state,ownProps) =>{
    return {
        hotCommend:state.hotCommend.data,
        newAlbum:state.newAlbumReducer.data||{},
        topList:state.topListReducer.data || {},
        newList:state.newListReducer.data||{},
        originalList:state.originalListReducer.data||{},
        enteringSinger:state.enteringSingerReducer.data||{},
        hotCommendTags:state.hotCommendTagsReducer.data||{},
        recommendPlaylistData:state.recommendPlaylistReducer || {},
        recommendSongsData:state.recommendSongsReducer ||{},
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        hotCommendFunc:(data)=>{
            //请求热门推荐中的歌单
            dispatch(hotCommend(data));
        },
        //请求新碟上架的数据,接口有问题,先用获取全部新专辑的前十条先代替
        newDishShelfFunc: (data)=>{
            dispatch(newAlbumAction(data));
        } ,
        // 榜单云音乐的飙升榜
        topListFunc:(data)=>{
            dispatch(topListAction(data))
        },
        //云音乐新歌榜 
        newListFunc:(data)=>{
            dispatch(newListAction(data))
        },
        //原创歌曲榜
        originalListFunc:(data)=>{
            dispatch(originalListAction(data))
        },
        //获取入驻歌手数据 
        entertingSingerFunc:(data)=>{
            dispatch(enteringSingerAction(data))
        },
        //获取热门推荐的标签
        hotCommendTagsFunc:(data)=>{
            dispatch(hotCommendTagsAction(data))
        },
        //获取每日推荐歌单
        recommendPlaylistFunc:(data)=>{
            dispatch( recommendPlaylistAction(data) )
        },
        //获取每日推荐歌曲
        recommendSongsFunc:(data)=>{
            dispatch( recommendSongsAction(data) )
        }      
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(IndexContent);

