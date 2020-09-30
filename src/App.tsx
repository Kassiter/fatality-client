import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Privilegies from './components/privilegies/privilegies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/global.css'
import ScrollableAnchor from 'react-scrollable-anchor';
import OpenTestModal from './components/openTestModal/openTestModal';
import axios from 'axios';
import environment from './environment';
import WebGL from './webGL'

interface Props{}

interface State{
  modalToggled: boolean,
  pageLoaded: boolean
}

class App extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      modalToggled: false,
      pageLoaded: false
    }
  }

  toggleModal = () =>{
    this.setState({modalToggled: !this.state.modalToggled})
  }
  
  componentDidUpdate(){
    if(window.location.hash == "#rules"){
      if (this.state.modalToggled){
        document.getElementById('root')!.classList.add("blurred");
      }else{
          document.getElementById('root')!.classList.remove("blurred");
      }
    }
  }

  componentDidMount(){
    if(window.location.hash == "#rules"){
      this.setState({modalToggled: true})
      if (this.state.modalToggled){
        document.getElementById('root')!.classList.add("blurred");
      }else{
          document.getElementById('root')!.classList.remove("blurred");
      }
    }

    if (window.location.search.includes('ref')){
      var url = new URL(window.location.href);
      localStorage.setItem('ref', url.searchParams.get("ref")!);
    }

    if (window.location.search.includes('steam_data')){
      var url = new URL(window.location.href);
      let steamData = JSON.parse(url.searchParams.get("steam_data")!);
      localStorage.setItem('steam_id', steamData['steamID'].replace('STEAM_0', 'STEAM_1'));
      localStorage.setItem('steam_id64', steamData['steamid']);
      localStorage.setItem('nickname', steamData['personaname']);
      localStorage.setItem('profileurl', steamData['profileurl']);
      localStorage.setItem('avatarfull', steamData['avatarfull']);
      localStorage.setItem('auth_token', steamData['auth_token']);
      localStorage.setItem('m_type', steamData['m_type']);
      localStorage.setItem('m_points', steamData['m_points']);
      window.location.href = window.location.origin
    }
  }

  clearPreloader = () =>{
    this.setState({pageLoaded: true})
  }

  render(){
    return (
      <div className="App d-flex flex-column">
        <OpenTestModal
                  show={this.state.modalToggled}
                  onHide={() => this.toggleModal()}
              />
        <Header
          toggleModal={this.toggleModal}
        />
        <ScrollableAnchor id={'privilegies'} >
          <Privilegies />
        </ScrollableAnchor>
      </div>
    );
  }
}

export default App;
