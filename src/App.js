import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Slider from './components/slider/slider';
import Individuals from './components/individuals/individuals';
import Privilegies from './components/privilegies/privilegies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/global.css'
import ScrollableAnchor from 'react-scrollable-anchor';
var steam = require('steamidconvert')()

class App extends React.Component {
  componentDidMount(){
    if (window.location.search.includes('ref')){
      var url = new URL(window.location);
      localStorage.setItem('ref', url.searchParams.get("ref"));
    }

    if (window.location.search.includes('steam_data')){
      var url = new URL(window.location);
      let steamData = JSON.parse(url.searchParams.get("steam_data"));
      localStorage.setItem('steam_id', steam.convertToText(steamData['steamid']));
      localStorage.setItem('steam_id64', steamData['steamid']);
      localStorage.setItem('nickname', steamData['personaname']);
      localStorage.setItem('profileurl', steamData['profileurl']);
      localStorage.setItem('avatarfull', steamData['avatarfull']);
      window.location.href = window.location.origin
    }
  }

  render(){
    return (
      <div className="App d-flex flex-column">
        <Header />
        <Slider />
        <ScrollableAnchor id={'privilegies'} >
          <Privilegies />
        </ScrollableAnchor>
        <div className='splitter'>
          <ScrollableAnchor id={'personal-stuff'}><div></div></ScrollableAnchor>
          <div className='splitter__clip'></div>
        </div>
        <Individuals/>
      </div>
    );
  }
}

export default App;
