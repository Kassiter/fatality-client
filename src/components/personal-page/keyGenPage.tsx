import React from 'react'
import axios from 'axios';
import environment from '../../environment'
import Form from 'react-bootstrap/Form'
import '../../stylesheets/personal_page.css'
import '../../stylesheets/keys_generation.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import '../../stylesheets/individuals.css';
import Button from 'react-bootstrap/Button'
import moment from 'moment-timezone';

interface Props{}

interface State{
  lifetime: boolean
}

class KeyGenPage extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state ={
      lifetime: false
    }
  }

  submit = (priviliege: string) => {
    let steamID = localStorage.getItem('steam_id')
    let auth_token = localStorage.getItem('auth_token')
    axios.get(`${environment.backend_url}/priviliege/generate_key?lifetime=${this.state.lifetime}&auth_token=${auth_token}&steamID=${steamID}&priviliege=${priviliege}`)
    .then(res => {
      let lt = this.state.lifetime ? "lifetime" : "month"
      let file_name = `tmp/${priviliege}_${lt}_${moment().format("DD_MM_YYYY-hh-mm-ss")}.txt`
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file_name); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
  }

  handleCheckedPress = () => {
    this.setState({ lifetime: !this.state.lifetime })
  }

  renderButtons = () =>{
    let stuff = [
      {name: '', img_url: 'https://i.imgur.com/dsz1Cqa.jpg', req_data: '[VIP]'},
      {name: '', img_url: 'https://i.imgur.com/Pqlhamd.jpg', req_data: '[Supreme]'},
      {name: '', img_url: 'https://i.imgur.com/LLDJYzh.png', req_data: 'ADMIN'},
      {name: '', img_url: 'https://i.imgur.com/f4FS2yE.png', req_data: 'ULTRA-ADMIN'},
      {name: 'Credits', img_url: 'https://i.imgur.com/EH4f8Yo.png', req_data: 'SHOP_CREDITS'},
      {name: 'Trail', img_url: 'https://imgur.com/k568djw.jpg', req_data: 'TRAIL'},
      {name: 'Skin', img_url: 'https://i.imgur.com/g7A8alM.jpg', req_data: 'SKIN'},
      {name: 'Random', img_url: 'https://i.imgur.com/rR6TjXd.jpg', req_data: 'RANDOM'},
      {name: 'Facehugger', img_url: 'https://i.ebayimg.com/images/g/5egAAOSwdJJbaVJ-/s-l300.jpg', req_data: 'FACEHUGGER'}
    ]
    let res: Array<JSX.Element> = []

    stuff.forEach(priviliege => {
      res.push(<Button variant="success" onClick={() => this.submit(priviliege.req_data)} size='lg' className="gen__btn" type="button" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${priviliege.img_url})`}}>
                {priviliege.name}
               </Button>)
    });
    return res;
  }

  render() {
    return (
      <div className="keys-generation__container">
        <h2 className="text-center">Ключи от привилегий</h2>
        <div className="peronal-page__icon keys-share__icon"></div>
        <div className="keys__buttons">
          {this.renderButtons()}
        </div>
        <BootstrapSwitchButton 
                  checked={this.state.lifetime}
                  offlabel='Месяц (25k)'
                  onstyle='success'
                  onlabel='Навсегда (50k)'
                  //size="m"
                  // className="key__duration"
                  offstyle='danger'
                  style='w-50 mx-3'
                  onChange={() => {
                     this.handleCheckedPress()
                  }}
               />
      </div>
   )
  }
}



export default KeyGenPage;