

export const albumData = (state={},action)=>{
    switch(action.type){
        case "GET_ALBUMDATA" :
            return {
                ...state,
                data:action.data
            }

           

        default :
            return state    
    }
}

//专辑中的评论数据
export const albumCommentData = (state={},action)=>{
    switch(action.type) {
        case "GET_ALBUMCOMMENTDATA" :
        return {
            ...state,
            data:action.data
        }    

        default :
            return state 
    }
}

export const singerOtherAlbum = (state={},action)=>{
    switch(action.type) {
        case "GET_SINGREOTHERALBUM" :
        return {
            ...state,
            data:action.data
        }
        default :
            return state
    }
}
