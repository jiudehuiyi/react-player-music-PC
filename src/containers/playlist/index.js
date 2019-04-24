import { connect } from 'react-redux';
import PlayList from '../../components/playlist';
import { playlistDataAction,playlistCommentDataAction, hotPlaylistDataAction } from '../../actions/playlist';


const mapStateToProps = (state,ownProps)=>{
    return {
        playlistData:state.playlistDataReducer.data||{},
        playlistCommentData:state.playlistCommentDataReducer.data ||{},
        hotPlaylistData:state.hotPlaylistDataReducer.data||{},
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        displayDataFunc:(data)=>{
            dispatch(playlistDataAction(data))
        },
        playlistCommentDataFunc:(data)=>{
            dispatch(playlistCommentDataAction(data))
        },
        hotPlaylistDataFunc:(data)=>{
            dispatch( hotPlaylistDataAction(data) )
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayList)
