
export const commendTagsContentAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"COMMEND_TAGS_CONTENT",
            data
        })
    }
}
export const selectTagsDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SELECT_TAGS_DATA",
            data
        })
    }
}

