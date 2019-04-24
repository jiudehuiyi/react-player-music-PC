import IndexBannner from "../components/indexBanner/indexBannner";

//格式化轮播图数据的类
class HomeBanner {
    constructor({imageUrl,url,targetId,backgroundUrl,targetType}){
        this.imageUrl=imageUrl;//轮播图地址
        this.url=url;//来源于那张专辑
        this.targetId=targetId;//专辑id
        this.backgroundUrl=backgroundUrl;//背景图
        this.targetType=targetType;//歌曲类型
    }
}

//创建这个类的实例
 const createHomeBanner = (banners)=>{
   
    return new HomeBanner({
        imageUrl:banners.imageUrl,
        url:banners.url,
        targetId:banners.targetId,
        backgroundUrl:banners.backgroundUrl,
        targetType:banners.targetType,
    })
}

//格式化首页轮播图数据
export const formatHomeBanner = (banners)=>{
    let arr = [];
    banners.forEach( (item,index)=>{
        arr.push( createHomeBanner(item) )
    } )
    return arr;
}






//格式化专辑中的artists歌手数据

const formatArtists = (artists)=>{
    let str = '';
    artists.forEach( (item,index)=>{
        str += `${item.name}/`
    } )
    return str
}



//格式化专辑数据的类

 class Album {
    constructor({ picUrl,description,name,company,publishTime,artists,info,artistId }){
        this.picUrl = picUrl;//专辑图片
        this.description = description;//专辑描述
        this.name = name;//专辑名
        this.company = company;//专辑出版公司
        this.publishTime = publishTime;//出版时间
        this.artists = artists;
        this.info = info;
        this.artistId = artistId;//专辑中的歌手ID
    }
}
//格式化专辑中的artist，获取当中的ID值

const formatArtistGetId = (list)=>{
    return list.id;
}


//创建这个类的实例

export  const formatAlbum = (album)=>{
    //判断对象是否为空
    // console.log(album.album)
    if(JSON.stringify(album)==='{}'){
        return;
    }else {
        if(album.album) {
            return new Album({
                picUrl:album.album.picUrl,
                description:album.album.description,
                name:album.album.name,
                company:album.album.company,
                publishTime:album.album.publishTime,
                artists:formatArtists(album.album.artists),
                info:album.album.info,
                artistId:formatArtistGetId(album.album.artist)
            })
        }else {
            return;
        }
        
    }
   
}

//格式化日期小于10的补0,大于10的直接显示


export const formatDate = (date)=>{
    return date<10?`0${date}`:date;
}
//格式化月日
export const formatMonthDate = (time)=>{
    let times = new Date(time);
    const months = formatDate(times.getMonth()+1);
    const day = formatDate(times.getDate());
    return  `${months}月${day}日`
}
//格式化年月日
export const formatYearMonthDate=(time)=>{
    let times = new Date(time);
    const years = times.getFullYear();
    const months = formatDate(times.getMonth()+1);
    const day = formatDate(times.getDate());
    return  `${years}.${months}.${day}`
}

//对转发数和评论数进行格式化
export const formatForwardAndComment = (list)=>{
    const obj={};
    if(  JSON.stringify(list) === '{}'  ) {
        return ;
    }else {
        obj.commentCount = list.info.commentCount;
        obj.shareCount = list.info.shareCount;
        return obj;  
    }
   
    
}

//对专辑中的歌曲进行格式化

class songInAlbum {
    constructor({name,dt,ar,mv,id}){
        this.name = name;//歌曲名
        this.dt = dt;//播放时间
        this.ar = ar;//歌手名
        this.mv = mv;//是否存在mv
        this.id=id;
    }
}

//格式化歌手名
const formatSingerName = (name)=>{
    let str = "";
    name.forEach( (item,index)=>{
        str+=`${item.name}/`
    } )
    return str;
}

 const createSongInAlbum = (songs)=>{
    if( JSON.stringify(songs) !== '{}' ) {
        return new songInAlbum({
            name:songs.name,
            dt:songs.dt,
            ar:formatSingerName(songs.ar),
            mv:songs.mv,
            id:songs.id,
        })
    }else {
        return;
    }
    
}

export const formatSongInAlubm = (list)=>{
    const arr = [];
    if(list.length>0) {
        list.forEach( (item,index)=>{
            arr.push( createSongInAlbum(item) );
        } )
        return arr;
    }else {
        return;
    }
    
}

//格式化歌曲时间
export const formatSongTime = (dt)=>{
    const date = new Date(dt);
    const minutes = formatDate(date.getMinutes());
    const second = formatDate(date.getSeconds());
    return `${minutes}:${second}`
}

//对专辑中的评论格式化
class albumComment {
    constructor({total,comments,hotComments}){
        this.total = total;//专辑中的评论总数量
        this.comments = comments;//专辑中一页的评论数
        this.hotComments = hotComments;
    }
}

export const createAlbumComment = (list)=>{
    return new albumComment({
        total:list.total,
        comments:list.comments,
        hotComments:list.hotComments
    })
}

//对专辑中的热门评论格式化
class HotComment{
    constructor({user,content,time,likedCount}){
        this.user = user;//格式化用户数据(包括用户头像和用户名)
        this.content = content;//用户发表的内容
        this.time = time;//用户发表的时间
        this.likedCount = likedCount;//喜欢的人数,多少个赞
    }
}
//格式化热门评论中的头像和名字
const formatAvatarAndNicknameInHotComment = (user)=>{
    let obj = {};
    obj.nickname = user.nickname;
    obj.avatarUrl = user.avatarUrl;
    return obj;
}

const createHotComment = (list)=>{
    return new HotComment({
        user:formatAvatarAndNicknameInHotComment(list.user),
        content:list.content,
        time:list.time,
        likedCount:list.likedCount
    })
}

export const formatHotComment = (hotComments)=>{
    let arr = [];
    hotComments.forEach( (item,index)=>{
        arr.push(createHotComment(item))
    } )
    return arr;
}

//格式化专辑中热门评论发表评论的时间
export const formatHotCommentPublishTime = (time)=>{
    //传进来的是评论时间,是一个毫秒数
    const passDt = new Date(time);
    const passYears = passDt.getFullYear();
    const passMonths = passDt.getMonth()+1;
    const passDate = passDt.getDate();
    //对时和分进行补零操作
    const passHours = formatDate(passDt.getHours());
    const passMinutes =formatDate( passDt.getMinutes());

    //now是现在时间的毫秒数
    const now = Date.now();
    const nowDt = new Date(now);
    const nowYears = nowDt.getFullYear();
    const nowMonths = nowDt.getMonth()+1;
    const nowDate = nowDt.getDate();
    //当是上一年或者更加之前的评论,返回的日期(与现在的时间相比较)
    if( nowYears>passYears ){
        return `${passYears}年${passMonths}月${passDate}日 ${passHours}:${passMinutes}`;
    }
    //当是今年的评论
    if( nowYears === passYears ) {
        return `${passMonths}月${passDate}日 ${passHours}:${passMinutes}`;
    }
    //当是今天的评论
    if( passYears === nowYears &&  passMonths === nowMonths &&  passDate === nowDate ) {
        return `${passHours}:${passMinutes}`;
    }
}


//格式化专辑中的最新评论数据
class albumNewComment{
    constructor({total,comments}){
        this.total = total;
        this.comments = comments;
    }
}

export const formatAlbumNewComment=(list)=>{
    return new albumNewComment({
        total:list.total,
        comments:list.comments
    })
}

//格式化音乐播放时间,传入毫秒,
export const getSongPlayerTime = (mill)=>{
    //获得分钟
    const min =formatDate(Math.floor(mill/1000/60));
    //获得秒
    const sec = formatDate(Math.floor(mill/1000%60));
    return `${min}:${sec}`
}
