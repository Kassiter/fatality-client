import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../stylesheets/personal_page.css'

import Alert from "react-bootstrap/Alert";

import enviroment from '../../../enviroment'
import ContestKey from "./contestKey";

class ContestModerPage extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         keys: [],
         requestFailed: false,
         errorText: ''
      }
   }

   componentDidMount(){
      this.getKeys();
   }
   

   getKeys = () =>{
      axios.get(`${enviroment.backend_url}/contest_keys/index_keys?steamID=${localStorage.getItem('steam_id')}&auth_token=${localStorage.getItem('auth_token')}`)
      .then(res => {
         console.log(res)
         this.setState({
            keys: res.data.keys
         })
       })
   }

   updateAge = (e) =>{
      this.setState({age: e.target.value})
   }


   genKeys = (e) =>{
      e.preventDefault()
      axios.post(`${enviroment.backend_url}/contest_keys/generate_keys`,
      {
         steamID: localStorage.getItem('steam_id'),
         auth_token: localStorage.getItem('auth_token')
      })
      .then(res => {
         this.setState({ requestFailed: false});
         this.getKeys()
      })
      .catch(error => {
         let err = error.response.data.error;
         this.setState({ errorText: err, requestFailed: true});
      });
   }

   renderBase = () =>{
      if(this.state.keys.length > 0){
         return(
            <div className="d-flex flex-column w-100">
               {this.renderKeys()}
            </div>
         )
      }

      return(
         <div>
            <Alert variant='danger' hidden={!this.state.requestFailed }>
               Произошла ошибка:&nbsp; {this.state.errorText}
            </Alert>
            <div className="giveaway__main-content">
               <div className="peronal-page__icon key-icon"></div>
               <Button variant="danger" onClick={this.genKeys}>Сгенерировать ключи</Button>
            </div>
         </div>
      );
   }

   renderKeys = () =>{
      let result = []
      this.state.keys.forEach(key_entity => {
         let reported = key_entity.report.length > 0
         result.push(<ContestKey id={key_entity.id} key_name={key_entity.key} submitt={reported} />)
      });
      return result;
   }


   render(){
      return(this.renderBase());
   }
}

export default ContestModerPage;