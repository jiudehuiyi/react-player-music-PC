import { connect } from  'react-redux';
import DiscoverPlaylist from '../../components/discoverPlaylist';
import { commendTagsContentAction,selectTagsDataAction } from '../../actions/discoverPlaylist';

const mapStateToProps = (state,ownProps)=>{
    return {
        commendTagsContentData:state.commendTagsContentReducer.data||{},
        selectTagsData:state.selectTagsDataReducer.data || {},
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        hotCommendTagsContentFunc:(data)=>{
            dispatch(commendTagsContentAction(data))
        },
        selectTagsDataFunc:(data)=>{
            dispatch(selectTagsDataAction(data));
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(DiscoverPlaylist)



