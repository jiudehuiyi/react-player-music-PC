export const djDetailAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_DJDETAIL",
            data
        })
    }
}

export const djDetailListAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_DJDETAILList",
            data
        })
    }
}