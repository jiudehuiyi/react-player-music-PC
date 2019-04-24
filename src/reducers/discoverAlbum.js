

export const newAlbumDataReducer = (state={},action)=>{
    switch(action.type){
        case "NEW_ALBUM_DATA":
            return {
                ...state,
                data:action.data
            }
         break;
         default :
            return state;   
    }
}

export const newAlbumAllDataReducer = (state={},action)=>{
    switch(action.type){
        case "NEW_ALBUM_ALL_DATA":
            return {
                ...state,
                data:action.data
            }
         break;
         default :
            return state;   
    }
}









