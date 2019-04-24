

export const singerSongsDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SINGER_SONGS_DATA",
            data,
        })
    }
}
export const singerAlbumsDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SINGER_ALBUMS_DATA",
            data
        })
    }
}
export const singerMvsDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SINGER_MVS_DATA",
            data
        })
    }
}
export const singerDesDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SINGER_DES_DATA",
            data
        })
    }
}
