

export const songDataReducer = (state={},action)=>{
    switch(action.type){
        case "SONG_DATA":
            return {
                ...state,
                data:action.data
            }
         break;
         default :
          return state   
    }
}

export const songCommentDataReducer = (state={},action)=>{
    switch(action.type){
        case "SONG_COMMENT_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}
export const songLyricDataReducer = (state={},action)=>{
    switch(action.type){
        case "SONG_LYRIC_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state;
    }
}

export const similarSongData = (state={},action)=>{
    switch(action.type){
        case "SIMILAR_SONG_DATA":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}

export const songUrlDataReducer = (state={},action)=>{
    switch(action.type){
        case "SONG_URL_DATA":
        return {
            ...state,
            data:action.data
        }
        break;
        default :
            return state
    }
}
export const songSingerInfoReducer = (state={},action)=>{
    switch(action.type) {
        case "SONG_SINGER_INFO":
        return {
            ...state,
            data:action.data,
        }
        break;
        default :
            return state
    }
}
