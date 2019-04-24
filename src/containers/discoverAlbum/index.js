import { connect } from 'react-redux';
import DiscoverAlbum from '../../components/discoverAlbum'
import { newAlbumDataAction, newAlbumAllDataAction } from '../../actions/discoverAlbum';


const mapStateToProps = (state,ownProps)=>{
    return {
        newAlbumData:state.newAlbumDataReducer.data||{},
        newAlbumAllData:state.newAlbumAllDataReducer.data||{},
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        newAlbumDataFunc:(data)=>{
            dispatch(newAlbumDataAction(data))
        },
        newAlbumAllDataFunc:(data)=>{
            dispatch(newAlbumAllDataAction(data))
        }

    }
}



export default connect(mapStateToProps,mapDispatchToProps)(DiscoverAlbum)

