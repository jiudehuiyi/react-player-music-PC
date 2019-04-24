
import { connect } from 'react-redux'
import Artist from '../../components/artist'
import { singerSongsDataAction,singerAlbumsDataAction,singerMvsDataAction,singerDesDataAction } from '../../actions/artists';


const mapStateToProps = (state,ownProps)=>{
    return {
        singerSongsData:state.singerSongsDataReducer.data||{},
        singerAlbumsData:state.singerAlbumsDataReducer.data||{},
        singerMvsData:state.singerMvsDataReducer.data||{},
        singerDesData:state.singerDesDataReducer.data||{},
    }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        singerSongsDataFunc:(data)=>{
            dispatch(singerSongsDataAction(data))
        },
        singerAlbumsDataFunc:(data)=>{
            dispatch(singerAlbumsDataAction(data))
        },
        singerMvsDataFunc:(data)=>{
            dispatch(singerMvsDataAction(data))
        },
        singerDesDataFunc:(data)=>{
            dispatch(singerDesDataAction(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Artist)

