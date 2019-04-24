

export const singerTypeDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SINGER_TYPE_DATA",
            data
        })
    }
}
 
export const hotSingerDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"HOT_SINGER_DATA",
            data
        })
    }
}

export const catSingerDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"CAT_SINGER_DATA",
            data
        })
    }
}
