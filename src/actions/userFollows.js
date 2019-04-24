


export const getUserDetailDataActionUserFollows = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_DETAIL_DATA",
            data
        })
    }
}
export const userFollowsDataActionUserFollows = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"USER_FOLLOWS_DATA",
            data
        })
    }
}