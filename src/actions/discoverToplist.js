

export const allPlaylistDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"ALL_PLAYLIST_DATA",
            data
        })
    }
}

export const toplistContentDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"TOPLIST_CONTENT_DATA",
            data
        })
    }
}
export const toplistCommentDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"TOPLIST_COMMENT_DATA",
            data
        })
    }
}
