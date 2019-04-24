
export const allPlaylistDataReducer = (state={},action)=>{
    switch(action.type){
        case "ALL_PLAYLIST_DATA":
            return {
                ...state,
                data:action.data
            }
        break;
        default :
            return state;    
    }
}

export const toplistContentDataReducer = (state={},action)=>{
    switch(action.type){
        case "TOPLIST_CONTENT_DATA":
            return {
                ...state,
                data:action.data,
            }
            break;
            default :
                return state
    }
}

export const toplistCommentDataReducer = (state={},action)=>{
    switch(action.type){
        case "TOPLIST_COMMENT_DATA":
            return {
                ...state,
                data:action.data
            }
           break;
           default :
            return state 
    }
}



