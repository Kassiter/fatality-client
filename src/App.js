import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Slider from './components/slider/slider';
import Privilegies from './components/privilegies/privilegies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/global.css'

class App extends React.Component {
  componentDidMount(){
    if (window.location.search.includes('ref')){
      var url = new URL(window.location);
      localStorage.setItem('ref', url.searchParams.get("ref"));
    }
  }
  
  render(){
    return (
      <div className="App">
        <Header />
        <Slider />
        <Privilegies />
      </div>
    );
  }
}

export default App;
