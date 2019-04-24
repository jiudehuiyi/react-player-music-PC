


export const getUserDetailDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_DETAIL_DATA",
            data
        })
    }
}

export const userSingerPlayListAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_SING_PLAY_LIST",
            data
        })
    }
}
export const userHomePlaylistAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_HOME_PLAYLIST",
            data
        })
    }
}