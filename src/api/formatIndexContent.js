

//格式化热门推荐歌单数据

class hotCommend {
    constructor({id,name,picUrl,playCount}){
        this.id = id;
        this.name = name;
        this.picUrl = picUrl;
        this.playCount = playCount;
    }
}

 const createHotCommend = (list)=>{
    return new hotCommend({
        id:list.id,
        name:list.name,
        picUrl:list.picUrl,
        playCount:list.playCount
    })
}

export const formatHotCommend = (array)=>{
    let arr = [];
    array.forEach( (item,index)=>{
        arr.push( createHotCommend(item) );
    } )
    return arr;
}

//格式化推荐歌单的播放量

export const formatPlayCount = (playCount)=>{
    if( (playCount/10000)>10000 ) {
        return `${(playCount/100000000).toFixed(1)}亿`
    }else if ( (playCount/10000)>9 ) {
        return Math.floor( playCount/10000 )+"万"
    }else {
        return playCount
    }
}
//这条跟上一条是一样的,不过这条比较简短
// export const formatPlayCount = item => {
//     return (item / 10000) > 9 ? ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : `${Math.ceil(item / 10000)}万`) : Math.floor(item)
//   };
  

//格式化新碟上架的数据
class newAlbum {
    constructor({picUrl,name,artist}) {
        this.picUrl = picUrl;//专辑头像
        this.name = name;//专辑名
        this.artist = artist;
    }
}

 const createNewAlbum = (array)=>{
    return new newAlbum({
        picUrl:array.picUrl,
        name:array.name,
        artist:array.artist
    })
}

export const formatNewAlbum = (albums)=>{
    let arr = [];
    albums.forEach( (item,index)=>{
        arr.push(createNewAlbum(item))
    } )
    return arr;
}

//格式化榜单云音乐飙升榜
class topList {
    constructor({coverImgUrl,name,tracks,id}){
        this.coverImgUrl = coverImgUrl;//封面
        this.name = name;//名字
        this.tracks = tracks;//歌曲列表
        this.id = id;//歌单的id
    }
}

export  const createTopList = (list)=>{
  return  new topList({
        coverImgUrl : list.coverImgUrl,
        name : list.name,
        tracks : list.tracks,
        id:list.id,
    })
}

//格式化入驻歌手数据
class enteringSinger{
    constructor({picUrl,img1v1Url,alias,name,accountId}){
        this.picUrl = picUrl;//歌手图片
        this.img1v1Url = img1v1Url;//歌手图片
        this.alias =alias;//歌手别名
        this.name = name;//歌手名字
        this.accountId = accountId;//歌手id
    }
}
const createEnteringSinger = (list)=>{
    return new enteringSinger({
        picUrl:list.picUrl,
        img1v1Url:list.img1v1Url,
        alias:list.alias,
        name:list.name,
        accountId:list.accountId,
    })
}

export const formatEnteringSinger = (singerArr)=>{
    let arr = [];
    singerArr.forEach( (item,index)=>{
        arr.push( createEnteringSinger(item) );
    } )
    return arr
}
//格式化入驻歌手的alias
export const formatAlias = (arr)=>{
    let str = "";
    arr.forEach( (item,index)=>{
        str += item;
    } )
    return str;
}
//格式化热门推荐的标签
class hotCommendTags {
    constructor({id,name,createTime,usedCount}){
        this.id = id;//标签id
        this.name = name;//标签名
        this.createTime = createTime;//标签创建时间
        this.usedCount =usedCount;//标签使用量
    }
}
const createHotCommendTags = (list)=>{
    return new hotCommendTags({
        id:list.id,
        name:list.name,
        createTime:list.createTime,
        usedCount:list.usedCount,
    })
}

export const formatHotCommendTags = (arr)=>{
    let array = [];
    arr.forEach( (item,index)=>{
        array.push(createHotCommendTags(item))
    } )
    return array;
}

