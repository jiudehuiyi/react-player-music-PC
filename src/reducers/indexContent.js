// indexContent Reducer

export const hotCommend=(state={},action)=>{
    switch(action.type) {
        case "HOT_COMMEND":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}

export const newAlbumReducer = (state={},action)=>{
    switch(action.type){
        
        case "NEW_ALBUM":

        return {
            ...state,
            data:action.data
        }
        break;
        default:
            return state
    }
}

export const topListReducer = (state={},action)=>{
    switch(action.type){
        case "TOP_LIST":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}

export const newListReducer = (state={},action)=>{
    switch(action.type){
        case "NEW_LIST":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}

export const originalListReducer = (state={},action)=>{
    switch(action.type){
        case "ORIGIN_LIST":
        return {
            ...state,
            data:action.data,
        }
        break;
        default :
            return state
    }
}
export const enteringSingerReducer = (state={},action)=>{
    switch(action.type){
        case "ENTERING_SINGER" :
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}

export const hotCommendTagsReducer = (state={},action)=>{
    switch(action.type){
        case "HOT_COMMEND_TAGS":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}

export const recommendPlaylistReducer = (state={},action)=>{
    switch(action.type){
        case "GET_RECOMMEND_PLAYLIST":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}

export const recommendSongsReducer = (state={},action)=>{
    switch(action.type){
        case "GET_RECOMMEND_SONGS":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}