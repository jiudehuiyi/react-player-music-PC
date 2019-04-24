import axios from 'axios';

//同步版本获取首页轮播图 的Action
// export const getBannerAction = (data)=>{
//     return {
//         type:"HOME_BANNER",
//         data
//     }
// }

//利用redux-thunk库进行异步操作的Action
export const getBannerAction = (data)=>{
    return (dispatch,getState)=>{
        dispatch({
            type:"HOME_BANNER",
            data   
        })
    }
}


// export const getBannerAction = ()=>{
    
//     return (dispatch,getState)=>{
//         return axios.get('http://localhost:3000/banner').then( (res)=>{
//             dispatch({
//                           type:"HOME_BANNER",
//                         data:res.data   
//                         })
//         } )
      
//     }
// }



