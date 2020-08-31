import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../stylesheets/personal_page.css'
import '../stylesheets/admins.css'
import Image from 'react-bootstrap/Image'
import Alert from "react-bootstrap/Alert";
import Admin from './admin'
import environment from '../environment'

interface Props{ [key: string]: any }

interface State{ admins: Object[], moders: Object[] }

class Admins extends React.Component<Props, State> {
   constructor(props: Props){
      super(props);
      this.state = {
         admins: [],
         moders: []
      }
   }

   componentDidMount(){
      this.getAdmins()
   }

   getAdmins = () =>{
      axios.get(`${environment.backend_url}/users/admins`)
      .then(res => {
         this.setState({ admins: res.data.admins, moders: res.data.moders});
      })
      .catch(error => {
         // let err = error.response.data.error;
         // this.setState({ errorText: err, requestFailed: true});
      });
   }

   renderAdmins = () => {
      let admins: JSX.Element[] = []
      if (this.state.admins.length > 0 ){
         this.state.admins.forEach((admin: any) => {
            if (admin != null){
               admins.push(<Admin 
                  avatar_base = {admin.avatar_url}
                  avatar_hov = {admin.avatar_secondary}
                  nickname = {admin.nickname}
                  position = {admin.position_name}
               />)
            }
         });
      }
      return admins;
   }

   renderModers = () => {
      let moders: JSX.Element[] = []
      if (this.state.moders.length > 0 ){
         this.state.moders.forEach((moder: any) => {
            if (moder != null){
               moders.push(<Admin 
                  avatar_base = {moder.avatar_url}
                  avatar_hov = {moder.avatar_secondary}
                  nickname = {moder.nickname}
                  position = {moder.position_name}
               />)
            }
         });
      }

      return moders;
   }

   render(){
      return(
      <div className="container d-flex flex-column admins-section__container mt-2">
         <h1>Администрация</h1>
         <div className="admins__primary d-flex flex-row justify-content-around align-items-center">
            {this.renderAdmins()}
         </div>
         <div className="admins__moders d-flex flex-row justify-content-around align-items-center">
            {this.renderModers()}
         </div>
      </div>);
   }
}

export default Admins;