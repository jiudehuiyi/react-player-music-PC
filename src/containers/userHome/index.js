import { connect } from 'react-redux';
import UserHome from '../../components/userHome'
import { getUserDetailDataAction,userSingerPlayListAction,userHomePlaylistAction } from '../../actions/userHome';


 const getStateToProps = (state,ownProps)=>{
    return {
        userDetailData:state.getUserDetailDataReducer.data||{},
        userSingerPlayList:state.userSingerPlayListReducer.data||{},
        userHomePlaylist:state.userHomePlaylistReducer.data||{},
    }
}
 const getDispatchToProps = (dispatch,ownProps)=>{
    return {
        userDetailDataFunc:(data)=>{
            dispatch(getUserDetailDataAction(data))
        },
        userSingerPlayListFunc:(data)=>{
            dispatch(userSingerPlayListAction(data))
        },
        userHomePlaylistFunc:(data)=>{
            dispatch(userHomePlaylistAction(data))
        }
    }
}

export default connect(getStateToProps,getDispatchToProps)(UserHome)
