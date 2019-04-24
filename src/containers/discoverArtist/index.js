import { connect } from 'react-redux';
import DiscoverArtists from '../../components/discoverArtist'
import { singerTypeDataAction,hotSingerDataAction,catSingerDataAction } from '../../actions/discoverArtist';

const mapStateToProps = (state,ownProps)=>{
    return {
        singerTypeData:state.singerTypeDataReducer.data||{},
        hotSingerData:state.hotSingerDataReducer.data||{},
        catSingerData:state.catSingerDataReducer.data||{},
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{

    return {
        singerTypeDataFunc:(data)=>{
            dispatch(singerTypeDataAction(data))
        },
        hotSingerDataFunc:(data)=>{
            dispatch(hotSingerDataAction(data))
        },
        catSingerDataFunc:(data)=>{
            dispatch(catSingerDataAction(data))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(DiscoverArtists)
