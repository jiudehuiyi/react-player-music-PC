
export const friendsDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_FRIENDSDATA",
            data,
        })
    }
}


