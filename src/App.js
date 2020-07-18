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

class App extends React.Component {
  componentDidMount(){
    if (window.location.search.includes('ref')){
      var url = new URL(window.location);
      localStorage.setItem('ref', url.searchParams.get("ref"));
    }
  }
  
  render(){
    return (
      <div className="App d-flex flex-column">
        <Header />
        <Slider />
        <Privilegies />
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
