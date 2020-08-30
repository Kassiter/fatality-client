import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../stylesheets/personal_page.css'
import '../stylesheets/admins.css'
import Image from 'react-bootstrap/Image'
import Alert from "react-bootstrap/Alert";

import enviroment from '../enviroment'

interface Props{
   avatar_base: string,
   avatar_hov: string,
   nickname: string,
   position: string
}

interface State{
   hov_: boolean
}

class Admin extends React.Component<Props, State> {
   constructor(props: Props){
      super(props);

      this.state = {
         hov_: false
      }
   }


   render(){
      return(
         <div className="admins__admin d-flex flex-column mt-3" onMouseEnter={() => this.setState({hov_: true})} onMouseLeave={() => this.setState({hov_: false})}>
            <Image src={this.state.hov_ ? this.props.avatar_hov : this.props.avatar_base} roundedCircle className="admins__avatar" />
            <h2 className="admins__nickname">{this.props.nickname}</h2>
            <h3 className="admins__position text-muted">{this.props.position }</h3>
         </div>
      )
   }
}

export default Admin;