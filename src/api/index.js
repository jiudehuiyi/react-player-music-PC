// 获取数据API接口

import axios from 'axios';
//这是本地开发的基本URL
export const baseURL = "http://localhost:3000";

//这是线上开发的URL
// const baseURL = "http://xxx.xx.xx.xx:3000"
//获取轮播图API
export const getIndexBanner = ()=>{
    const url = `${baseURL}/banner`;
    return axios.get( url,{ withCredentials: true } )
}

//获取album专辑数据
export const getAlbum = (search)=>{
    const url = `${baseURL}/album${search}`;
    return axios.get( url,{ withCredentials: true } );
}

//获取专辑评论
export const getAlbumComment = (id,limit,offset)=>{
    let url = "";
    // console.log(`${baseURL}/comment/album${id}&limit=${limit}&offset=${offset}`)
    let num = (offset-1)*20;
    if(offset) {
         url = `${baseURL}/comment/album${id}&limit=${limit}&offset=${num}`;
    }else {
         url = `${baseURL}/comment/album${id}`;
    }
    // axios.get()
    
    return axios.get(url,{ withCredentials: true });
}

//确定某个数是单数还是复数
//addOrEven当是偶数的时候为true，当为奇数的时候为false
export const addOrEven = (number)=>{
    if( number%2 === 0 ) {
        return true;
    }else {
        false
    }
}

//获取歌手的专辑
export const getSingerAlbum = (id,limit)=>{
    const url = `${baseURL}/artist/album?id=${id}&limit=${limit}`;
    return axios.get(url,{ withCredentials: true });
}

//获取首页热门推荐中的数据

export const getHotCommend = ()=>{
    const url = `${baseURL}/personalized`;
    return axios(url,{ withCredentials: true });
}

//新碟上架全部数据新碟
export const getNewAlbumAll = (limit,offset,area)=>{

    let num = (offset-1)*limit;
    const url = `${baseURL}/top/album?limit=${limit}&offset=${offset}`;
    if(area) {
        return axios.get(`${url}&type=${area}`,{ withCredentials: true })
    }
    return axios.get(url,{ withCredentials: true })
}
//首页新碟上架数据新碟
export const getNewAlbum = ()=>{
    const url = `${baseURL}/album/newest`;
    return axios.get(url,{ withCredentials: true })
}

//首页榜单云音乐飙升榜数据
export const getIncreate = ()=>{
    const url = `${baseURL}/top/list?idx=3`;
    return axios.get(url,{ withCredentials: true });
}

//首页云音乐新歌榜
export const getNewList = ()=>{
    const url = `${baseURL}/top/list?idx=0`;
    return axios.get(url,{ withCredentials: true });
}
//首页原创歌曲榜
export const getOriginalList = ()=>{
    const url = `${baseURL}/top/list?idx=2`;
    return axios.get(url,{ withCredentials: true });
}

//请求入驻歌手的数据
export const getEnteringSinger = ()=>{
    const url = `${baseURL}/artist/list?cat=5001`;
    return axios.get(url,{ withCredentials: true });
}

//获取单曲详细数据
export const getSongData = (id)=>{
    const url =`${baseURL}/song/detail?ids=${id}`;
    return axios.get(url,{ withCredentials: true });
}
//获取单曲得评论数据
export const getSongComment = (id,limit,offset)=>{
    let url = "";
    let num = (offset-1)*20;
    if(offset){
        url = `${baseURL}/comment/music?id=${id}&limit=${limit}&offset=${num}`;

    }else {
        url = `${baseURL}/comment/music?id=${id}`;

    }
    return axios.get(url,{ withCredentials: true });
}





//获取单曲歌词
export const getSongLyric = (id)=>{
    const url = `${baseURL}/lyric?id=${id}`;
    return axios.get(url,{ withCredentials: true });
}
//获取相似歌曲
export const getSimilarSong = (id)=>{
    const url = `${baseURL}/simi/song?id=${id}`;
    return axios.get(url,{ withCredentials: true });
}

//获取热门推荐的标签

export const getHotCommendTags = ()=>{
    const url = `${baseURL}/playlist/hot`;
    return axios.get(url,{ withCredentials: true });
}

//获取热门推荐标签中的内容
export const getHotCommendTagsContent = (arr,limit,offset,string)=>{
    if(!arr) {
        return axios.get(`${baseURL}/top/playlist?order=${string}`,{ withCredentials: true });
    }
    let str = "";
    // offset = (offset-1)*limit;
    arr.forEach( (item,index)=>{
        str += `${item}&`
    } )
    str = str.slice(0,str.length-1);
    
    const url = `${baseURL}/top/playlist?${str}&limit=${limit}&offset=${offset}`;
    return axios.get(url,{ withCredentials: true });
}
//获取选择分类中的数据

export const getSelectTagsData = ()=>{
    const url = `${baseURL}/playlist/catlist`;
    return axios.get(url,{ withCredentials: true });
}
//请求playlist的URL数据
export const getPlaylistData = (id)=>{
    const url = `${baseURL}/playlist/detail${id}`;
    return axios.get(url,{ withCredentials: true });
}

//获取歌单playlist的评论数据
export const getPlayListCommentData = (id,limit,number)=>{
    let url = "";
    if(limit && number) {
        let offset = limit*(number-1);
         url = `${baseURL}/comment/playlist${id}&limit=${limit}&offset=${offset}`
    }else {
        url = `${baseURL}/comment/playlist${id}`;
    }
    return axios.get(url,{ withCredentials: true });
}

//请求playlist中的热门歌单(相似歌单)

export const getHotPlaylistLike = (id)=>{
    const url =`${baseURL}/related/playlist${id}`;
    return axios.get(url,{ withCredentials: true }); 
}
//所有榜单数据
export const allPlaylistData = (id)=>{
    const url = `${baseURL}/toplist`;
    return axios.get(url,{ withCredentials: true });
}
//获取榜单的内容,url地址为：/discover/toplist中的内容
export const toplistData = (id)=>{
    const url = `${baseURL}/playlist/detail${id}`
    return axios.get(url,{ withCredentials: true })
}
//获取歌单中的评论，url地址为：/discover/toplist中的评论
export const toplistCommentData = (id,limit,offset)=>{
    offset = (offset-1)*limit;
    const url = `${baseURL}/comment/playlist${id}&limit=${limit}&offset=${offset}`;
    return axios.get(url,{ withCredentials: true });
}


// 请求各个类型歌手数据
export const getSingerTypeData = (url,limit,offset)=>{
    if(limit) {
        return axios.get(`${baseURL}${url}&limit=${limit}`,{ withCredentials: true });
    }else if(limit && offset) {
        offset = limit*(offset-1); 
        return axios.get(`${baseURL}${url}&limit=${limit}&offset=${offset}`,{ withCredentials: true })
    }

    return axios.get(`${baseURL}${url}`,{ withCredentials: true })
}

export const getHotSingerData = ()=>{
    const url = `${baseURL}/top/artists?limit=80`;
    return axios.get(url,{ withCredentials: true });
}

export const getCatSingerData = (url,initial)=>{
    if(initial) {
        url = `${baseURL}${url}${initial}&limit=100`;
        return axios.get(url,{ withCredentials: true })
    }else {
        url = `${baseURL}${url}&limit=100`;  
        return axios.get(url,{ withCredentials: true })

    }
     
}

//获取用户详情,路由路径为 /user/home

export const getUserDetailData = (uid)=>{
    const url = `${baseURL}/user/detail?uid=${uid}`;
    return axios.get(url,{ withCredentials: true })
}
//登录状态刷新

export const loginStatusRefresh = ()=>{
    return axios.get('http://localhost:3000/login/status',{ withCredentials: true })
}
//退出登录接口
export const loginOut = ()=>{
    return axios.get('http://localhost:3000/logout',{ withCredentials: true })
}
//获取用户的播放排行榜

export const getUserPlayerList = (uid,type)=>{
    const url = `${baseURL}/user/record?uid=${uid}&type=${type}`;
    return axios.get(url,{ withCredentials: true })
} 
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const getUserSubCount = ()=>{
    const url = `${baseURL}/user/subcount`;
    return axios.get(url,{ withCredentials: true })
}
//请求userhome的歌单数据(包括创建和收藏的歌单)

export const getUserHomePlaylist = (id)=>{
    const url = `${baseURL}/user/playlist?uid=${id}`;
    return axios.get(url,{ withCredentials: true })
}
//发送私信不携带歌单
export const sendPersonMessage=(user_ids,msg)=>{

    const url = `${baseURL}/send/text?user_ids=${user_ids}&msg=${msg}`;
    return axios.get(url,{ withCredentials: true });
}
//关注用户
export const followUser = (id,t)=>{
    const url = `${baseURL}/follow?id=${id}&t=${t}`;
    return axios.get(url,{ withCredentials: true })
}
//获取用户动态
export const getUserEvenData = (id)=>{
    const url = `${baseURL}/user/event?uid=${id}`;
    return axios.get(url,{ withCredentials: true })
}
//获取用户关注的人
export const getUserFollowsData =  (id)=>{
    const url = `${baseURL}/user/follows?uid=${id}`;
    return axios.get(url,{ withCredentials: true });
}

//歌曲的播放数据
export const getSongUrlData = (id)=>{
    const url = `${baseURL}/song/url?id=${id}`;
    return axios.get(url,{ withCredentials: true })
}
//获取每日推荐歌单
export const getPlaylistEveryData = ()=>{
    const url=`${baseURL}/recommend/resource`;
    return axios.get(url,{ withCredentials: true });
}
//刷新登录状态
export const getLoginStatus = ()=>{
    const url = `${baseURL}/login/refresh`;
    return axios.get(url,{ withCredentials: true })
}
//搜索的API
export const getSearchData = (keyword,type,offset,limit)=>{
    let url = ``;
    if(limit) {
        offset = (offset-1)*limit;
        url=`${baseURL}/search?keywords=${keyword}&type=${type}&offset=${offset}`
    }else if(type) {
        url = `${baseURL}/search?keywords=${keyword}&type=${type}`
    }else{
        url = `${baseURL}/search?keywords=${keyword}`;
   } 
    return axios.get(url,{ withCredentials: true });
}

//歌手单曲,路由为artist?id=
export const getSingerSongs = (id)=>{
    const url = `${baseURL}/artists?id=${id}`;
    return axios.get(url,{ withCredentials: true });
}
//获取歌手专辑,路由为artist/album?id=
export const getSingerAlbums = (id)=>{
    const url = `${baseURL}/artist/album?id=${id}`;
    return axios.get(url,{ withCredentials: true });
}
//获取歌手mv/artist/mv?id=
export const getSingerMvs = (id)=>{
    const url = `${baseURL}/artist/mv?id=${id}`;
    return axios.get(url,{ withCredentials: true });
}
//获取歌手描述/artist/desc?id=
export const getSingerDesc = (id)=>{
    const url = `${baseURL}/artist/desc?id=${id}`;
    return axios.get(url,{ withCredentials: true });
}
//获取短信验证码
export const getMessageCode=(phoneNumber)=>{
    const url=`${baseURL}/captcha/sent?phone=${phoneNumber}`;
    return axios.get(url,{withCredentials:true});
}

//验证验证码
export const checkMessageCode=(phoneNumber,messageCode)=>{
    const url = `${baseURL}/captcha/verify?phone=${phoneNumber}&captcha=${messageCode}`;
    return axios.get(url,{withCredentials:true});
}
//注册
export const registerApi = (nickname,password,phoneNumber,messageCode)=>{
    const url = `${baseURL}/register/cellphone?phone=${phoneNumber}&password=${password}&captcha=${messageCode}&nickname=${nickname}`;
    return axios.get(url,{withCredentials:true});
}
//电台分类
export const djCateList = ()=>{
    const url = `${baseURL}/dj/catelist`;
    return axios.get(url,{withCredentials:true});
}
//电台分类推荐(优秀新电台)
export const djCateListType = (id)=>{
    const url = `${baseURL}/dj/recommend/type?type=${id}`;
    return axios.get(url,{withCredentials:true});
}
//最热电台排行榜:http://localhost:3000/dj/radio/hot?cateId=2001
export const radioLeaderboard = (id,offset)=>{
    offset = (offset-1)*30;
    let url ;
    if( offset ) {
        url = `${baseURL}/dj/radio/hot?cateId=${id}&offset=${offset}`;
    }
     url = `${baseURL}/dj/radio/hot?cateId=${id}`;
    return axios.get(url,{withCredentials:true});
}
// 获取电台详情
export const djDetail = (id)=>{
    const url = `${baseURL}/dj/detail?rid=${id}`;
    return axios.get(url,{withCredentials:true})
}
//电台节目表,这里为了简便省略limit，offset，只取30条数据
export const deDetailList = (rid,asc)=>{
    const url = `${baseURL}/dj/program?rid=${rid}&asc=${asc||false}`;//asc默认为false，当不存的时候
    return axios.get(url,{withCredentials:true});
}
//每日推荐歌曲
export const recommendPlaylist = ()=>{
    const url = `${baseURL}/recommend/resource`;
    return axios.get(url,{withCredentials:true});
} 
//获取每日推荐歌曲
export const recommendSongs = ()=>{
    const url = `${baseURL}/recommend/songs`;
    return axios.get(url,{withCredentials:true});
}
//私人fm
export const personFM = ()=>{
    const url = `${baseURL}/personal_fm`;
    return axios.get(url,{withCredentials:true})
}
//获取动态消息
export const getDyncMessage = ()=>{
    const url = `${baseURL}/event`;
    return axios.get(url,{withCredentials:true})
}
