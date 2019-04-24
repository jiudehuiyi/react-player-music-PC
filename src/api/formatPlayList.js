import { formatDate } from "./formatData";

formatDate
// 格式化热门推荐标签内容

class hotCommendTagsContent {
    constructor({playlists,total,cat}){
        this.playlist = playlists;//内容
        this.total = total;//总数
        this.cat = cat;
    }
}

export const formatHotCommendTagsContent = (list)=>{
    return new hotCommendTagsContent({
        playlists:list.playlists||[],
        total:list.total,
        cat:list.cat
    })
}

//格式化url地址为playlist中的内容

class playlistData {
    constructor({coverImgUrl,name,creator,createTime,subscribedCount,shareCount,commentCount,tags,description,tracks,playCount,subscribers}){
        this.coverImgUrl = coverImgUrl;//列表图片
        this.name = name;//列表名
        this.creator = creator;//创建者数据
        this.createTime = createTime;//歌单创建时间
        this.subscribedCount = subscribedCount;//收藏次数
        this.shareCount = shareCount;//转发数量
        this.commentCount = commentCount;//评论数量
        this.tags = tags;//所属于的种类 
        this.description = description;//歌单描述
        this.tracks = tracks;//歌曲列表
        this.playCount = playCount;//播放次数
        this.subscribers = subscribers;//喜欢这首歌的人
    }
}

export const formatPlaylistData = (list)=>{
    return new playlistData({
        coverImgUrl:list.coverImgUrl,
        name:list.name,
        creator:list.creator,//可以对这项数据进行进一步格式化,也可以不进一步格式化
        createTime:list.createTime,
        subscribedCount:list.subscribedCount,
        shareCount:list.shareCount,
        commentCount:list.commentCount,
        tags:list.tags,
        description:list.description,
        tracks:list.tracks,
        playCount:list.playCount,
        subscribers:list.subscribers,
    })
}
//对歌单(playlist)出版时间进行格式化
export const formatPlaylistPublishTime = (time)=>{
    const date = new Date(time);
    const years = date.getFullYear();
    const months = formatDate(date.getMonth()+1);
    const day = formatDate(date.getDate());
    return `${years}-${months}-${day}`;
}




