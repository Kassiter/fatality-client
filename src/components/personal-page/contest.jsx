import React from "react";
import axios from 'axios';
import enviroment from '../../enviroment'

class Contest extends React.Component {
   constructor(props){
      super(props);
      this.state = {
      }
   }

   renderParticipant(){
      if(this.props.participating){
         return(
            <h3>Вы участвуете</h3>
         )
      }
   }

   render(){
      return(
         <div className="giveaway__main-content giveaway__contest">
            <div className="peronal-page__contest-icon" style={{backgroundImage: `url(${this.props.img_url})`}}></div>
            <h1 className="text-white">{this.props.title}</h1>
            <h3 className="text-muted">{this.props.description}</h3>
            <h3 className="text-muted">Результат {this.props.due_date}</h3>
         </div>
      )
   }
}

export default Contest;