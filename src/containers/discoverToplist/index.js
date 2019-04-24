import { connect } from 'react-redux';
import DiscoverToplist from '../../components/discoverToplist'
import { allPlaylistDataAction, toplistContentDataAction,toplistCommentDataAction } from '../../actions/discoverToplist';


const mapStateToProps = (state,ownProps)=>{
    return {
        allPlaylistData:state.allPlaylistDataReducer.data||{},
        toplistContentData:state.toplistContentDataReducer.data||{},
        toplistCommentData:state.toplistCommentDataReducer.data||{}
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        allPlaylistDataFunc:(data)=>{
            dispatch(allPlaylistDataAction(data))    
        },
        toplistContentDataFunc:(data)=>{
            dispatch(toplistContentDataAction(data))
        },
        toplistCommentDataFunc:(data)=>{
            dispatch(toplistCommentDataAction(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DiscoverToplist)
