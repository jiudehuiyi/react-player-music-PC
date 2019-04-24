


export const homeBanner=(state={},action)=>{
    switch(action.type) {
        //首页轮播图数据
        case "HOME_BANNER":
            return {
                ...state,
                homeBannerData:action.data
            }
         break;
         default:
            return state;


    }

}


