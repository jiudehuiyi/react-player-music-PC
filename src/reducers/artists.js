

export const singerSongsDataReducer = (state={},action)=>{
    switch(action.type){
        case "SINGER_SONGS_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}

export const singerAlbumsDataReducer = (state={},action)=>{
    switch(action.type){
        case "SINGER_ALBUMS_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}
export const singerMvsDataReducer = (state={},action)=>{
    switch(action.type){
        case "SINGER_MVS_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}

export const singerDesDataReducer = (state={},action)=>{
    switch(action.type){
        case "SINGER_DES_DATA":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}

