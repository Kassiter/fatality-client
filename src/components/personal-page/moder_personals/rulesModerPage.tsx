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
   log: null | string,
   log_rows: Array<any>,
   requestFailed: boolean,
   errorText: string,
   all_done: boolean,
   early: boolean,
   hrs_till: number,
   reported_rows: Array<any>,
   m_points: number
}

class RulesModerPage extends React.Component<Props, State>{
   constructor(props: Props){
      super(props);
      this.state = {
         log: null,
         log_rows: [],
         requestFailed: false,
         errorText: '',
         all_done: false,
         early: true,
         hrs_till: -10,
         reported_rows: [],
         m_points: 0 
      }
   }

   componentDidMount(){
      let ukrainian_time = moment().tz("Europe/Kiev").format('HH');
      let now = moment().format('HH');
      let diff = +now - +ukrainian_time
      let log_time = 20 + diff
      this.setState({hrs_till: +log_time - +now})
      if (localStorage.getItem('m_type') == 'ruler' || localStorage.getItem('m_type') == 'ceo'){
         if (new Date().getHours() >= log_time){
            this.pullLog();
            this.getLog()
         }
      }
      
      if (localStorage.getItem('m_type') != 'no'){
         axios.get(`${environment.backend_url}/moders/m_points?steam_id=${localStorage.getItem('steam_id')}&m_type=ruler`)
         .then(res => {
            this.setState({m_points: res.data.m_points})
         })
      }
   }
   

   getLog = () =>{
      axios.get(`${environment.backend_url}/logs/show_log?steamID=${localStorage.getItem('steam_id')}&auth_token=${localStorage.getItem('auth_token')}`)
      .then(res => {
         if(res.data.log){
            this.setState({
               log: res.data.log,
               log_rows: this.parseRows(res.data.log.text.split("\n")),
               all_done: res.data.log.reported
            })
         }
       })
   }

   pullLog = () =>{
      axios.post(`${environment.backend_url}/logs/pull`)
      .then(res => {
         this.getLog()
         this.setState({
            early: false
         })
       })
   }

   reportRow = (row_id: number | string) => {
      let row_ids = this.state.reported_rows
      row_ids.includes(row_id) ? row_ids.filter((row, ind) => ind != row_id) : row_ids.push(row_id)
      this.setState({reported_rows: row_ids})
   }

   report = (e: any) =>{
      e.preventDefault()
      var logs = [...this.state.log_rows]
      logs.forEach((log_row, i) => {
         let new_row = this.state.reported_rows.includes(i) ? `<R>${logs[i].text}</R>` : logs[i].text
         logs[i] = new_row
      });

      axios.post(`${environment.backend_url}/logs/report`,
      {
         steamID: localStorage.getItem('steam_id'),
         auth_token: localStorage.getItem('auth_token'),
         rows: logs.join("\n")
      })
      .then(res => {
         this.setState({all_done: true})
         
       })
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

      if(this.state.log_rows.length > 0){
         return(
            <div className="d-flex flex-column align-items-end">
               <div className="d-flex flex-column w-100 logs__container">
                  {this.renderLogRows()}
               </div>
               <Button variant="success" className="log-report__submit mt-2" onClick={(e) => this.report(e)}>Отправить</Button>
            </div>
         )
      }

      return(
         <div>
            <div className="giveaway__main-content">
               <div className="peronal-page__icon log-icon"></div>
               <h4>Логи будут доступны через {this.state.hrs_till} ч.</h4> 
            </div>
         </div>
      );
   }

   renderLogRows = () =>{
      let result: Array<JSX.Element> = []
      this.state.log_rows.forEach(log_row => {
         let reported = this.state.reported_rows.includes(log_row.id)
         result.push(<LogRow id={log_row.id} text={log_row.text} reported={reported} report = {this.reportRow} />)
      });
      return result;
   }

   parseRows = (rows_array: any) => {
      let result: Array<any> = []
      rows_array.forEach((row: any) => {
         if (!row.includes("Console<0>") && !row.includes("STEAM_1:1:153969439"))
            result.push({id: rows_array.indexOf(row), text: row})
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
            <ProgressBar animated striped now={this.state.m_points} label={`MP: ${this.state.m_points}`} max={60} variant={this.moderPointsBarStyle()} className="mt-4"/>
         </div>
      );
   }
}

export default RulesModerPage;