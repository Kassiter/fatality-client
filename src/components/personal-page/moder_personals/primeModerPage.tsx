import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../stylesheets/personal_page.css'

import Alert from "react-bootstrap/Alert";
import ProgressBar from 'react-bootstrap/ProgressBar'
import environment from '../../../environment'
import ContestKey from "./contestKey";
import moment from 'moment-timezone';
import LogRow from "./logRow";

interface Props{}

interface State{
   task: any,
   report: string,
   m_points: number
}

class PrimeModerPage extends React.Component<Props, State>{
   constructor(props: Props){
      super(props);
      this.state = {
         task: null,
         report: '',
         m_points: 0
      }
   }

   componentDidMount(){
      this.getTask()
      if (localStorage.getItem('m_type') != 'no'){
         axios.get(`${environment.backend_url}/moders/m_points?steam_id=${localStorage.getItem('steam_id')}&m_type=main`)
         .then(res => {
            this.setState({m_points: res.data.m_points})
         })
      }
   }
   

   getTask = () =>{
      axios.get(`${environment.backend_url}/prime_moder_tasks/task?steamID=${localStorage.getItem('steam_id')}&auth_token=${localStorage.getItem('auth_token')}`)
      .then(res => {
         this.setState({
            task: res.data.task
         })
       })
   }

   reportTask = (e: any) => {
      this.setState({report: e.target.value})
   }

   report = (e: any) =>{
      e.preventDefault()

      axios.post(`${environment.backend_url}/prime_moder_tasks/submit_report`,
      {
         steamID: localStorage.getItem('steam_id'),
         id: this.state.task.id,
         auth_token: localStorage.getItem('auth_token'),
         report: this.state.report
      })
      .then(res => {
         this.getTask();
       })
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

   renderBase = () =>{
      if(this.state.task != null && this.state.task != undefined){
         return(
            <div className="d-flex flex-column align-items-end">
               <div className="d-flex flex-column w-100 logs__container">
               <h2>{this.state.task.name}</h2>
               <Form>
                  <Form.Group>
                     <Form.Control as="textarea" rows={3} onChange={(e) => this.reportTask(e)} className="custom-input--transparent" />
                  </Form.Group>
                  </Form>
               </div>
               <Button variant="success" className="log-report__submit mt-2" onClick={(e) => this.report(e)}>Отправить</Button>
            </div>
         )
      }

      return(
         <div>
            <div className="giveaway__main-content">
               <div className="peronal-page__icon tasks-icon"></div>
               <h4>Пока заданий нет.</h4> 
            </div>
         </div>
      );
   }

   render(){
      return(
         <div className="d-flex flex-column" id="contests-moder">
            {this.renderBase()}
            <ProgressBar animated striped now={this.state.m_points} label={`MP: ${this.state.m_points}`} max={60} variant={this.moderPointsBarStyle()} className="mt-4"/>
         </div>
      );
   }
}

export default PrimeModerPage;