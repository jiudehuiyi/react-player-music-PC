export const getUserDetailDataReducerUserFollows = (state={},action)=>{

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

export const userFollowsDataReducerUserFollows= (state={},action)=>{

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