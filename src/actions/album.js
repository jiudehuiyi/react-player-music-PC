//专辑数据action
export const getAlbumAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_ALBUMDATA",
            data
        })
    }
}

//专辑评论的action

export const getAlbumCommentAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_ALBUMCOMMENTDATA",
            data
        })
    }
} 

//歌手的其他专辑
export const getSingerOtherAlbumAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"GET_SINGREOTHERALBUM",
            data
        })
    }
}
