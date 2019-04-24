

export const newAlbumDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"NEW_ALBUM_DATA",
            data,
        }) 
    }
}

export const newAlbumAllDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"NEW_ALBUM_ALL_DATA",
            data
        })
    }
}