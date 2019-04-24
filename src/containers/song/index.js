import { connect } from 'react-redux';
import Song from '../../components/song';
import { songDataAction ,songCommentDataAction,songLyricDataAction,similarSongDataAction,songUrlDataAction,songSingerInfoAction} from '../../actions/song';

const mapStateToProps = (state,ownProps)=>{
    return {
        songData:state.songDataReducer.data || {},
        songCommentData:state.songCommentDataReducer.data || {},
        songLyricData:state.songLyricDataReducer.data || {},
        similarSongData:state.similarSongData.data || {},
        songUrlData:state.songUrlDataReducer.data||{},
        songSingerInfo:state.songSingerInfoReducer.data||{},
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        //单曲数据
        songDataFunc:(data)=>{
            dispatch(songDataAction(data))
        },
        //单曲评论数据
        songCommentDataFunc:(data)=>{
            dispatch(songCommentDataAction(data))
        },
        //单曲歌词数据
        songLyricDataFunc:(data)=>{
            dispatch(songLyricDataAction(data))
        },
        similarSongFunc:(data)=>{
            dispatch(similarSongDataAction(data))
        },
        songUrlDataFunc:(data)=>{
            dispatch(songUrlDataAction(data))
        },
        songSingerInfoFunc:(data)=>{
            dispatch(songSingerInfoAction(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Song)



