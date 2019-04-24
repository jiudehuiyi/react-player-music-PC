

export const getLoginStatusReducer = (state={},action)=>{
    switch(action.type){
        case "LOGIN_STATUS":
            return {
                ...state,
                data:action.data
            }
            break;
         default :
            return state   
    }
}

export const getLoginPlaylistInfoReducer = (state={},action)=>{
    switch(action.type){
        case "LOGIN_PLAYLIST_INFO":
            return {
                ...state,
                data:action.data
            }
            break;
         default :
            return state   
    }
}

export const getLoginPlaylistContentReducer = (state={},action)=>{
    switch(action.type) {
        case "LOGIN_PLAYLIST_CONTENT":
            return {
                ...state,
                data:action.data
            }
            break;
            default :
                return state
    }
}