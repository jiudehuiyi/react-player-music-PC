export const getUserDetailDataActionUserEvent = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_DETAIL_DATA",
            data
        })
    }
}

export const userEventDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_EVEN_DATA",
            data
        })
    }
} 
export const userFollowsDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_FOLLOWS_DATA",
            data,
        })
    }
}