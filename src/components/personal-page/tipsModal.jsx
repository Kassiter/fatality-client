import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FiLogOut } from 'react-icons/fi';
import '../../stylesheets/personal_page.css'
import '../../stylesheets/global.css'

class TipsModal extends React.Component {
   constructor(props){
      super(props);
   }

   logout = () => {
      localStorage.clear();
      window.location.href = window.location.origin
   }


   renderMCC = () => {
      let res = []
      if (this.props.mcc.length > 0 && this.props.mcc != undefined){
         this.props.mcc.forEach(category => {
            res.push(<h2>{category.name}:</h2>)
            category.commands.forEach(command => {
               res.push(
                  <h5 className="w-100">
                     <div className={this.commandClass(command.group)}>{command.group}</div>
                     <span className="help__command ml-2"> {command.name}</span> 
                     <span className="help__target ml-2"> {command.target}</span>   
                     <span className="help__param ml-2"> {command.param}</span>   
                     <span className="text-muted ml-2"> {command.description}</span>
                  </h5>
               )
            });
         });
      }
      return res;
   }

   commandClass = (group) => {
      return(`help__group help__group--${group.toLowerCase()}`)
   }

   render(){
      return(
         <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="personal-page"
         >
         <Modal.Header closeButton className='personal-page__header'>
         </Modal.Header>
         <Modal.Body className="help__body">
            <div className="d-flex flex-column align-items-center">
               {this.renderMCC()}
            </div>
         </Modal.Body>
       </Modal>)
   }
}

export default TipsModal;