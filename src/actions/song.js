
//单曲数据
export const songDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SONG_DATA",
            data
        })
    }
}
//歌曲评论数据
export const songCommentDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SONG_COMMENT_DATA",
            data
        })
    }
}

//歌曲歌词数据
export const songLyricDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SONG_LYRIC_DATA",
            data
        })
    }
}

//相似歌曲数据
export const similarSongDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SIMILAR_SONG_DATA",
            data
        })
    }
}

//歌曲播放数据
export const songUrlDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SONG_URL_DATA",
            data
        })
    }
}

//歌手歌曲数据
export const songSingerInfoAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SONG_SINGER_INFO",
            data
        })
    }
}