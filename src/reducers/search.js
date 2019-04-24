

export const searchDataReducer = (state={},action)=>{
    switch(action.type){
        case "SEARCH_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
         default :
            return state   
    }
}

