import React from "react";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import enviroment from '../../enviroment'

class Contest extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         participating: this.props.participating
      }
   }

   takePart = () =>{
      axios.post(`${enviroment.backend_url}/contests/take_part`,{
         contest_id: this.props.id,
         steam_id: localStorage.getItem('steam_id')
      })
      .then(res => {
         this.setState({
            participating: true
         })
       })
   }

   renderParticipant(){
      if(this.state.participating){
         return(
            <h3 className='participating'>Вы участвуете</h3>
         )
      }
      return(
         <Button variant="danger" onClick={this.takePart}>Участвовать</Button>
      )
   }

   render(){
      return(
         <div className="giveaway__main-content giveaway__contest">
            <div className="peronal-page__contest-icon" style={{backgroundImage: `url(${this.props.img_url})`}}></div>
            <h1 className="text-white">{this.props.title}</h1>
            <h3 className="text-muted">{this.props.description}</h3>
            <h3 className="text-muted">Результат {this.props.due_date}</h3>
            {this.renderParticipant()}
         </div>
      )
   }
}

export default Contest;