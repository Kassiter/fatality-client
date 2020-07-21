import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FiLogOut } from 'react-icons/fi';
import PersonalItemForm from './personalItemForm'
import '../../stylesheets/personal_page.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'

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
         {/* <Modal.Header closeButton className='personal-page__header'>
         </Modal.Header> */}
         <Modal.Body>

            <Tabs >
               <Tab eventKey="home" title="Главная">
                  <h4>Centered Modal</h4>
                  <p>
                     Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                     dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                     consectetur ac, vestibulum at eros.
                  </p>
               </Tab>
               <Tab eventKey="profile" title="Персональный товар">
                  <PersonalItemForm />
               </Tab>
               <Tab eventKey="contact" title="Розыгрыши">
                  <div className="giveaway__main-content">
                     <div className="gift-icon"></div>
                     <h4>На данный момент нет розгрышей</h4>
                  </div>
               </Tab>
            </Tabs>
           
         </Modal.Body>
         <Modal.Footer className='justify-content-between'>
           <Button onClick={this.logout} variant="danger"><FiLogOut className="h5 mt-2"/> Выход из учётной записи</Button>
           <Button onClick={this.props.onHide} variant="light">Закрыть</Button>
         </Modal.Footer>
       </Modal>)
   }
}

export default PersonalPage;