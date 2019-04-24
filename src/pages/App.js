import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  Loadable from 'react-loadable';//按需加载组件库
import { Spin } from 'antd';
import 'antd/dist/antd.css';

import Test from '../components/test';
import Index from '../containers';
import Album from '../containers/album'
import Song from '../containers/song'
//按需加载
const dynamicIndex = Loadable({
    loader:()=>import('../containers/index'),
    loading(){
        return <Spin />
    }
})
const dynamicAlbum = Loadable({
    loader:()=>import('../containers/album'),
    loading(){
        return <Spin />
    }
})
const dynamicSong = Loadable({
    loader:()=>import('../containers/song'),
    loading(){
        return <Spin />
    }
})
const dynamicTopic = Loadable({
    loader:()=>import('../containers/topic'),
    loading(){
        return <Spin />
    }
})

const dynamicMAt = Loadable({
    loader:()=>import('../containers/mAt'),
    loading(){
        return <Spin />
    }
})
const dynamicDiscoverPlaylist = Loadable({
    loader:()=>import('../containers/discoverPlaylist'),
    loading(){
        return <Spin />
    }
})
const dynamicPlaylist = Loadable({
    loader:()=>import('../containers/playlist'),
    loading(){
        return <Spin />
    }
})
const dynamicDiscoverAlbum = Loadable({
    loader:()=>import('../containers/discoverAlbum'),
    loading(){
        return <Spin />
    }
})
const dynamicDicoverToplist = Loadable({
    loader:()=>import('../containers/discoverToplist'),
    loading(){
        return <Spin />
    }
})
const dynamicDiscoverArtists = Loadable({
    loader:()=>import('../containers/discoverArtist'),
    loading(){
        return <Spin />
    }
})

const dynamicUserHome = Loadable({
    loader:()=>import('../containers/userHome'),
    loading(){
        return <Spin />
    }
})
const dynamicUserEvent = Loadable({
    loader:()=>import('../components/userHome/userEvent'),
    loading(){
        return <Spin />
    }
})
const dynamicUserFollows = Loadable({
    loader:()=>import('../components/userHome/userFollows'),
    loading(){
        return <Spin />
    }
})
const dynamicMusicPlay = Loadable({
    loader:()=>import('../common/MusicPlay'),
    loading(){
        return <Spin />
    }
})

const dynamicSearch = Loadable({
    loader:()=>import('../containers/search'),
    loading(){
        return <Spin />
    }
})
const dynamicArtist  = Loadable({
    loader:()=>import('../containers/artist'),
    loading(){
        return <Spin />
    }
})

const dynamicMy = Loadable({
    loader:()=>import('../containers/my'),
    loading(){
        return <Spin />
    } 
})
const dynamicFriends = Loadable({
    loader:()=>import('../components/friends'),
    loading(){
        return <Spin />
    }
})

const dynamic404=Loadable({
   loader:()=>import('../components/404'),
   loading(){
    return <Spin />
}
})

class App extends Component {


    render(){
        return (
            <Router>

                <Switch>
                    <Route  path='/' exact component={ dynamicIndex } />
                    <Route  path='/discover' exact component={ dynamicIndex } />
                    <Route  path='/album' component={ dynamicAlbum } />
                    <Route  path='/song' component={ dynamicSong } />
                    <Route  path='/topic' component={ dynamicTopic } />
                    <Route  path='/m/at/:id' component={dynamicMAt} />
                    <Route  path='/discover/playlist' component={ dynamicDiscoverPlaylist }/>
                    <Route  path='/playlist' component={ dynamicPlaylist } />
                    <Route  path='/discover/album' component={dynamicDiscoverAlbum} />
                    <Route  path='/discover/toplist' component={ dynamicDicoverToplist } />
                    <Route path='/discover/artist/signed/' component={dynamicDiscoverArtists} />
                    <Route path='/discover/artist/' component={dynamicDiscoverArtists} />
                    <Route  path='/discover/artist/cat' component={dynamicDiscoverArtists} />
                    <Route  path='/user/home' component={dynamicUserHome} />
                    <Route path='/user/event' component={dynamicUserEvent} />
                    <Route path='/user/follows' component={dynamicUserFollows} />
                    <Route path='/search' component={dynamicSearch} />
                    <Route path='/artist' component={dynamicArtist} />
                    <Route path='/my' component={dynamicMy} />
                    <Route path='/friend' component={dynamicFriends} />
                    <Route path="/empty" component={null}  />
                    {/* <Route  path='/' exact component={dynamicMusicPlay} /> */}

                    <Route path="/test" component={dynamicMusicPlay} />
                    <Route path='*'  component={dynamic404} />
                </Switch>
           
                
            </Router>
        )
    }

}

export default connect()(App)