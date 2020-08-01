import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../stylesheets/personal_page.css'
import { BsExclamationDiamondFill } from 'react-icons/bs';
import Alert from "react-bootstrap/Alert";
import ProgressBar from 'react-bootstrap/ProgressBar'
import enviroment from '../../../enviroment'
import ContestKey from "./contestKey";
import moment from 'moment-timezone';

class LogRow extends React.Component {
   constructor(props){
      super(props);
      this.state = {

      }
   }

   componentDidMount(){
      // let ukrainian_time = moment().tz("Ukraine").format('HH');
      // let now = moment().format('HH');
      // let diff = +now - +ukrainian_time
      // let log_time = 20 + diff
      // this.setState({hrs_till: +log_time - +now})
      // if (localStorage.getItem('m_type') == 'ruler'){
      //    if (new Date().getHours() >= 20){
      //       this.pullLog();
      //    }
      // }
         
   }

   renderTextClass = () =>{
      return this.props.reported ? "ml-2 w-100 row--reported" : "ml-2 w-100"
   }

   render(){
      return(
         <div className="d-flex justify-content-between align-items-center log-row">
            <h6 className="text-muted">{this.props.id}</h6>
            <h7 className={this.renderTextClass()}>{this.props.text}</h7>
            <BsExclamationDiamondFill size="sm" className="ml-2 report__icon" size="1.5em" onClick={() => this.props.report(this.props.id)}/>
         </div>
      );
   }
}

export default LogRow;