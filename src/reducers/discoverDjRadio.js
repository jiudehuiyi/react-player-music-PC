
export const djCateListReducer=(state={},action)=>{
    switch(action.type){
        case "GET_DJCATELIST":
            return {
                ...state,
                data:action.data
            }
         break;
         default :
            return state;   
    }
}

export const djCateListTypeReducer = (state={},action)=>{
    switch(action.type){
        case "GET_DJCATELISTTYPE":
            return {
                ...state,
                data:action.data
            }
        break;
        default :
            return state;    
    }
}

export const radioLeaderBorderReducer = (state={},action)=>{
    switch(action.type){
        case "get_RADIOLEADERBORDER":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}
