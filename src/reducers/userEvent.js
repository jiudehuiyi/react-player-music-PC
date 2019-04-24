export const getUserDetailDataReducerUserEven = (state={},action)=>{

    switch(action.type){

        case "USER_DETAIL_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
        default :
            return state    
    }

}   

export const userEvenDataReducer = (state={},action)=>{
    switch(action.type){
        case "USER_EVEN_DATA":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}

export const userFollowsDataReducer = (state={},action)=>{
    switch(action.type){
        case "USER_FOLLOWS_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}






