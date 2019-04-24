

export const loginDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"LOGIN_DATA",
            data,
        })
    }
}



