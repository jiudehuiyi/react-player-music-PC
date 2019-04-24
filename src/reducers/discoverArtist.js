

export const singerTypeDataReducer = (state={},action)=>{
    switch(action.type){
        case "SINGER_TYPE_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
         default :
            return state   
    }
}


export const hotSingerDataReducer = (state={},action)=>{
    switch(action.type){
        case "HOT_SINGER_DATA":
            return {
                ...state,
                data:action.data
            }
        break;
        default :
            return state    
        
    }
}
export const catSingerDataReducer = (state={},action)=>{
    switch(action.type){
        case "CAT_SINGER_DATA":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}

