import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../stylesheets/personal_page.css'

import Alert from "react-bootstrap/Alert";
import ProgressBar from 'react-bootstrap/ProgressBar'
import environment from '../../../environment'
import ContestKey from "./contestKey";

class ContestModerPage extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         keys: [],
         requestFailed: false,
         errorText: '',
         all_done: false,
         m_points: 0
      }
   }

   componentDidMount(){
      if (localStorage.getItem('m_type') == 'contest' || localStorage.getItem('m_type') == 'ceo'){
         this.getKeys();
      }
         
      if (localStorage.getItem('m_type') != 'no'){
         axios.get(`${environment.backend_url}/moders/m_points?steam_id=${localStorage.getItem('steam_id')}&m_type=contest`)
         .then(res => {
            this.setState({m_points: res.data.m_points})
         })
      }
   }
   

   getKeys = () =>{
      axios.get(`${environment.backend_url}/contest_keys/index_keys?steamID=${localStorage.getItem('steam_id')}&auth_token=${localStorage.getItem('auth_token')}`)
      .then(res => {
         console.log(res)
         this.setState({
            keys: res.data.keys,
            all_done: res.data.all_done
         })
       })
   }

   updateAge = (e) =>{
      this.setState({age: e.target.value})
   }

   report = (e, report, id) =>{
      e.preventDefault()
      axios.post(`${environment.backend_url}/contest_keys/submit_report`,
      {
         steamID: localStorage.getItem('steam_id'),
         auth_token: localStorage.getItem('auth_token'),
         report: report,
         id: id,
         m_points: this.state.m_points 
      })
      .then(res => {
         this.getKeys()
         
       })
   }


   genKeys = (e) =>{
      e.preventDefault()
      axios.post(`${environment.backend_url}/contest_keys/generate_keys`,
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
      if(this.state.all_done){
         return(
            <div className="giveaway__main-content">
               <div className="peronal-page__icon check-icon"></div>
               <h4 className="participating">На сегодня всё. Хорошая работа!</h4> 
            </div>
         )
      }

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
         let reported = key_entity.report == null
         result.push(<ContestKey id={key_entity.id} key_name={key_entity.key} submitt={!reported} report = {this.report}/>)
      });
      return result;
   }

   moderPointsBarStyle = () =>{
      let points = this.state.m_points;
      let result = ""
      result = (points >= 45 && points <= 60) ? "warning" : "success"
      if (points < 45){
         result = "danger" 
      }

      return result;
   }

   render(){
      return(
         <div className="d-flex flex-column" id="contests-moder">
            {this.renderBase()}
            <ProgressBar animated striped now={this.state.m_points} label={`MP: ${this.state.m_points}`} max="60" variant={this.moderPointsBarStyle()} className="mt-4"/>
         </div>
      );
   }
}

export default ContestModerPage;