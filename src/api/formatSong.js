//格式化单曲得一部分数据

class songData {
    constructor({name,publishTime,ar,al,alia}){
        this.name = name;//歌曲名字
        this.publishTime = publishTime;//歌曲出版时间
        this.ar = ar;//歌手信息
        this.al = al;//歌曲信息
        this.alia = alia;//来自于那里(那部电视，电影)
    }
}

const createSongData = (list)=>{
    return new songData({
        name:list.name,
        publishTime:list.publishTime,
        ar:list.ar,
        al:list.al,
        alia:list.alia
    })
}

//格式化alia
export const formatAlia = (arr)=>{
    let str = "";
    arr.forEach( (item,index)=>{
        str += `${item}/`
    } )
    return str
}

export const formatSongData = (arr)=>{
    let array = [];
    arr.forEach( (item,index)=>{
        array.push(createSongData(item));
    } )
    return array;
}

export const formatCommentNumber=(item)=>{
      return (item / 10000) > 9 ? ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : `${Math.ceil(item / 10000)}万`) : Math.floor(item)

}
//格式化歌词
class songLyricData{
    constructor({lrc}) {
        this.lrc = lrc;//歌词
    }
}
export const  formatSongLyricData = (list)=>{
    return new songLyricData({
        lrc:list.lrc
    })
} 
//格式化相似歌曲
class similarSong{
    constructor({name,artists}) {
        this.name = name;//歌名
        this.artists = artists;//歌手数据
    }
}

const createSimilarSong = (list)=>{
    return new similarSong({
        name:list.name,
        artists:list.artists
    })
}

export const formatSimilarSong = (arr)=>{
    let array = [];
    arr.forEach( (item,index)=>{
        array.push(createSimilarSong(item))
    } )
    return array
}

