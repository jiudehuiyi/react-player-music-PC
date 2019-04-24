
export const commendTagsContentReducer = (state={},action)=>{

    switch(action.type){
        case "COMMEND_TAGS_CONTENT":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
        return state
    }

}


export const selectTagsDataReducer = (state={},action)=>{
    switch(action.type){
        case "SELECT_TAGS_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}





