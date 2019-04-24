
export const playlistDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"PLAYLIST_DATA",
            data
        })
    }
}

export const playlistCommentDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"PLAYLIST_COMMENT_DATA",
            data
        })
    }
}
export const hotPlaylistDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"HOT_PLAYLIST_DATA",
            data
        })
    }
}