import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FiLogOut } from 'react-icons/fi';
import PersonalItemForm from './personalItemForm'
import '../../stylesheets/personal_page.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import axios from 'axios';
import enviroment from '../../enviroment'

class PersonalPage extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         vip_group: '-233',
      }
   }

   componentDidMount(){
      let nickname = localStorage.getItem('nickname')
      if(nickname){

         axios.get(`${enviroment.backend_url}/users/vip_data?nickname=${nickname}`)
         .then(res => {
            this.setState({
               vip_group: res.data.vip_group,
               vip_expires: res.data.expires,
               nickname: nickname,
               avatar: localStorage.getItem('avatarfull')
            })
          })
          
      }
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
                  <div className="col align-items-center profile">
                     <div className="row profile__feature"><div className="profile__avatar" style={{backgroundImage: `url(${this.state.avatar})`}}></div></div>
                     <div className="row profile__feature"><h2>{this.state.nickname}</h2></div>
                     <div className="row profile__feature--point">
                        <h3 className="text-left">
                           <span className="text-muted">Привилегия: </span>
                           {this.state.vip_group}
                        </h3>
                     </div>
                     <div className="row profile__feature--point">
                        <h3 className="text-left">
                           <span className="text-muted">Истекает: </span>
                           {this.state.vip_expires}
                        </h3>
                     </div>
                 </div>
               </Tab>
               <Tab eventKey="profile" title="Персональный товар">
                  <PersonalItemForm />
               </Tab>
               <Tab eventKey="giveaway" title="Розыгрыши">
                  <div className="giveaway__main-content">
                     <div className="peronal-page__icon gift-icon"></div>
                     <h4>На данный момент нет розгрышей</h4>
                  </div>
               </Tab>

               <Tab eventKey="moderators" title="Модерация">
                  <div className="giveaway__main-content">
                     <div className="peronal-page__icon shield-icon"></div>
                     <h4>На данный момент набор не проводится</h4>
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