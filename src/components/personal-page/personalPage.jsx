import React from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FiLogOut } from 'react-icons/fi';
import PersonalItemForm from './personalItemForm'
import '../../stylesheets/personal_page.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import Contest from './contest'
import axios from 'axios';
import enviroment from '../../enviroment'
import ModerContest from "./moderContest";

class PersonalPage extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         vip_group: '-',
         contest: null
      }
   }

   componentDidMount(){
      if (localStorage.getItem('steam_id64')){
         axios.get(`${enviroment.backend_url}/users/refresh?steam_id64=${localStorage.getItem('steam_id64')}`)
         .then(res => {
           localStorage.setItem('nickname', res.data.name)
         })
      }

      let nickname = localStorage.getItem('nickname')
      let steam_id = localStorage.getItem('steam_id')
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

         axios.get(`${enviroment.backend_url}/contests?steam_id=${steam_id}`)
         .then(res => {
            if(res.data.contest){
               this.setState({
                  contest: res.data.contest
               })
            }
         })

         axios.get(`${enviroment.backend_url}/moder_contests?steam_id=${steam_id}`)
         .then(res => {
            if(res.data.contest){
               console.log(res.data.contest)
               this.setState({
                  moder_contest: res.data.contest
               })
            }
         })
      }
     }

   logout = () => {
      localStorage.clear();
      window.location.href = window.location.origin
   }

   renderContest = () =>{
      if (!this.state.contest){
         return(
            <div className="giveaway__main-content">
               <div className="peronal-page__icon gift-icon"></div>
               <h4>На данный момент нет розгрышей</h4>
            </div>
         )
      }

      return(
         <Contest 
            id={this.state.contest.id}
            img_url={this.state.contest.image}
            description={this.state.contest.description}
            description={this.state.contest.description}
            title={this.state.contest.title}
            due_date={this.state.contest.due_date}
            participating={this.state.contest.participating}
         />
      )
   }

   renderModerContest = () =>{
      if(!this.state.moder_contest){
         return(
            <div className="giveaway__main-content">
               <div className="peronal-page__icon shield-icon"></div>
               <h4>На данный момент набор не проводится</h4>
            </div>
         )
      }

      return(
         <ModerContest
            id={this.state.moder_contest.id}
            participating={this.state.moder_contest.participating}
            due_date={this.state.moder_contest.due_date}
         />
      )
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
                     <div className="row profile__nickname"><h2>{this.state.nickname}</h2></div>
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
                  {this.renderContest()}
               </Tab>

               <Tab eventKey="moderators" title="Модерация">
                  {this.renderModerContest()}
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