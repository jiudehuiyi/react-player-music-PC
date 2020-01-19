export const djDetailReducer = (state={},action)=>{
    switch(action.type){
        case "GET_DJDETAIL":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
        return state
    }
}

export const djDetailListReducer = (state={},action)=>{
    switch(action.type){
        case "GET_DJDETAILList":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
        return state
    }
}