import React from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import '../../stylesheets/personal_page.css'
import Alert from "react-bootstrap/Alert";
import environment from '../../environment'

interface State{
   participating: boolean | null,
   age: string | null,
   experience: string | null,
   reason: string | null,
   requestSucceed: boolean,
   requestFailed: boolean,
   errorText: string | any,
   loading: boolean
}

interface Props{
   id: number,
   participating: boolean,
   due_date: string | any
}

class ModerContest extends React.Component<Props, State>{
   constructor(props: Props){
      super(props);
      this.state = {
         participating: this.props.participating,
         age: null,
         experience: null,
         reason: null,
         requestSucceed: false,
         requestFailed: false,
         errorText: '',
         loading: false
      }
   }

   takePart = () =>{
      axios.post(`${environment.backend_url}/moder_contests/take_part`,{
         contest_id: this.props.id,
         steam_id: localStorage.getItem('steam_id')
      })
      .then(res => {
         this.setState({
            participating: true
         })
       })
   }

   updateAge = (e: any) =>{
      this.setState({age: e.target.value})
   }

   updateExperience = (e: any) =>{
      this.setState({experience: e.target.value})
   }

   updateReason = (e: any) =>{
      this.setState({reason: e.target.value})
   }

   send = (e: any) =>{
      e.preventDefault()
      this.setState({loading: true}, this.query)
   }

   query = () =>{
      axios.post(`${environment.backend_url}/moder_contest/take_part`,
      {
         age: this.state.age,
         experience: this.state.experience,
         reason: this.state.reason,
         moder_contest_id: this.props.id,
         user: { 
            steamID: localStorage.getItem('steam_id')
         }
      })
      .then(res => {
         this.setState({ requestSucceed: true, requestFailed: false, participating: true, loading: false });
      })
      .catch(error => {
         let err = error.response.data.error;
         this.setState({ errorText: err, requestFailed: true, requestSucceed: false, loading: false });
      });
   }

   renderSpinner = () =>{
      if (this.state.loading){
         return(<Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            variant="light"
            aria-hidden="true"
            style={{marginRight: "4px", marginBottom: "2px"}}
         />)
      }
   }

   renderPart = () =>{
      if(this.state.participating){
         return(
            <div className="giveaway__main-content">
               <div className="peronal-page__icon shield-icon"></div>
               <h3 className='participating'>Вы участвуете в наборе</h3>
            </div>
         );
      }

      return(
         <div className="shield-icon--back" id="moder-form">
            <Form>
            <Alert variant='danger' hidden={!this.state.requestFailed }>
               Произошла ошибка:&nbsp; {this.state.errorText}
            </Alert>
            <Alert variant='success' hidden={!this.state.requestSucceed }>
               Форма успешно отправлена.
            </Alert>
            <Form.Group controlId="formBasicEmail">
               <Form.Label>Возраст</Form.Label>
               <Form.Control required type="number" placeholder="Введите Ваш возраст" onChange={(e) => this.updateAge(e)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
               <Form.Label>Опыт работы в качестве модератора</Form.Label>
               <Form.Control as="textarea" rows={3} onChange={(e) => this.updateExperience(e)}/>
               <Form.Text className="text-muted">
                  Опишите, были ли Вы модератором/админом ранее на каком-либо сервере.
                  Опыт работы с админ-меню.
                  Сколько часов в день Вы сможете уделить серверу.
                  Остальная информация на Ваше усмотрение.
               </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
               <Form.Label>Почему именно Вы должны стать модератором?</Form.Label>
               <Form.Control as="textarea" rows={3} onChange={(e) => this.updateReason(e)}/>
            </Form.Group>
            <Button variant="success" type="submit" onClick={(e) => this.send(e)} disabled={this.state.participating as boolean}>
               {this.renderSpinner()}
               Отправить
            </Button>
            </Form>
         </div>
      )
   }


   render(){
      return(this.renderPart());
   }
}

export default ModerContest;