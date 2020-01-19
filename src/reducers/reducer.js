import {combineReducers} from 'redux'
import { homeBanner } from './home'
import { albumData,albumCommentData,singerOtherAlbum } from './album'
import { hotCommend,recommendPlaylistReducer,recommendSongsReducer } from './indexContent'
import { newAlbumReducer,topListReducer,newListReducer,originalListReducer,enteringSingerReducer,hotCommendTagsReducer } from '../reducers/indexContent'
import { songDataReducer,songCommentDataReducer,songLyricDataReducer,similarSongData, songUrlDataReducer,songSingerInfoReducer } from './song';
import { commendTagsContentReducer, selectTagsDataReducer } from './discoverPlaylist';
import { playlistDataReducer,playlistCommentDataReducer,hotPlaylistDataReducer } from './playlist';
import { newAlbumDataReducer,newAlbumAllDataReducer } from './discoverAlbum';
import { allPlaylistDataReducer ,toplistContentDataReducer,toplistCommentDataReducer} from './discoverToplist';
import {  singerTypeDataReducer,hotSingerDataReducer,catSingerDataReducer } from './discoverArtist'
import { getUserDetailDataReducer,userSingerPlayListReducer,userHomePlaylistReducer } from './userHome'
import { loginDataReducer } from './header';
import { getUserDetailDataReducerUserEven, userEvenDataReducer,userFollowsDataReducer } from './userEvent'
import { getUserDetailDataReducerUserFollows,userFollowsDataReducerUserFollows } from './userFollows'
import { searchDataReducer } from './search'
import { singerSongsDataReducer,singerAlbumsDataReducer,singerMvsDataReducer,singerDesDataReducer } from './artists';
import { getLoginStatusReducer,getLoginPlaylistInfoReducer,getLoginPlaylistContentReducer } from './my';
import {djCateListReducer,djCateListTypeReducer,radioLeaderBorderReducer} from "./discoverDjRadio"
import { djDetailReducer,djDetailListReducer } from "./djDetail"
import { friendsDataReducer } from "./friends"
const reducer = combineReducers({
  homeBanner,
  albumData,
  albumCommentData,
  singerOtherAlbum,
  hotCommend,
  newAlbumReducer,
  topListReducer,
  newListReducer,
  originalListReducer,
  enteringSingerReducer,
  songDataReducer,
  songCommentDataReducer,
  songLyricDataReducer,
  similarSongData,
  songUrlDataReducer,
  hotCommendTagsReducer,
  commendTagsContentReducer,
  selectTagsDataReducer,
  playlistDataReducer,
  playlistCommentDataReducer,
  hotPlaylistDataReducer,
  newAlbumDataReducer,
  newAlbumAllDataReducer,
  allPlaylistDataReducer,
  toplistContentDataReducer,
  toplistCommentDataReducer,
  singerTypeDataReducer,
  hotSingerDataReducer,
  catSingerDataReducer,
  getUserDetailDataReducer,
  loginDataReducer,
  userSingerPlayListReducer,
  userHomePlaylistReducer,
  getUserDetailDataReducerUserEven,
  userEvenDataReducer,
  userFollowsDataReducer,
  getUserDetailDataReducerUserFollows,
  userFollowsDataReducerUserFollows,
  songSingerInfoReducer,
  searchDataReducer,
  singerSongsDataReducer,
  singerAlbumsDataReducer,
  singerMvsDataReducer,
  singerDesDataReducer,
  getLoginStatusReducer,
  getLoginPlaylistInfoReducer,
  getLoginPlaylistContentReducer,
  djCateListReducer,
  djCateListTypeReducer,
  radioLeaderBorderReducer,
  djDetailReducer,
  djDetailListReducer,
  recommendPlaylistReducer,
  recommendSongsReducer,
  friendsDataReducer,
  });
  
  export default reducer