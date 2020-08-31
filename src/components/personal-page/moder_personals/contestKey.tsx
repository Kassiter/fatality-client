import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../stylesheets/personal_page.css'
import Alert from "react-bootstrap/Alert";
import environment from '../../../environment'

interface Props{
   id: number,
   key_name: string,
   submitt: boolean, 
   report(e: any, report: string, id: number | string): void
}

interface State{
   report: string,
   form_shown: boolean,
   submitted: boolean
}

class ContestKey extends React.Component<Props, State>{
   constructor(props: Props){
      super(props);
      this.state = {
         report: '',
         form_shown: false,
         submitted: this.props.submitt
      }
   }

   updateReport = (e: any) =>{
      this.setState({report: e.target.value})
   }

   showForm = () => {
      this.setState({form_shown: !this.state.form_shown})
   }

   renderForm = () =>{
      if (this.state.form_shown){
         return(<Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Отчёт</Form.Label>
                     <Form.Control as="textarea" rows={3} onChange={(e) => {this.updateReport(e)}} className="custom-input--transparent" />
                  </Form.Group>
                  <Button variant="primary" size="sm" onClick={(e) => {this.props.report(e, this.state.report, this.props.id)}}>
                     Отправить
                  </Button>
               </Form>
         )
      }
   }

   renderAll = () =>{
      if (!this.props.submitt){
         return(
            <div className="d-flex flex-column">
               <div className="d-flex mt-1 w-50">
                  <h4>{this.props.key_name}</h4>
                  <Button variant="success" size="sm" className="ml-2" onClick={this.showForm}>Выдан</Button>
               </div>
               {this.renderForm()}
            </div>
         )
      }
      return(<div></div>);
   }

   render(){
      return(this.renderAll())
   }
}

export default ContestKey;