
export const getLoginStatusAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"LOGIN_STATUS",
            data
        })
    }
}

export const getLoginPlaylistInfoAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"LOGIN_PLAYLIST_INFO",
            data
        })
    }
}
export const getLoginPlaylistContentAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"LOGIN_PLAYLIST_CONTENT",
            data
        })
    }
}

