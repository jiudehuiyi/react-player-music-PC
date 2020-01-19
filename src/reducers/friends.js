


export const friendsDataReducer = (state={},action)=>{
    switch(action.type){
        case "GET_FRIENDSDATA":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
        return state
    }
}

