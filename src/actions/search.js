

export const searchDataAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"SEARCH_DATA",
            data
        })
    }
}

