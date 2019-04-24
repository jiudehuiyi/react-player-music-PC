

export const playlistDataReducer = (state={},action)=>{
    switch(action.type){
        case "PLAYLIST_DATA":
            return {
                ...state,
                data:action.data
            }   
        break;
        default :
            return state

    }
}
export const playlistCommentDataReducer=(state={},action)=>{
    switch(action.type){
        case "PLAYLIST_COMMENT_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
        default :
            return state    
    }
}

export const hotPlaylistDataReducer = (state={},action)=>{
    switch(action.type){
        case "HOT_PLAYLIST_DATA":
            return {
                ...state,
                data:action.data,
            }
            break;
            default :
                return state
    }
}