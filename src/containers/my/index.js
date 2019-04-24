import { connect } from 'react-redux';
import My from '../../components/my';
import { getLoginStatusAction,getLoginPlaylistInfoAction,getLoginPlaylistContentAction } from '../../actions/my';

const mapStateToProps = (state,onwProps)=>{
    return {
        getLoginStatus:state.getLoginStatusReducer.data||{},
        getLoginPlaylistInfo:state.getLoginPlaylistInfoReducer.data||{},
        getLoginPlaylistContent:state.getLoginPlaylistContentReducer.data||{},
    }
}
const mapDispatchToProps = (dispatch,onwProps)=>{
    return {
        getLoginStatusFunc:(data)=>{
            dispatch(getLoginStatusAction(data))
        },
        getLoginPlaylistInfoFunc:(data)=>{
            dispatch(getLoginPlaylistInfoAction(data))
        },
        getLoginPlaylistContentFunc:(data)=>{
            dispatch(getLoginPlaylistContentAction(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(My)

