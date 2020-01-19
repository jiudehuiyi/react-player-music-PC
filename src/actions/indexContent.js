// indexContent action


export const hotCommend = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"HOT_COMMEND",
            data
        })
    }
}

export const newAlbumAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"NEW_ALBUM",
            data
        })
    }
}

export const topListAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"TOP_LIST",
            data
        })
    }
}

export const newListAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"NEW_LIST",
            data
        })
    }
}

export const originalListAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"ORIGIN_LIST",
            data
        })
    }
}

export const enteringSingerAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"ENTERING_SINGER",
            data
        })
    }
}

export const hotCommendTagsAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"HOT_COMMEND_TAGS",
            data
        })
    }
}

export const recommendPlaylistAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_RECOMMEND_PLAYLIST",
            data
        })
    }
}
export const recommendSongsAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_RECOMMEND_SONGS",
            data
        })
    }
}

