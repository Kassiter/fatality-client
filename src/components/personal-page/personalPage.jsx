import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FiLogOut } from 'react-icons/fi';
import '../../stylesheets/personal_page.css'

class PersonalPage extends React.Component {
   constructor(props){
      super(props);
   }

   logout = () => {
      localStorage.clear();
      window.location.href = window.location.origin
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
           <Modal.Title id="contained-modal-title-vcenter">
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <h4>Centered Modal</h4>
           <p>
             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
             consectetur ac, vestibulum at eros.
           </p>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.logout} variant="danger"><FiLogOut className="h5 mt-2"/> Выход из учётной записи</Button>
         </Modal.Footer>
       </Modal>)
   }
}

export default PersonalPage;