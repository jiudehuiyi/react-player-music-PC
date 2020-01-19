//电台分类action

export const djCateListAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_DJCATELIST",
            data
        })
    }
}
//优秀新电台
export const djCateListTypeAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_DJCATELISTTYPE",
            data
        })
    }
}

export const radioLeaderBorderAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"get_RADIOLEADERBORDER",
            data
        })
    }
}